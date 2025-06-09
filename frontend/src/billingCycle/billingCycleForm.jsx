import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, Form, Formik, FieldArray } from 'formik'

import { init } from './billingCycleAction'
import LabelAndInput from '../common/form/labelAndInput'
import Summary from './summary'

class BillingCycleForm extends Component {
  renderField = (name, label, placeholder, type, readOnly) => (
    <Field name={name}>
      {({ field }) => (
        <LabelAndInput
          id={name}
          cols='12 6 4'
          label={label}
          name={name}
          placeholder={placeholder}
          type={type}
          input={field}
          readOnly={readOnly}
        />
      )}
    </Field>
  )

  render() {
    const { initialValues, onSubmit, submitLabel, submitClass, tab, init } =
      this.props
    const readOnly = tab?.selected === 'tabDelete'

    // Função para garantir que cada item tem um id único
    const ensureIds = arr =>
      (arr || []).map(item =>
        item.id ? item : { ...item, id: Date.now() + Math.random() }
      )

    return (
      <Formik
        enableReinitialize
        initialValues={{
          name: initialValues?.name || '',
          month: initialValues?.month || '',
          year: initialValues?.year || '',
          credits: ensureIds(initialValues?.credits),
          debts: ensureIds(initialValues?.debts),
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values)
          resetForm()
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form role='form' aria-label='form'>
            <div className='box-body'>
              <div className='row form-row'>
                {this.renderField(
                  'name',
                  'Nome',
                  'Digite o nome',
                  'text',
                  readOnly
                )}
                {this.renderField(
                  'month',
                  'Mês',
                  'Digite o mês',
                  'number',
                  readOnly
                )}
                {this.renderField(
                  'year',
                  'Ano',
                  'Digite o ano',
                  'number',
                  readOnly
                )}
              </div>

              <Summary
                credit={values.credits?.reduce(
                  (total, credit) => total + Number(credit.value || 0),
                  0
                )}
                debt={values.debts?.reduce(
                  (total, debt) => total + Number(debt.value || 0),
                  0
                )}
              />

              <div className='box-flex'>
                <div>
                  <FieldArray name='credits'>
                    {({ push, remove }) => (
                      <fieldset>
                        <legend>
                          <strong>Créditos</strong>
                        </legend>
                        {values.credits.map((credit, index) => (
                          <div
                            className='row form-row'
                            key={credit.id || credit._id || index}
                          >
                            <div className='col-xs-12 col-sm-4 box-input'>
                              <label>Nome</label>
                              <Field
                                name={`credits[${index}].name`}
                                placeholder='Nome'
                                className='form-control'
                                readOnly={readOnly}
                              />
                            </div>
                            <div className='col-xs-12 col-sm-4 box-input'>
                              <label>Valor</label>
                              <Field
                                name={`credits[${index}].value`}
                                placeholder='Valor'
                                type='number'
                                className='form-control'
                                readOnly={readOnly}
                              />
                            </div>
                            <div className='col-xs-12 col-sm-4'>
                              <label>Ações</label>
                              <button
                                type='button'
                                className='btn btn-danger btn-delete'
                                onClick={() => remove(index)}
                                disabled={readOnly}
                              >
                                <i className='fa fa-trash'></i>
                              </button>
                            </div>
                          </div>
                        ))}
                        {!readOnly && (
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() =>
                              push({ id: Date.now() + Math.random(), name: '', value: 0 })
                            }
                          >
                            Adicionar Crédito
                          </button>
                        )}
                      </fieldset>
                    )}
                  </FieldArray>
                </div>

                <div>
                  <FieldArray name='debts'>
                    {({ push, remove }) => (
                      <fieldset>
                        <legend>
                          <strong>Débitos </strong>
                        </legend>
                        {values.debts.map((debt, index) => (
                          <div
                            className='row form-row'
                            key={debt.id || debt._id || index}
                          >
                            <div className='col-xs-12 col-sm-3 box-input'>
                              <label>Nome</label>
                              <Field
                                name={`debts[${index}].name`}
                                placeholder='Nome'
                                className='form-control'
                                readOnly={readOnly}
                              />
                            </div>
                            <div className='col-xs-12 col-sm-3 box-input'>
                              <label>Valor</label>
                              <Field
                                name={`debts[${index}].value`}
                                placeholder='Valor'
                                type='number'
                                className='form-control'
                                readOnly={readOnly}
                              />
                            </div>
                            <div className='col-xs-12 col-sm-3 box-input'>
                              <label>Status</label>
                              <Field
                                as='select'
                                name={`debts[${index}].status`}
                                className='form-control'
                                disabled={readOnly}
                              >
                                <option value=''>Selecione</option>
                                <option value='PAGO'>Pago</option>
                                <option value='PENDENTE'>Pendente</option>
                                <option value='AGENDADO'>Agendado</option>
                              </Field>
                            </div>
                            <div className='col-xs-12 col-sm-3 '>
                              <label>Ações</label>
                              <button
                                type='button'
                                className='btn btn-danger btn-delete'
                                onClick={() => remove(index)}
                                disabled={readOnly}
                              >
                                <i className='fa fa-trash'></i>
                              </button>
                            </div>
                          </div>
                        ))}
                        {!readOnly && (
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() =>
                              push({
                                id: Date.now() + Math.random(),
                                name: '',
                                value: 0,
                                status: '',
                              })
                            }
                          >
                            Adicionar Débito
                          </button>
                        )}
                      </fieldset>
                    )}
                  </FieldArray>
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <button
                type='submit'
                className={`btn btn-${submitClass || 'primary'} base-btn`}
                disabled={isSubmitting}
              >
                {submitLabel}
              </button>
              <button type='button' className='btn btn-default' onClick={init}>
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  tab: state.tab,
})

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)