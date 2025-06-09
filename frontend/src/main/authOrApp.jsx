import '../common/template/dependencies'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navigate } from 'react-router-dom'

import { validateToken } from '../auth/authActions'

class AuthOrApp extends Component {
  componentDidMount() {
    if (this.props.auth.user) {
      this.props.validateToken(this.props.auth.user.token)
    }
  }

  render() {
    const { user, validToken } = this.props.auth
    if (user && validToken) {
      axios.defaults.headers.common['authorization'] = user.token
      return <Navigate to='/app/dashboard' replace />
    } else if (!user && !validToken) {
      return <Navigate to='/login' replace />
    } else {
      return false
    }
  }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ validateToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)
