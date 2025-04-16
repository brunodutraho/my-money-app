import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:3003/api'

export function getList() {
  const request = axios.get(`${BASE_URL}/billingCycles`)
  return {
    type: 'BILLING_CYCLES_FETCHED',
    payload: request,
  }
}

export function create(values) {
  return async dispatch => {
    try {
      // Envia os dados para a API para criar um novo ciclo de pagamento
      const response = await axios.post(`${BASE_URL}/billingCycles`, values)

      // Despacha a ação com os dados do ciclo criado
      dispatch({
        type: 'BILLING_CYCLE_CREATED',
        payload: response.data,
      })

      // Atualiza a lista de ciclos
      dispatch(getList())

      // Exibe uma notificação de sucesso no toastr
      toastr.success('Sucesso', 'Operação incluida com sucesso!')
      // Redireciona para a página de listagem de ciclos
    } catch (error) {
      console.error('Erro ao criar ciclo de pagamento:', error)

      // Exibe uma notificação de erro no toastr
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach(err =>
          toastr.error('Erro ao Criar', err)
        )
      } else {
        toastr.error(
          'Erro',
          'Ocorreu um erro ao tentar criar o ciclo de pagamento.'
        )
      }
    }
  }
}
