const INITIAL_STATE = {
  list: [],
  createdCycle: null,
  selectedCycle: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BILLING_CYCLES_FETCHED':
      return { ...state, list: action.payload }
    case 'BILLING_CYCLE_CREATED':
      return { ...state, createdCycle: action.payload }
    case 'BILLING_CYCLE_SELECTED':
      return { ...state, selectedCycle: action.payload }
    default:
      return state
  }
}
