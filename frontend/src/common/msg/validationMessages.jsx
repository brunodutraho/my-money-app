import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'

export default props => (
  <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    preventDuplicates={true}
    position='top-right'
    transitionIn='fadeIn'
    transitionOut='fadeOut'
    progressBar
  />
)

/*export const validationMessages = {
    nameRequired: "O nome é obrigatório",
    nameLength: "O nome deve ter pelo menos 3 caracteres",
    monthRequired: "O mês é obrigatório",
    monthNumber: "O mês deve ser um número",
    monthRange: "O mês deve estar entre 1 e 12",
    yearRequired: "O ano é obrigatório",
    yearNumber: "O ano deve ser um número",
    yearPositive: "O ano deve ser positivo",
};*/
