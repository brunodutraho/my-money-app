import { Field, Form, Formik } from 'formik'
import React, { Component } from 'react'

class BillingCycleForm extends Component {

  render() {
    const { initialValues, onSubmit } = this.props // Recebe os valores iniciais e a função de submissão via props

    return (
      <Formik
        initialValues={initialValues || { name: '', month: '', year: '' }} // Usa valores iniciais fornecidos ou padrão
        validate={this.validate} // Validação
        onSubmit={onSubmit} // Função de submissão passada via props
      >
        {({ errors, touched, isSubmitting }) => (
          <Form role='form' aria-label='form'>
            <div className='box-body'>
              <label htmlFor='name'>Nome</label>
              <Field type='text' name='name' id='name' />
              {touched.name && errors.name && (
                <div className='error'>{errors.name}</div>
              )}
              <label htmlFor='month'>Mês</label>
              <Field type='number' name='month' id='month' />
              {touched.month && errors.month && (
                <div className='error'>{errors.month}</div>
              )}
              <label htmlFor='year'>Ano</label>
              <Field type='number' name='year' id='year' />
              {touched.year && errors.year && (
                <div className='error'>{errors.year}</div>
              )}
            </div>
            <div className='box-footer'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isSubmitting}
              >
                {this.props.submitLabel}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

export default BillingCycleForm
