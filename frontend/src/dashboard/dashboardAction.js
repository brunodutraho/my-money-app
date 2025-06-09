import axios from 'axios'
import consts from '../consts'
const BASE_URL = consts.API_URL

export function getSummary() {
  return async dispatch => {
    const response = await axios.get(`${BASE_URL}/billingCycles/summary`)
    dispatch({
      type: 'BILLING_SUMMARY_FETCHED',
      payload: response.data,
    })
  }
}
