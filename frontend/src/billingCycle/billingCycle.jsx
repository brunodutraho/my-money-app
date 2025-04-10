import React, { Component } from 'react'
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux' 

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { selectTab, showTabs } from '../common/tab/tabActions'


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
                                <h1>Listar</h1>
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <h1>Incluir</h1>
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

const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabs}, dispatch)
export default connect(null, mapDispatchToProps)(BillingCycle)