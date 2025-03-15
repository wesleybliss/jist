import { createContext  } from 'react'

const FormFieldContext = createContext({})

const FormField = ({ ...props }) => {
    const { name } = props
    const fieldContext = { name }
    
    // eslint-disable-next-line no-restricted-globals
    return document.createElement(FormFieldContext.Provider, { value: fieldContext }, props.children)
}

export { FormField, FormFieldContext }
