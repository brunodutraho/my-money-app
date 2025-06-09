import React from 'react'
import If from '../operador/if'

export default props => (
  <If test={!props.hidden}>
    <div style={{ position: 'relative' }}>
      <input
        {...props.input}
        placeholder={props.placeholder}
        className='form-control'
        readOnly={props.readOnly}
        type={props.type}
        style={{ paddingRight: '30px', marginBottom: '10px' }}
      />
      {props.icon && (
        <span
          className={`glyphicon glyphicon-${props.icon}`}
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#aaa',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  </If>
)
