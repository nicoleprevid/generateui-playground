export interface ScreenSchema {
  entity: string

  screen: {
    type: 'form' | 'table' | 'view'
    mode: 'create' | 'edit' | 'readonly'
  }

  api: {
    operationId: string
    endpoint: string
    method: string
    submit?: {
      wrap?: string | null
    }
  }

  layout: {
    type: 'single' | 'tabs'
    tabs?: {
      id: string
      label: string
      fields: string[]
    }[]
  }

  fields: FormField[]

  actions: {
    primary?: {
      type: 'submit' | 'none'
      label: string
    }
    secondary?: any
  }

  data?: Record<string, any>
}

export interface FormField {
  name: string
  type: string
  required: boolean
  label?: string | null
  placeholder?: string | null
  ui?: string | null
  validations?: any[]
}
