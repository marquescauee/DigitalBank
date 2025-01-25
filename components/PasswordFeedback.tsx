import React from 'react'
import { Check, X } from 'lucide-react'

const PasswordFeedback = ({ validation }: PasswordFeedbackProps) => {
  if (
    !validation.hasLowercase &&
    !validation.hasNumber &&
    !validation.hasSpecialChar &&
    !validation.hasUppercase &&
    !validation.minLength
  ) {
    return <></>
  }

  return (
    <ul className="mt-4 space-y-2 text-sm">
      <li
        className={`flex ${
          validation.minLength ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {validation.minLength ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least 8 characters
      </li>
      <li
        className={`flex ${
          validation.hasUppercase ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {validation.hasUppercase ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one uppercase letter
      </li>
      <li
        className={`flex ${
          validation.hasLowercase ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {validation.hasLowercase ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one lowercase letter
      </li>
      <li
        className={`flex ${
          validation.hasNumber ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {validation.hasNumber ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one number
      </li>
      <li
        className={`flex ${
          validation.hasSpecialChar ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {validation.hasSpecialChar ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one special character
      </li>
    </ul>
  )
}

export default PasswordFeedback
