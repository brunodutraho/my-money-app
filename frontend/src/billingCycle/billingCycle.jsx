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
import { create } from './billingCycleAction'

import BillingCycleForm from './billingCycleForm'
import List from './billingCycleList'

class BillingCycle extends Component {
  componentDidMount() {
    this.props.selectTab('tabList')
    this.props.showTabs('tabList', 'tabCreate')
  }

  render() {
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
                />
              </TabContent>
              <TabContent id='tabUpdate'>
                <h1>Alterar</h1>
              </TabContent>
              <TabContent id='tabDelete'>
                <h1>Excluir</h1>
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTab, showTabs, create }, dispatch)
export default connect(null, mapDispatchToProps)(BillingCycle)
