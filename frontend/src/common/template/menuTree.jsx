import React from 'react'

export default props => (
    <li className='treeview'>
        <a href={props.path}>
            <i className={`fa fa-${props.icon}`}></i>
            <i className='fa fa-angle-left pull-right'></i>
            {props.label}
        </a>
        <ul className='treeview-menu'>
            {props.children}
        </ul>
    </li>
)