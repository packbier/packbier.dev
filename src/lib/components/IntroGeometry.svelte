<script lang="ts">
	import { onMount } from 'svelte';
	import { grid } from '$lib/grid.svelte';
	import { theme } from '$lib/theme.svelte';

	const TAU = Math.PI * 2;
	const SWEEP_SPEED = 0.64; // rad/s (~9.8s per full revolution)
	const WAKE_ARC = (56 * Math.PI) / 180;
	const COL_LABELS = ['10', '11', '12'] as const;
	const ROW_LABELS = ['A', 'B', 'C'] as const;
	const BASE_TARGET_COUNT = 4;
	const MAX_TARGETS = 7;

	type TargetKind = 'primary' | 'reticle' | 'signal';

	interface TrailPoint {
		x: number;
		y: number;
		age: number;
	}

	interface RadarTarget {
		id: number;
		mode: 'orbital' | 'chord';
		kind: TargetKind;
		x: number;
		y: number;
		// Chord parameters
		vx: number;
		vy: number;
		turnRate: number;
		// Orbital parameters
		r: number;
		theta: number;
		rOrbit: number;
		omega: number;
		radialSpeed: number;
		orbitPhase: 'enter' | 'orbit' | 'exit';
		orbitRemaining: number;
		// Detection & persistence
		discovered: boolean;
		exitedRing: boolean;
		intensity: number;
		pingAge: number;
		trail: TrailPoint[];
		trailAccum: number;
		userPlaced?: boolean;
	}

	interface BoundaryEvent {
		x: number;
		y: number;
		angle: number;
		age: number;
		kind: TargetKind;
	}

	interface ColMetrics {
		left: number;
		right: number;
		width: number;
	}

	interface Palette {
		ink: string;
		muted: string;
		accent: string;
		signal: string;
		isDark: boolean;
	}

	let containerEl = $state<HTMLDivElement | null>(null);
	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let probeCol0 = $state<HTMLDivElement | null>(null);
	let probeCol1 = $state<HTMLDivElement | null>(null);
	let probeCol2 = $state<HTMLDivElement | null>(null);

	let azimuthDeg = $state(42);
	let trackedCount = $state(3);
	let hoverReadout = $state<string | null>(null);

	let size = 228;
	let cols: ColMetrics[] = [
		{ left: 0, right: 60, width: 60 },
		{ left: 84, right: 144, width: 60 },
		{ left: 168, right: 228, width: 60 }
	];

	let sweepAngle = -Math.PI * 0.25;
	let nextTargetId = 1;
	let targets: RadarTarget[] = [];
	let boundaryEvents: BoundaryEvent[] = [];
	let cellEnergy: number[][] = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	let lastLockedId: number | null = null;
	let hoverPos: { x: number; y: number } | null = null;
	let sectorCursor = 0;

	const palette = $derived<Palette>(
		theme.get === 'dark'
			? {
					ink: '241, 243, 246',
					muted: '132, 140, 156',
					accent: '96, 165, 250',
					signal: '248, 113, 113',
					isDark: true
				}
			: {
					ink: '24, 26, 32',
					muted: '95, 102, 117',
					accent: '37, 99, 235',
					signal: '217, 68, 54',
					isDark: false
				}
	);

	function rgba(rgb: string, alpha: number): string {
		return `rgba(${rgb}, ${Math.max(0, Math.min(1, alpha)).toFixed(4)})`;
	}

	function normAngle(angle: number): number {
		return ((angle % TAU) + TAU) % TAU;
	}

	function rand(min: number, max: number): number {
		return min + Math.random() * (max - min);
	}

	function getGridLines() {
		const v0 = Math.round(cols[0].right) - 0.5; // right border of Col 10
		const v1 = Math.round(cols[1].left) + 0.5; // left border of Col 11
		const v2 = Math.round(cols[1].right) - 0.5; // right border of Col 11
		const v3 = Math.round(cols[2].left) + 0.5; // left border of Col 12
		return [v0, v1, v2, v3] as const;
	}

	function getRings() {
		const [v0, v1, v2, v3] = getGridLines();
		const r1 = Math.max(12, (v2 - v1) / 2); // tangent to center column (Col 11) walls
		const r2 = Math.max(r1 + 8, (v3 - v0) / 2); // tangent to Col 10 right & Col 12 left walls
		const r4 = Math.max(r2 + 16, (size - 1) / 2); // outer horizon, tangent to square frame
		const r3 = (r2 + r4) / 2; // passes through centers of Col 10 & Col 12
		return { r1, r2, r3, r4 };
	}

	function locateCell(x: number, y: number): { col: number; row: number } | null {
		let col = -1;
		let row = -1;
		for (let i = 0; i < 3; i++) {
			if (x >= cols[i].left && x <= cols[i].right) col = i;
			if (y >= cols[i].left && y <= cols[i].right) row = i;
		}
		if (col === -1 || row === -1) return null;
		return { col, row };
	}

	function nearestGridEdges(x: number, y: number): { gx: number; gy: number } {
		const [v0, v1, v2, v3] = getGridLines();
		const edges = [0.5, v0, v1, v2, v3, size - 0.5];
		let gx = edges[0];
		let gy = edges[0];
		let bestDx = Infinity;
		let bestDy = Infinity;
		for (const e of edges) {
			const dx = Math.abs(x - e);
			if (dx < bestDx) {
				bestDx = dx;
				gx = e;
			}
			const dy = Math.abs(y - e);
			if (dy < bestDy) {
				bestDy = dy;
				gy = e;
			}
		}
		return { gx, gy };
	}

	function chooseKind(): TargetKind {
		const hasSignal = targets.some((t) => t.kind === 'signal');
		const roll = Math.random();
		if (!hasSignal && roll < 0.2) return 'signal';
		if (roll < 0.68) return 'primary';
		return 'reticle';
	}

	function spawnTarget(forceMode?: 'orbital' | 'chord', forceKind?: TargetKind): RadarTarget {
		const cx = size / 2;
		const cy = size / 2;
		const { r1, r2, r3, r4 } = getRings();
		const spawnR = r4 + 14;

		// Distribute entry points evenly around the perimeter with organic jitter
		const baseAngle = ((sectorCursor++ % 6) / 6) * TAU + rand(-0.42, 0.42);
		const mode = forceMode ?? (Math.random() < 0.46 ? 'orbital' : 'chord');
		const kind = forceKind ?? chooseKind();

		if (mode === 'orbital') {
			const orbitBands = [
				r1 + (r2 - r1) * 0.45,
				r2 + (r3 - r2) * 0.35,
				r3,
				r3 + (r4 - r3) * 0.45
			];
			const rOrbit = orbitBands[Math.floor(Math.random() * orbitBands.length)] + rand(-3, 3);
			const dir = Math.random() < 0.5 ? 1 : -1;
			const omega = dir * rand(0.11, 0.19);
			const x = cx + Math.cos(baseAngle) * spawnR;
			const y = cy + Math.sin(baseAngle) * spawnR;
			return {
				id: nextTargetId++,
				mode: 'orbital',
				kind,
				x,
				y,
				vx: 0,
				vy: 0,
				turnRate: 0,
				r: spawnR,
				theta: baseAngle,
				rOrbit,
				omega,
				radialSpeed: rand(9, 13),
				orbitPhase: 'enter',
				orbitRemaining: rand(1.6, 2.9),
				discovered: false,
				exitedRing: false,
				intensity: 0,
				pingAge: 99,
				trail: [],
				trailAccum: 0
			};
		}

		// Chord transit across the grid
		const exitAngle = baseAngle + Math.PI + rand(-0.92, 0.92);
		const startX = cx + Math.cos(baseAngle) * spawnR;
		const startY = cy + Math.sin(baseAngle) * spawnR;
		const endX = cx + Math.cos(exitAngle) * spawnR;
		const endY = cy + Math.sin(exitAngle) * spawnR;
		const dx = endX - startX;
		const dy = endY - startY;
		const dist = Math.hypot(dx, dy) || 1;
		const speed = rand(8.5, 13.5);

		return {
			id: nextTargetId++,
			mode: 'chord',
			kind,
			x: startX,
			y: startY,
			vx: (dx / dist) * speed,
			vy: (dy / dist) * speed,
			turnRate: rand(-0.045, 0.045),
			r: spawnR,
			theta: baseAngle,
			rOrbit: 0,
			omega: 0,
			radialSpeed: 0,
			orbitPhase: 'enter',
			orbitRemaining: 0,
			discovered: false,
			exitedRing: false,
			intensity: 0,
			pingAge: 99,
			trail: [],
			trailAccum: 0
		};
	}

	function spawnClickedTarget(x: number, y: number) {
		const cx = size / 2;
		const cy = size / 2;
		const { r4 } = getRings();
		const distFromCenter = Math.hypot(x - cx, y - cy);
		if (distFromCenter > r4 - 3) return;

		// Aim gently across the radar away from the entry quadrant so it crosses the grid and exits
		const awayAngle = Math.atan2(cy - y, cx - x) + rand(-0.85, 0.85);
		const speed = rand(10, 14);

		const created: RadarTarget = {
			id: nextTargetId++,
			mode: 'chord',
			kind: 'primary',
			x,
			y,
			vx: Math.cos(awayAngle) * speed,
			vy: Math.sin(awayAngle) * speed,
			turnRate: rand(-0.04, 0.04),
			r: distFromCenter,
			theta: Math.atan2(y - cy, x - cx),
			rOrbit: 0,
			omega: 0,
			radialSpeed: 0,
			orbitPhase: 'enter',
			orbitRemaining: 0,
			discovered: true,
			exitedRing: false,
			intensity: 1,
			pingAge: 0,
			trail: [{ x, y, age: 0 }],
			trailAccum: 0,
			userPlaced: true
		};

		if (targets.length >= MAX_TARGETS) {
			const idx = targets.findIndex((t) => t.userPlaced);
			if (idx !== -1) targets.splice(idx, 1);
		}
		targets.push(created);
		lastLockedId = created.id;

		const cell = locateCell(x, y);
		if (cell) {
			cellEnergy[cell.row][cell.col] = 1;
		}
	}

	function seedSimulation() {
		targets = [];
		boundaryEvents = [];
		cellEnergy = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];
		sectorCursor = 0;
		sweepAngle = -Math.PI * 0.28;

		targets.push(spawnTarget('orbital', 'primary'));
		targets.push(spawnTarget('chord', 'primary'));
		targets.push(spawnTarget('orbital', 'reticle'));
		targets.push(spawnTarget('chord', 'signal'));

		// Pre-warm simulation so the very first rendered frame is balanced and populated
		for (let i = 0; i < 190; i++) {
			stepSimulation(0.08);
		}
	}

	function stepSimulation(dt: number) {
		const cx = size / 2;
		const cy = size / 2;
		const { r4 } = getRings();

		const prevAngle = sweepAngle;
		const dAngle = SWEEP_SPEED * dt;
		sweepAngle = normAngle(sweepAngle + dAngle);

		// Decay grid-cell illumination
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 3; c++) {
				if (cellEnergy[r][c] > 0) {
					cellEnergy[r][c] = Math.max(0, cellEnergy[r][c] - dt * 0.55);
				}
			}
		}

		// Update boundary exit indicators
		for (let i = boundaryEvents.length - 1; i >= 0; i--) {
			boundaryEvents[i].age += dt;
			if (boundaryEvents[i].age > 1.65) {
				boundaryEvents.splice(i, 1);
			}
		}

		// Update moving targets
		for (let i = targets.length - 1; i >= 0; i--) {
			const t = targets[i];
			const prevR = Math.hypot(t.x - cx, t.y - cy);

			if (t.mode === 'orbital') {
				t.theta = normAngle(t.theta + t.omega * dt);
				if (t.orbitPhase === 'enter') {
					const diff = t.r - t.rOrbit;
					const step = Math.min(diff, Math.max(3.5, diff * 0.65) * dt + t.radialSpeed * 0.35 * dt);
					t.r -= step;
					if (t.r <= t.rOrbit + 1.5) {
						t.r = t.rOrbit;
						t.orbitPhase = 'orbit';
					}
				} else if (t.orbitPhase === 'orbit') {
					t.orbitRemaining -= Math.abs(t.omega) * dt;
					t.r += Math.sin(t.theta * 2) * 0.8 * dt;
					if (t.orbitRemaining <= 0) {
						t.orbitPhase = 'exit';
					}
				} else {
					t.r += t.radialSpeed * dt;
				}
				t.x = cx + Math.cos(t.theta) * t.r;
				t.y = cy + Math.sin(t.theta) * t.r;
			} else {
				// Gently curved chord vector
				if (t.turnRate !== 0) {
					const cos = Math.cos(t.turnRate * dt);
					const sin = Math.sin(t.turnRate * dt);
					const nvx = t.vx * cos - t.vy * sin;
					const nvy = t.vx * sin + t.vy * cos;
					t.vx = nvx;
					t.vy = nvy;
				}
				t.x += t.vx * dt;
				t.y += t.vy * dt;
				t.r = Math.hypot(t.x - cx, t.y - cy);
				t.theta = normAngle(Math.atan2(t.y - cy, t.x - cx));
			}

			// Sample trail points
			t.trailAccum += dt;
			if (t.trailAccum >= 0.14) {
				t.trailAccum = 0;
				t.trail.push({ x: t.x, y: t.y, age: 0 });
				if (t.trail.length > 34) {
					t.trail.shift();
				}
			}
			for (let j = t.trail.length - 1; j >= 0; j--) {
				t.trail[j].age += dt;
				if (t.trail[j].age > 5.2) {
					t.trail.splice(j, 1);
				}
			}

			// Detect radar sweep crossing while inside the circular horizon
			const insideHorizon = t.r <= r4 - 1;
			if (insideHorizon) {
				const delta = normAngle(t.theta - prevAngle);
				if (delta <= dAngle) {
					t.discovered = true;
					t.intensity = 1;
					t.pingAge = 0;
					lastLockedId = t.id;

					const cell = locateCell(t.x, t.y);
					if (cell) {
						cellEnergy[cell.row][cell.col] = 1;
					}
				}
			}

			// Detect crossing outside the circular radar horizon
			if (t.discovered && !t.exitedRing && prevR <= r4 && t.r > r4) {
				t.exitedRing = true;
				boundaryEvents.push({
					x: cx + Math.cos(t.theta) * r4,
					y: cy + Math.sin(t.theta) * r4,
					angle: t.theta,
					age: 0,
					kind: t.kind
				});
			}

			// Decay persistence smoothly between sweeps
			t.pingAge += dt;
			if (t.discovered) {
				const floor = insideHorizon ? 0.2 : 0;
				t.intensity = Math.max(floor, t.intensity - dt * 0.12);
			}

			// Retire targets well outside bounds
			const outPastBounds = t.r > r4 + 20 && (t.exitedRing || (t.mode === 'chord' && prevR < t.r));
			const orbitalDone = t.mode === 'orbital' && t.orbitPhase === 'exit' && t.r > r4 + 20;
			if (outPastBounds || orbitalDone || t.r > size * 0.9) {
				if (lastLockedId === t.id) lastLockedId = null;
				targets.splice(i, 1);
			}
		}

		// Replenish baseline targets so the field stays steadily alive
		let naturalCount = 0;
		for (const t of targets) {
			if (!t.userPlaced) naturalCount++;
		}
		while (naturalCount < BASE_TARGET_COUNT) {
			targets.push(spawnTarget());
			naturalCount++;
		}
	}

	function drawFrame() {
		if (!canvasEl) return;
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
		const targetW = Math.round(size * dpr);
		if (canvasEl.width !== targetW || canvasEl.height !== targetW) {
			canvasEl.width = targetW;
			canvasEl.height = targetW;
		}

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, size, size);

		const p = palette;
		const gridOn = grid.enabled;
		const cx = size / 2;
		const cy = size / 2;
		const { r1, r2, r3, r4 } = getRings();
		const vLines = getGridLines();

		// 1. Energized Swiss 3x3 grid cells (subtle tint + micro corner brackets on lock)
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 3; c++) {
				const energy = cellEnergy[r][c];
				if (energy <= 0.01) continue;
				const x0 = cols[c].left;
				const y0 = cols[r].left;
				const w = cols[c].width;
				const h = cols[r].width;

				ctx.fillStyle = rgba(p.accent, energy * (p.isDark ? 0.08 : 0.055));
				ctx.fillRect(x0, y0, w, h);

				// Crisp corner micro-ticks on the locked Swiss cell
				const tick = 5;
				ctx.strokeStyle = rgba(p.accent, energy * 0.55);
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(x0 + 0.5, y0 + tick);
				ctx.lineTo(x0 + 0.5, y0 + 0.5);
				ctx.lineTo(x0 + tick, y0 + 0.5);
				ctx.moveTo(x0 + w - tick, y0 + 0.5);
				ctx.lineTo(x0 + w - 0.5, y0 + 0.5);
				ctx.lineTo(x0 + w - 0.5, y0 + tick);
				ctx.moveTo(x0 + 0.5, y0 + h - tick);
				ctx.lineTo(x0 + 0.5, y0 + h - 0.5);
				ctx.lineTo(x0 + tick, y0 + h - 0.5);
				ctx.moveTo(x0 + w - tick, y0 + h - 0.5);
				ctx.lineTo(x0 + w - 0.5, y0 + h - 0.5);
				ctx.lineTo(x0 + w - 0.5, y0 + h - tick);
				ctx.stroke();
			}
		}

		// 2. Exact Swiss column & mirrored row lattice (snapped pixel-for-pixel to GridOverlay)
		ctx.lineWidth = 1;
		ctx.strokeStyle = gridOn ? rgba(p.accent, p.isDark ? 0.17 : 0.14) : rgba(p.ink, 0.075);
		ctx.beginPath();
		for (const px of vLines) {
			ctx.moveTo(px, 0);
			ctx.lineTo(px, size);
			// Mirrored horizontal row edge
			ctx.moveTo(0, px);
			ctx.lineTo(size, px);
		}
		ctx.stroke();

		// Subtle '+' ticks at the 16 internal Swiss grid intersections
		ctx.strokeStyle = gridOn ? rgba(p.accent, 0.35) : rgba(p.ink, 0.18);
		ctx.beginPath();
		for (const px of vLines) {
			for (const py of vLines) {
				ctx.moveTo(px - 2.5, py);
				ctx.lineTo(px + 2.5, py);
				ctx.moveTo(px, py - 2.5);
				ctx.lineTo(px, py + 2.5);
			}
		}
		ctx.stroke();

		// 3. Sweeping radar cone (smooth conical gradient wash clipped to r4)
		ctx.save();
		ctx.beginPath();
		ctx.arc(cx, cy, r4, 0, TAU);
		ctx.clip();

		if (typeof ctx.createConicGradient === 'function') {
			const grad = ctx.createConicGradient(sweepAngle + 0.002, cx, cy);
			const wakeFrac = WAKE_ARC / TAU;
			const startStop = Math.max(0, 1 - wakeFrac);
			const midStop = 1 - wakeFrac * 0.42;

			if (p.isDark) {
				grad.addColorStop(0, rgba(p.accent, 0));
				grad.addColorStop(startStop, rgba(p.accent, 0));
				grad.addColorStop(midStop, rgba(p.accent, 0.07));
				grad.addColorStop(0.992, rgba(p.accent, 0.22));
				grad.addColorStop(1, rgba(p.accent, 0.22));
			} else {
				grad.addColorStop(0, rgba(p.ink, 0));
				grad.addColorStop(startStop, rgba(p.ink, 0));
				grad.addColorStop(midStop, rgba(p.accent, 0.065));
				grad.addColorStop(0.992, rgba(p.ink, 0.21));
				grad.addColorStop(1, rgba(p.ink, 0.21));
			}

			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.moveTo(cx, cy);
			ctx.arc(cx, cy, r4, sweepAngle - WAKE_ARC, sweepAngle);
			ctx.closePath();
			ctx.fill();
		} else {
			// Fallback segmented cone for older engines
			const slices = 18;
			for (let s = 0; s < slices; s++) {
				const frac = s / slices;
				const a0 = sweepAngle - WAKE_ARC * (1 - frac);
				const a1 = sweepAngle - WAKE_ARC * (1 - (s + 1) / slices);
				ctx.fillStyle = rgba(p.isDark ? p.accent : p.ink, Math.pow(frac, 1.8) * 0.2);
				ctx.beginPath();
				ctx.moveTo(cx, cy);
				ctx.arc(cx, cy, r4, a0, a1);
				ctx.closePath();
				ctx.fill();
			}
		}
		ctx.restore();

		// 4. Polar axes (cardinal + 45° dotted diagonals, inspired by astronomical docking radar)
		const cxCrisp = Math.round(cx) + 0.5;
		const cyCrisp = Math.round(cy) + 0.5;

		ctx.strokeStyle = rgba(p.ink, 0.22);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(cxCrisp, 0);
		ctx.lineTo(cxCrisp, size);
		ctx.moveTo(0, cyCrisp);
		ctx.lineTo(size, cyCrisp);
		ctx.stroke();

		// 45° dotted diagonals
		ctx.save();
		ctx.setLineDash([1.5, 3]);
		ctx.strokeStyle = rgba(p.ink, 0.16);
		ctx.beginPath();
		const diagPad = size * 0.085;
		ctx.moveTo(diagPad, diagPad);
		ctx.lineTo(size - diagPad, size - diagPad);
		ctx.moveTo(size - diagPad, diagPad);
		ctx.lineTo(diagPad, size - diagPad);
		ctx.stroke();
		ctx.restore();

		// 5. Grid-tangent concentric radar rings & subtle partial orbital grooves
		// Ring 1: tangent to center column (Col 11)
		ctx.strokeStyle = rgba(p.ink, 0.24);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(cx, cy, r1, 0, TAU);
		ctx.stroke();

		// Ring 2: dashed ring tangent to outer edges of both gutters (Col 10 & Col 12 inner walls)
		ctx.save();
		ctx.setLineDash([2.5, 2.5]);
		ctx.strokeStyle = rgba(p.ink, 0.22);
		ctx.beginPath();
		ctx.arc(cx, cy, r2, 0, TAU);
		ctx.stroke();
		ctx.restore();

		// Ring 3: passes through centers of Col 10 & Col 12
		ctx.strokeStyle = rgba(p.ink, 0.2);
		ctx.beginPath();
		ctx.arc(cx, cy, r3, 0, TAU);
		ctx.stroke();

		// Subtle partial orbital reference arcs (astronomical plate detail)
		ctx.save();
		ctx.strokeStyle = rgba(p.ink, 0.12);
		ctx.beginPath();
		ctx.arc(cx, cy, (r1 + r2) * 0.5, -Math.PI * 0.65, Math.PI * 0.32);
		ctx.stroke();

		ctx.setLineDash([1.5, 2.5]);
		ctx.strokeStyle = rgba(p.ink, 0.14);
		ctx.beginPath();
		ctx.arc(cx, cy, (r2 + r3) * 0.5, Math.PI * 0.25, Math.PI * 1.48);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(cx, cy, (r3 + r4) * 0.5, -Math.PI * 1.15, -Math.PI * 0.18);
		ctx.stroke();
		ctx.restore();

		// Ring 4: primary outer horizon tangent to square frame
		ctx.strokeStyle = rgba(p.ink, 0.34);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(cx, cy, r4, 0, TAU);
		ctx.stroke();

		// Outer perimeter degree tick marks (every 15°)
		ctx.strokeStyle = rgba(p.ink, 0.28);
		ctx.beginPath();
		for (let deg = 0; deg < 360; deg += 15) {
			const a = (deg * Math.PI) / 180;
			const len = deg % 90 === 0 ? 5 : deg % 45 === 0 ? 3.5 : 2;
			ctx.moveTo(cx + Math.cos(a) * r4, cy + Math.sin(a) * r4);
			ctx.lineTo(cx + Math.cos(a) * (r4 - len), cy + Math.sin(a) * (r4 - len));
		}
		ctx.stroke();

		// 6. Leading sweep arm + ring intersection gleams
		const armX = cx + Math.cos(sweepAngle) * r4;
		const armY = cy + Math.sin(sweepAngle) * r4;
		ctx.strokeStyle = rgba(p.isDark ? p.accent : p.ink, 0.58);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.lineTo(armX, armY);
		ctx.stroke();

		// Gleam nodes where sweep crosses each concentric grid-ring
		ctx.fillStyle = rgba(p.accent, 0.65);
		for (const r of [r1, r2, r3]) {
			ctx.beginPath();
			ctx.arc(cx + Math.cos(sweepAngle) * r, cy + Math.sin(sweepAngle) * r, 1.15, 0, TAU);
			ctx.fill();
		}
		// Horizon sweep tip marker
		ctx.fillStyle = rgba(p.accent, 0.95);
		ctx.beginPath();
		ctx.arc(armX, armY, 2, 0, TAU);
		ctx.fill();

		// 7. Targets: trails, grid-lock orthogonal projections, pings, and blips
		for (const t of targets) {
			if (!t.discovered) continue;

			// Smooth fade-out as target crosses past the outer radar horizon (r4)
			const boundsFade =
				t.r <= r4 - 4 ? 1 : t.r >= r4 + 10 ? 0 : 1 - (t.r - (r4 - 4)) / 14;
			const vis = t.intensity * boundsFade;
			if (vis <= 0.015) continue;

			const colorRgb =
				t.kind === 'signal' ? p.signal : t.kind === 'primary' ? p.accent : p.ink;

			// Dotted / feathered trajectory wake (clipped slightly generously so fade feels seamless)
			if (t.trail.length > 1) {
				ctx.save();
				ctx.beginPath();
				ctx.arc(cx, cy, r4 + 6, 0, TAU);
				ctx.clip();

				for (let j = 1; j < t.trail.length; j++) {
					const pt0 = t.trail[j - 1];
					const pt1 = t.trail[j];
					const ageFrac = Math.max(0, 1 - pt1.age / 5.2);
					const segAlpha = ageFrac * ageFrac * vis * 0.48;
					if (segAlpha <= 0.01) continue;

					ctx.strokeStyle = rgba(t.kind === 'reticle' ? p.ink : colorRgb, segAlpha);
					ctx.lineWidth = 1;
					ctx.setLineDash(t.mode === 'orbital' ? [1.5, 2] : [2, 2.5]);
					ctx.beginPath();
					ctx.moveTo(pt0.x, pt0.y);
					ctx.lineTo(pt1.x, pt1.y);
					ctx.stroke();
				}
				ctx.restore();
			}

			// Grid-lock orthogonal hairlines for the most recently swept target
			if (t.id === lastLockedId && t.pingAge < 2.2 && t.r <= r4 - 1) {
				const lockAlpha = Math.max(0, 1 - t.pingAge / 2.2) * boundsFade;
				const { gx, gy } = nearestGridEdges(t.x, t.y);

				ctx.save();
				ctx.setLineDash([2, 2]);
				ctx.strokeStyle = rgba(p.accent, lockAlpha * 0.42);
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(t.x, t.y);
				ctx.lineTo(gx, t.y);
				ctx.moveTo(t.x, t.y);
				ctx.lineTo(t.x, gy);
				ctx.stroke();
				ctx.restore();

				// Tiny projection anchor ticks on the Swiss grid walls
				ctx.fillStyle = rgba(p.accent, lockAlpha * 0.85);
				ctx.fillRect(gx - 1.5, t.y - 1.5, 3, 3);
				ctx.fillRect(t.x - 1.5, gy - 1.5, 3, 3);
			}

			// Expanding ping ripple on sweep lock
			if (t.pingAge < 0.95 && t.r <= r4) {
				const pFrac = t.pingAge / 0.95;
				const easeOut = 1 - Math.pow(1 - pFrac, 2.4);
				const pingR = 3 + easeOut * 13;
				ctx.strokeStyle = rgba(colorRgb, (1 - pFrac) * 0.55 * boundsFade);
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.arc(t.x, t.y, pingR, 0, TAU);
				ctx.stroke();
			}

			// Soft technical halo + crisp target glyph
			if (t.kind === 'primary' || t.kind === 'signal') {
				const haloR = 7.5;
				const halo = ctx.createRadialGradient(t.x, t.y, 0.5, t.x, t.y, haloR);
				halo.addColorStop(0, rgba(colorRgb, vis * 0.34));
				halo.addColorStop(1, rgba(colorRgb, 0));
				ctx.fillStyle = halo;
				ctx.beginPath();
				ctx.arc(t.x, t.y, haloR, 0, TAU);
				ctx.fill();

				ctx.fillStyle = rgba(colorRgb, Math.min(1, vis * 1.05));
				ctx.beginPath();
				ctx.arc(t.x, t.y, t.kind === 'signal' ? 2.4 : 2.6, 0, TAU);
				ctx.fill();

				// Subtle crisp outer ring when freshly pinged
				if (t.pingAge < 1.2) {
					ctx.strokeStyle = rgba(colorRgb, (1 - t.pingAge / 1.2) * 0.65 * boundsFade);
					ctx.lineWidth = 0.9;
					ctx.beginPath();
					ctx.arc(t.x, t.y, 4.6, 0, TAU);
					ctx.stroke();
				}
			} else {
				// Crisp astronomical reticle / diamond marker (echoing technical plate marks)
				ctx.strokeStyle = rgba(p.ink, vis * 0.9);
				ctx.fillStyle = rgba(p.ink, vis * 0.9);
				ctx.lineWidth = 1;
				const s = 3.2;
				ctx.beginPath();
				ctx.moveTo(t.x, t.y - s);
				ctx.lineTo(t.x + s, t.y);
				ctx.lineTo(t.x, t.y + s);
				ctx.lineTo(t.x - s, t.y);
				ctx.closePath();
				ctx.stroke();

				// Micro crosshair extensions
				ctx.beginPath();
				ctx.moveTo(t.x - s - 2, t.y);
				ctx.lineTo(t.x - s + 0.5, t.y);
				ctx.moveTo(t.x + s - 0.5, t.y);
				ctx.lineTo(t.x + s + 2, t.y);
				ctx.moveTo(t.x, t.y - s - 2);
				ctx.lineTo(t.x, t.y - s + 0.5);
				ctx.moveTo(t.x, t.y + s - 0.5);
				ctx.lineTo(t.x, t.y + s + 2);
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(t.x, t.y, 1.1, 0, TAU);
				ctx.fill();
			}
		}

		// 8. Outside-bounds exit ticks right along the outer horizon ring
		for (const ev of boundaryEvents) {
			const fade = Math.max(0, 1 - ev.age / 1.65);
			const rgb = ev.kind === 'signal' ? p.signal : ev.kind === 'primary' ? p.accent : p.ink;
			ctx.save();
			ctx.translate(ev.x, ev.y);
			ctx.rotate(ev.angle);
			ctx.strokeStyle = rgba(rgb, fade * 0.72);
			ctx.lineWidth = 1;
			// Small fading cross + outward drift mark
			const drift = (1 - fade) * 4;
			ctx.beginPath();
			ctx.moveTo(-2.5 + drift, -2.5);
			ctx.lineTo(2.5 + drift, 2.5);
			ctx.moveTo(2.5 + drift, -2.5);
			ctx.lineTo(-2.5 + drift, 2.5);
			ctx.stroke();
			ctx.restore();
		}

		// 9. Center datum reticle (square center nod to original IntroGeometry)
		ctx.fillStyle = rgba(p.ink, 0.72);
		ctx.fillRect(cxCrisp - 2, cyCrisp - 2, 4, 4);

		// 10. Subtle interactive hover drafting crosshair
		if (hoverPos) {
			const hx = Math.round(hoverPos.x) + 0.5;
			const hy = Math.round(hoverPos.y) + 0.5;
			ctx.save();
			ctx.setLineDash([2, 3]);
			ctx.strokeStyle = rgba(p.accent, 0.28);
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(hx, 0);
			ctx.lineTo(hx, size);
			ctx.moveTo(0, hy);
			ctx.lineTo(size, hy);
			ctx.stroke();
			ctx.restore();

			ctx.strokeStyle = rgba(p.accent, 0.75);
			ctx.lineWidth = 1;
			ctx.strokeRect(hx - 3, hy - 3, 6, 6);
		}

		// 11. Outer border (pixel-locked to Col 10 left edge and Col 12 right edge) + top/bottom column alignment notches
		ctx.strokeStyle = gridOn ? rgba(p.accent, 0.45) : rgba(p.ink, 0.28);
		ctx.lineWidth = 1;
		ctx.strokeRect(0.5, 0.5, size - 1, size - 1);

		// Crisp inward alignment ticks marking exact GridOverlay column boundaries along top & bottom
		ctx.strokeStyle = gridOn ? rgba(p.accent, 0.75) : rgba(p.ink, 0.34);
		ctx.beginPath();
		for (const px of vLines) {
			ctx.moveTo(px, 0.5);
			ctx.lineTo(px, 5);
			ctx.moveTo(px, size - 0.5);
			ctx.lineTo(px, size - 5);
		}
		ctx.stroke();
	}

	function measureGrid() {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const nextSize = Math.round(rect.width);
		if (nextSize < 80) return;

		size = nextSize;

		if (probeCol0 && probeCol1 && probeCol2) {
			const c0Left = probeCol0.offsetLeft;
			const c0W = probeCol0.offsetWidth;
			const c1Left = probeCol1.offsetLeft;
			const c1W = probeCol1.offsetWidth;
			const c2Left = probeCol2.offsetLeft;
			const c2W = probeCol2.offsetWidth;

			if (c0W > 0 && c1W > 0 && c2W > 0) {
				cols = [
					{ left: c0Left, right: c0Left + c0W, width: c0W },
					{ left: c1Left, right: c1Left + c1W, width: c1W },
					{ left: c2Left, right: c2Left + c2W, width: c2W }
				];
			}
		}
	}

	function updateHoverReadout(x: number, y: number) {
		const cx = size / 2;
		const cy = size / 2;
		// Compass-style azimuth: 0° at top (12 o'clock), increasing clockwise
		const deg = Math.round(normAngle(Math.atan2(y - cy, x - cx) + Math.PI / 2) * (180 / Math.PI)) % 360;
		const cell = locateCell(x, y);
		const cellTag = cell ? `${COL_LABELS[cell.col]}·${ROW_LABELS[cell.row]}` : 'GTR';
		hoverReadout = `${cellTag} · ${String(deg).padStart(3, '0')}°`;
	}

	function handlePointerMove(event: PointerEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if (x >= 0 && x <= size && y >= 0 && y <= size) {
			hoverPos = { x, y };
			updateHoverReadout(x, y);
		}
	}

	function handlePointerLeave() {
		hoverPos = null;
		hoverReadout = null;
	}

	function handleClick(event: MouseEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		spawnClickedTarget(x, y);
		drawFrame();
	}

	$effect(() => {
		// Redraw immediately when theme or grid overlay state toggles (also covers reduced-motion static frame)
		void theme.get;
		void grid.enabled;
		drawFrame();
	});

	onMount(() => {
		measureGrid();
		seedSimulation();
		drawFrame();

		const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		let reducedMotion = reducedMotionQuery.matches;
		let isVisible = true;
		let rafId: number | null = null;
		let lastTime = performance.now();
		let telemetryAccum = 0;

		const syncTelemetry = () => {
			// Compass azimuth (0° = North / top, clockwise)
			const deg = Math.round(normAngle(sweepAngle + Math.PI / 2) * (180 / Math.PI)) % 360;
			azimuthDeg = deg;

			const { r4 } = getRings();
			let count = 0;
			for (const t of targets) {
				if (t.discovered && t.r <= r4) count++;
			}
			trackedCount = count;
		};

		syncTelemetry();

		const tick = (now: number) => {
			if (reducedMotion || !isVisible || document.hidden) {
				rafId = null;
				return;
			}
			const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
			lastTime = now;

			stepSimulation(dt);
			drawFrame();

			telemetryAccum += dt;
			if (telemetryAccum >= 0.12) {
				telemetryAccum = 0;
				syncTelemetry();
			}

			rafId = requestAnimationFrame(tick);
		};

		const startLoop = () => {
			if (rafId === null && !reducedMotion && isVisible && !document.hidden) {
				lastTime = performance.now();
				rafId = requestAnimationFrame(tick);
			}
		};

		const stopLoop = () => {
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
				rafId = null;
			}
		};

		const onMotionChange = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
			if (reducedMotion) {
				stopLoop();
				drawFrame();
			} else {
				startLoop();
			}
		};
		reducedMotionQuery.addEventListener('change', onMotionChange);

		const onVisibility = () => {
			if (document.hidden) {
				stopLoop();
			} else {
				startLoop();
			}
		};
		document.addEventListener('visibilitychange', onVisibility);

		const resizeObserver = new ResizeObserver(() => {
			const prevSize = size;
			measureGrid();
			if (Math.abs(size - prevSize) > 1 && prevSize > 0) {
				const scale = size / prevSize;
				for (const t of targets) {
					t.x *= scale;
					t.y *= scale;
					t.r *= scale;
					t.rOrbit *= scale;
					for (const pt of t.trail) {
						pt.x *= scale;
						pt.y *= scale;
					}
				}
				for (const ev of boundaryEvents) {
					ev.x *= scale;
					ev.y *= scale;
				}
			}
			drawFrame();
		});
		if (containerEl) {
			resizeObserver.observe(containerEl);
		}

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0]?.isIntersecting ?? true;
				if (isVisible) {
					startLoop();
				} else {
					stopLoop();
				}
			},
			{ threshold: 0.05 }
		);
		if (containerEl) {
			intersectionObserver.observe(containerEl);
		}

		startLoop();

		return () => {
			stopLoop();
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			reducedMotionQuery.removeEventListener('change', onMotionChange);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<div aria-hidden="true" class="hidden select-none lg:block">
	<!-- Top technical marginalia -->
	<div
		class="mb-2 flex items-center justify-between font-mono text-[9px] leading-none tracking-[0.08em] text-[var(--ink-muted)] uppercase"
	>
		<span class="inline-flex items-center gap-1.5">
			<svg
				viewBox="0 0 10 10"
				class="h-2.5 w-2.5 text-[var(--ink-primary)] opacity-70"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="5" cy="5" r="2.6" stroke="currentColor" stroke-width="0.9" />
				<circle cx="5" cy="5" r="0.9" fill="currentColor" />
				<path d="M5 0.5V2.2M5 7.8V9.5M0.5 5H2.2M7.8 5H9.5" stroke="currentColor" stroke-width="0.9" />
			</svg>
			<span>FIG. 01 / RADAR</span>
		</span>
		<span class="tabular-nums opacity-80">
			AZ {String(azimuthDeg).padStart(3, '0')}°
		</span>
	</div>

	<!-- Grid-locked square aperture (flush with columns 10, 11, 12) -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={containerEl}
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
		onclick={handleClick}
		class="relative aspect-square w-full cursor-crosshair"
	>
		<!-- Exact 3-column CSS Grid probe matching GridOverlay (cols 10–12, gap-x-6) -->
		<div class="pointer-events-none absolute inset-0 grid grid-cols-3 gap-x-6">
			<div bind:this={probeCol0}></div>
			<div bind:this={probeCol1}></div>
			<div bind:this={probeCol2}></div>
		</div>

		<!-- Exterior corner crop ticks (outside the 0..size frame so frame stays 100% grid-flush) -->
		<span
			class="pointer-events-none absolute top-0 -left-1.5 h-px w-1.5 transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute -top-1.5 left-0 h-1.5 w-px transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute top-0 -right-1.5 h-px w-1.5 transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute -top-1.5 right-0 h-1.5 w-px transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute bottom-0 -left-1.5 h-px w-1.5 transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute -bottom-1.5 left-0 h-1.5 w-px transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute -right-1.5 bottom-0 h-px w-1.5 transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>
		<span
			class="pointer-events-none absolute right-0 -bottom-1.5 h-1.5 w-px transition-colors duration-150 {grid.enabled
				? 'bg-[var(--accent-border)]'
				: 'bg-[var(--rule-strong)]'}"
		></span>

		<canvas bind:this={canvasEl} class="block h-full w-full"></canvas>
	</div>

	<!-- Bottom technical marginalia -->
	<div
		class="mt-2 flex items-center justify-between font-mono text-[9px] leading-none tracking-[0.08em] text-[var(--ink-muted)] uppercase"
	>
		<span class="transition-colors duration-150 {grid.enabled ? 'text-[var(--accent-ink)]' : ''}">
			COLS 10–12
		</span>
		<span class="tabular-nums {hoverReadout ? 'text-[var(--accent-ink)]' : 'opacity-80'}">
			{hoverReadout ?? `TRK ${String(trackedCount).padStart(2, '0')}`}
		</span>
	</div>
</div>
