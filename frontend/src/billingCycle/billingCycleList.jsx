import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getList,
  prepareToDelete,
  selectBillingCycle,
} from './billingCycleAction'

class BillingCycleList extends Component {
  componentDidMount() {
    this.props.getList()
  }

  renderRows() {
    const list = this.props.list || []

    return list.map(bc => (
      <tr key={bc._id}>
        <td>{bc.name}</td>
        <td>{bc.month}</td>
        <td>{bc.year}</td>
        <td>
          <button
            className='btn btn-warning base-btn'
            onClick={() => this.props.selectBillingCycle(bc)}
          >
            <i className='fa fa-pencil'></i>
          </button>
          <button
            className='btn btn-danger'
            onClick={() => this.props.prepareToDelete(bc)}
          >
            <i className='fa fa-trash'></i>
          </button>
        </td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Mês</th>
              <th>Ano</th>
              <th className='table-actions'>Ações</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.billingCycle.list,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList, prepareToDelete, selectBillingCycle }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)
