import React, { useRef } from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import InputMask from 'react-input-mask-next'
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
  mask?: (
    value: string,
    cursorPosition: number,
  ) => {
    maskedValue: string
    newCursorPosition: number
  }
}

const CustomInput = ({
  control,
  name,
  label,
  inputPlaceholder,
  id,
  type,
  autocomplete,
  mask,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

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
                ref={inputRef}
                autoComplete={autocomplete}
                placeholder={inputPlaceholder}
                className="input-class"
                type={type}
                id={id}
                value={field.value || ''}
                onChange={(e) => {
                  if (mask) {
                    const cursorPosition = e.target.selectionStart || 0
                    const { maskedValue, newCursorPosition } = mask(
                      e.target.value,
                      cursorPosition,
                    )

                    field.onChange(maskedValue)

                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.setSelectionRange(
                          newCursorPosition,
                          newCursorPosition,
                        )
                      }
                    }, 0)
                  } else {
                    field.onChange(e.target.value)
                  }
                }}
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
