import React from 'react'

import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

const Summary = ({ credit = 0, debt = 0 }) => {
  const formatCurrency = value => `R$ ${Number(value).toFixed(2)}`

  return (
    <Grid cols='12'>
      <fieldset>
        <legend>Resumo</legend>
        <Row>
          <ValueBox
            cols='12 4'
            color='green'
            icon='bank'
            value={formatCurrency(credit)}
            text='Total de Créditos'
          />
          <ValueBox
            cols='12 4'
            color='red'
            icon='credit-card'
            value={formatCurrency(debt)}
            text='Total de Débitos'
          />
          <ValueBox
            cols='12 4'
            color='blue'
            icon='money'
            value={formatCurrency(credit - debt)}
            text='Valor Consolidado'
          />
        </Row>
      </fieldset>
    </Grid>
  )
}

export default Summary
