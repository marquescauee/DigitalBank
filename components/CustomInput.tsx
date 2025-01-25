import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath, Form } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  inputPlaceholder: string
  type: string
  id: string
  autocomplete?: string
}

const CustomInput = ({
  control,
  name,
  label,
  inputPlaceholder,
  id,
  type,
  autocomplete,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                autoComplete={autocomplete}
                placeholder={inputPlaceholder}
                className="input-class"
                type={type}
                id={id}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput
