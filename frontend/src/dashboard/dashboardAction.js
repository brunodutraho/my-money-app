import axios from 'axios'
const BASE_URL = 'http://localhost:3003/api'

export function getSummary() {
  return async dispatch => {
    const response = await axios.get(`${BASE_URL}/billingCycles/summary`)
    dispatch({
      type: 'BILLING_SUMMARY_FETCHED',
      payload: response.data,
    })
  }
}
