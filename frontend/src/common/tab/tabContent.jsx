import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import If from '../operador/if'

class TabContent extends Component {
  render() {
    const visible = this.props.tab.visible[this.props.id]
    const selected = this.props.tab.selected === this.props.id
    return (
      <If test={visible}>
        <div
          id={this.props.id}
          className={`tab-pane ${selected ? 'active' : ''}`}
        >
          {this.props.children}
        </div>
      </If>
    )
  }
}

const mapStateToProps = state => ({ tab: state.tab })
export default connect(mapStateToProps)(TabContent)
