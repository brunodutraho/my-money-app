import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default function Menu() {
  return (
    <ul className='sidebar-menu'>
      <MenuItem path='/app/dashboard' label='Dashboard' icon='dashboard' />
      <MenuTree label='Cadastro' icon='edit'>
        <MenuItem
          path='/app/billingCycles'
          label='Ciclos de Pagamentos'
          icon='usd'
        />
      </MenuTree>
    </ul>
  )
}
