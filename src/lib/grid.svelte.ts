/** In-memory state for the Swiss column grid overlay (defaults to OFF, not persisted). */
function gridStore() {
	let store = $state(false);

	return {
		get enabled() {
			return store;
		},
		set(value: boolean) {
			store = value;
		},
		toggle() {
			store = !store;
		}
	};
}

export const grid = gridStore();
