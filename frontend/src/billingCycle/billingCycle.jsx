import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectTab, showTabs } from '../common/tab/tabActions'
import TabContent from '../common/tab/tabContent'
import TabHeader from '../common/tab/tabHeader'
import Tabs from '../common/tab/tabs'
import TabsContent from '../common/tab/tabsContent'
import TabsHeader from '../common/tab/tabsHeader'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import {
  create,
  update,
  remove,
  selectBillingCycle,
  init,
} from './billingCycleAction'

import BillingCycleForm from './billingCycleForm'
import List from './billingCycleList'

class BillingCycle extends Component {
  componentDidMount() {
    this.props.init() // já busca a lista e limpa seleção, seta aba list
  }

  render() {
    const { selectedCycle } = this.props

    return (
      <div>
        <ContentHeader title='Ciclos de Pagamento' small='Cadastro' />
        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader icon='bars' label=' Listar' target='tabList' />
              <TabHeader icon='plus' label=' Incluir' target='tabCreate' />
              <TabHeader icon='pencil' label=' Alterar' target='tabUpdate' />
              <TabHeader icon='trash-o' label=' Excluir' target='tabDelete' />
            </TabsHeader>
            <TabsContent>
              <TabContent id='tabList'>
                <List />
              </TabContent>

              <TabContent id='tabCreate'>
                <BillingCycleForm
                  onSubmit={this.props.create}
                  initialValues={{ name: '', month: '', year: '' }}
                  submitLabel='Incluir'
                  submitClass='primary'
                  key='create'
                />
              </TabContent>

              <TabContent id='tabUpdate'>
                <BillingCycleForm
                  onSubmit={this.props.update}
                  initialValues={
                    selectedCycle || { name: '', month: '', year: '' }
                  }
                  submitLabel='Alterar'
                  submitClass='info'
                  key={selectedCycle?._id || 'empty'}
                />
              </TabContent>

              <TabContent id='tabDelete'>
                <BillingCycleForm
                  onSubmit={this.props.remove}
                  readOnly={true}
                  initialValues={
                    selectedCycle || { name: '', month: '', year: '' }
                  }
                  submitLabel='Excluir'
                  submitClass='danger'
                  key={selectedCycle?._id || 'empty'}
                />
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedCycle: state.billingCycle.selectedCycle,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { selectTab, showTabs, create, update, remove, selectBillingCycle, init },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycle)
