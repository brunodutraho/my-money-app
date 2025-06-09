import React from 'react'
import { Field } from 'formik'
import Grid from '../common/layout/grid'

const ItemList = ({
  fieldName,
  values,
  push,
  remove,
  readOnly,
  legend,
  fields,
  emptyItem,
  cols,
}) => {
  const list = values[fieldName] || []

  return (
    <fieldset>
      <legend>{legend}</legend>
      {list.map((item, index) => (
        <div className='row' key={index}>
          {fields.map(field => (
            <Grid cols={cols} key={field.name}>
              <Field name={`${fieldName}[${index}].${field.name}`}>
                {({ field: formikField }) => (
                  <>
                    <label>{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        {...formikField}
                        className='form-control'
                        disabled={readOnly}
                      >
                        {field.options.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...formikField}
                        type={field.type}
                        placeholder={field.placeholder}
                        className='form-control'
                        readOnly={readOnly}
                      />
                    )}
                  </>
                )}
              </Field>
            </Grid>
          ))}

          {!readOnly && (
            <div>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => remove(index)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </div>
          )}
        </div>
      ))}

      {!readOnly && (
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => push(emptyItem)}
        >
          Adicionar
        </button>
      )}
    </fieldset>
  )
}

export default ItemList
