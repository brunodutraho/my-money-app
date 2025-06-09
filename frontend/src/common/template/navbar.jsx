import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'
import { Link, useNavigate } from 'react-router-dom'

// Componente wrapper para usar navigate em class component
function NavbarWrapper(props) {
  const navigate = useNavigate()
  return <Navbar {...props} navigate={navigate} />
}

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  changeOpen = () => {
    this.setState({ open: !this.state.open })
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.logout()
    this.props.navigate('/login') // redireciona
  }

  render() {
    const { name, email } = this.props.user || {}

    return (
      <div className='navbar-custom-menu'>
        <ul className='nav navbar-nav'>
          <li
            onMouseLeave={this.changeOpen}
            className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}
          >
            <Link
              to='#'
              onClick={e => {
                e.preventDefault()
                this.changeOpen()
              }}
              aria-expanded={this.state.open ? 'true' : 'false'}
              className='dropdown-toggle'
              data-toggle='dropdown'
            >
              <img
                src='https://lorempixel.com/160/160/abstract'
                className='user-image'
                alt='User'
              />
              <span className='hidden-xs'>{name}</span>
            </Link>

            <ul className='dropdown-menu'>
              <li className='user-header'>
                <img
                  src='https://lorempixel.com/160/160/abstract'
                  className='img-circle'
                  alt='User'
                />
                <p>
                  {name}
                  <small>{email}</small>
                </p>
              </li>
              <li className='user-footer'>
                <div className='pull-right'>
                  <Link
                    to='#'
                    onClick={this.handleLogout}
                    className='btn btn-default btn-flat'
                  >
                    Sair
                  </Link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NavbarWrapper)
