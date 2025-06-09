import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function login(values, navigate) {
  return submit(values, `${consts.OAPI_URL}/login`, navigate)
}

export function signup(values, navigate) {
  return submit(values, `${consts.OAPI_URL}/signup`, navigate)
}

function submit(values, url, navigate) {
  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch({ type: 'USER_FETCHED', payload: resp.data })
        if (navigate) navigate('/')
      })
      .catch(e => {
        if (e.response && e.response.data && e.response.data.errors) {
          e.response.data.errors.forEach(error => toastr.error('Erro', error))
        } else {
          toastr.error('Erro', 'Erro inesperado ao processar a requisição.')
        }
      })
  }
}

export function logout() {
  return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
  return dispatch => {
    if (token) {
      axios
        .post(`${consts.OAPI_URL}/validateToken`, { token })
        .then(resp => {
          dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
        })
        .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
    } else {
      dispatch({ type: 'TOKEN_VALIDATED', payload: false })
    }
  }
}
