import React from 'react'
import Grid from '../layout/grid'

export default props => {
  const { cols, id, label, placeholder, readOnly, type, input, autoComplete } =
    props

  return (
    <Grid cols={cols}>
      <div className='form-group'>
        <label htmlFor={id}>{label}</label>
        <input
          {...input}
          id={id}
          className='form-control'
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          autoComplete={autoComplete || 'off'}
        />
      </div>
    </Grid>
  )
}
