import './auth.css'
import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'

import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operador/if'
import Messages from '../common/msg/validationMessages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { loginMode: true }
  }

  changeMode = () => {
    this.setState({ loginMode: !this.state.loginMode })
  }

  onSubmit = (values, { setSubmitting }) => {
    const { login, signup, navigate } = this.props
    if (this.state.loginMode) {
      login(values, navigate)
    } else {
      signup(values, navigate)
    }
    setSubmitting(false)
  }

  validate = values => {
    const errors = {}

    if (!this.state.loginMode && !values.name) {
      errors.name = 'Nome é obrigatório'
    }

    if (!values.email) {
      errors.email = 'E-mail é obrigatório'
    } else if (!/.+@.+\..+/.test(values.email)) {
      errors.email = 'E-mail inválido'
    }

    if (!values.password) {
      errors.password = 'Senha é obrigatória'
    } else if (!this.state.loginMode) {
      if (values.password.length < 6) {
        errors.password = 'A senha deve ter no mínimo 6 caracteres'
      }
      if (!/[A-Z]/.test(values.password)) {
        errors.password = 'A senha deve conter uma letra maiúscula'
      }
      if (!/[0-9]/.test(values.password)) {
        errors.password = 'A senha deve conter um número'
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = 'A senha deve conter um caractere especial'
      }
    }

    if (!this.state.loginMode && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem'
    }

    return errors
  }

  render() {
    const { loginMode } = this.state

    return (
      <Grid cols='12'>
        <Row>
          <Messages />

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validate={this.validate}
            onSubmit={this.onSubmit}
          >
            {() => (
              <div className='login-box'>
                <div className='login-logo'>
                  <a href='/'>
                    <b>My</b>Money
                  </a>
                </div>
                <div className='login-box-body'>
                  <p className='login-box-msg'>Bem-vindo!</p>

                  <Form>
                    <If test={!loginMode}>
                      <>
                        <Field
                          name='name'
                          type='text'
                          placeholder='Nome'
                          className='form-control field-auth'
                        />
                        <ErrorMessage
                          name='name'
                          component='div'
                          className='text-danger'
                        />
                      </>
                    </If>

                    <Field
                      name='email'
                      type='email'
                      placeholder='E-mail'
                      className='form-control field-auth'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-danger'
                    />

                    <Field
                      name='password'
                      type='password'
                      placeholder='Senha'
                      className='form-control field-auth'
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='text-danger'
                    />

                    <If test={!loginMode}>
                      <>
                        <Field
                          name='confirmPassword'
                          type='password'
                          placeholder='Confirme a senha'
                          className='form-control field-auth'
                          icon='lock'
                          component={Input}
                        />
                        <ErrorMessage
                          name='confirmPassword'
                          component='div'
                          className='text-danger'
                        />
                      </>
                    </If>

                    <Row>
                      <Grid cols='12'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-enter'
                        >
                          {loginMode ? 'Entrar' : 'Cadastrar'}
                        </button>

                        <a
                          href='#'
                          onClick={e => {
                            e.preventDefault()
                            this.changeMode()
                          }}
                          className='btn btn-secondary'
                        >
                          {loginMode
                            ? 'Novo usuário? Registrar aqui!'
                            : 'Já tem uma conta? Entrar aqui!'}
                        </a>
                      </Grid>
                    </Row>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </Row>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, signup }, dispatch)

function AuthWrapper(props) {
  const navigate = useNavigate()
  return <Auth {...props} navigate={navigate} />
}

export default connect(null, mapDispatchToProps)(AuthWrapper)
