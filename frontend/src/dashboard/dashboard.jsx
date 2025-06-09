import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Row from '../common/layout/row'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import ValueBox from '../common/widget/valueBox'
import { getSummary } from './dashboardAction'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getSummary()
  }

  render() {
    const { credit = 0, debt = 0 } = this.props.summary || {}
    return (
      <div>
        <ContentHeader title='Dashboard' small='Versão 1.0' />
        <Content>
          <Row>
            <ValueBox
              cols='12 4'
              color='green'
              icon='bank'
              value={`R$ ${credit.toFixed(2)}`}
              text='Total de Créditos'
            />
            <ValueBox
              cols='12 4'
              color='red'
              icon='credit-card'
              value={`R$ ${debt.toFixed(2)}`}
              text='Total de Débitos'
            />
            <ValueBox
              cols='12 4'
              color='blue'
              icon='money'
              value={`R$ ${(credit - debt).toFixed(2)}`}
              text='Valor Consolidado'
            />
          </Row>
        </Content>
      </div>
    )
  }
}

const mapStateToProps = state => ({ summary: state.dashboard.summary })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSummary }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
