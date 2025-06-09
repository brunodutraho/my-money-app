import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { selectTab, showTabs } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

// Tipos de ação
const BILLING_CYCLES_FETCHED = 'BILLING_CYCLES_FETCHED'
const BILLING_CYCLE_SELECTED = 'BILLING_CYCLE_SELECTED'

// Busca a lista de ciclos de pagamento
export const getList = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${BASE_URL}/billingCycles`)
      dispatch({ type: BILLING_CYCLES_FETCHED, payload: response.data })
    } catch (error) {
      handleErrors(error)
    }
  }
}

// Cria um novo ciclo de pagamento
export const create = values => {
  return async dispatch => {
    try {
      await axios.post(`${BASE_URL}/billingCycles`, values)
      toastr.success('Sucesso', 'Ciclo de pagamento criado com sucesso!')
      dispatch(init())
    } catch (error) {
      handleErrors(error)
    }
  }
}

// Atualiza um ciclo de pagamento existente
export const update = values => {
  return async dispatch => {
    if (!values._id) {
      toastr.error('Erro', 'Ciclo de pagamento inválido para atualização.')
      return
    }

    try {
      await axios.put(`${BASE_URL}/billingCycles/${values._id}`, values)
      toastr.success('Sucesso', 'Ciclo de pagamento atualizado com sucesso!')
      dispatch(init())
    } catch (error) {
      handleErrors(error)
    }
  }
}

// Deleta um ciclo de pagamento
export const remove = values => {
  return async dispatch => {
    if (!values._id) {
      toastr.error('Erro', 'Ciclo de pagamento inválido para exclusão.')
      return
    }

    try {
      await axios.delete(`${BASE_URL}/billingCycles/${values._id}`)
      toastr.success('Sucesso', 'Ciclo de pagamento excluído com sucesso!')
      dispatch(init())
    } catch (error) {
      handleErrors(error)
    }
  }
}

// Seleciona um ciclo de pagamento para edição
export const selectBillingCycle = billingCycle => {
  return dispatch => {
    dispatch(showTabs('tabUpdate'))
    dispatch(selectTab('tabUpdate'))
    dispatch({ type: BILLING_CYCLE_SELECTED, payload: billingCycle })
  }
}

// Seleciona um ciclo de pagamento para exclusão
export const prepareToDelete = billingCycle => {
  return dispatch => {
    dispatch(showTabs('tabDelete'))
    dispatch(selectTab('tabDelete'))
    dispatch({ type: BILLING_CYCLE_SELECTED, payload: billingCycle })
  }
}

// Inicializa a tela com tabs padrão e limpa o formulário
export const init = () => {
  return dispatch => {
    dispatch(showTabs('tabList', 'tabCreate'))
    dispatch(selectTab('tabList'))
    dispatch(getList())
    dispatch({ type: BILLING_CYCLE_SELECTED, payload: null })
  }
}

// Trata e exibe erros vindos da API
const handleErrors = error => {
  if (error.response?.data?.errors) {
    error.response.data.errors.forEach(err => toastr.error('Erro', err))
  } else {
    toastr.error('Erro', 'Ocorreu um erro na operação.')
  }
}
