import React from 'react'
import CustomInput from './CustomInput'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

type RegisterFieldsProps = {
  control: Control<z.infer<typeof formSchema>>
}

const RegisterFields = ({ control }: RegisterFieldsProps) => {
  return (
    <>
      <div className="flex gap-4">
        <CustomInput
          control={control}
          name="firstName"
          label="Fist Name"
          id="firstName"
          inputPlaceholder="Enter your first name"
          type="text"
          key="firstName"
        />
        <CustomInput
          control={control}
          name="lastName"
          label="Last Name"
          id="lastName"
          inputPlaceholder="Enter your last name"
          type="text"
          key="lastName"
        />
      </div>
      <CustomInput
        control={control}
        name="address"
        label="Address"
        id="address"
        inputPlaceholder="Enter your address"
        type="text"
        key="address"
      />
      <CustomInput
        control={control}
        name="city"
        label="City"
        id="city"
        inputPlaceholder="Enter your city"
        type="text"
        key="city"
      />
      <div className="flex gap-4">
        <CustomInput
          control={control}
          name="state"
          label="State"
          id="state"
          inputPlaceholder="ex: CA"
          type="text"
          key="state"
        />
        <CustomInput
          control={control}
          name="postalCode"
          label="Postal Code"
          id="postalCode"
          inputPlaceholder="ex: 11101"
          type="text"
          key="postalCode"
        />
      </div>
      <div className="flex gap-4">
        <CustomInput
          control={control}
          name="dateOfBirth"
          label="Date of Birth"
          id="dob"
          inputPlaceholder="dd-mm-yyyy"
          type="text"
          key="dob"
        />
        <CustomInput
          control={control}
          name="ssn"
          label="Social Security Number"
          id="ssn"
          inputPlaceholder="Example: 8888"
          type="text"
          key="ssn"
        />
      </div>
    </>
  )
}

export default RegisterFields
