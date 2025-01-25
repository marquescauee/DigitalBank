import React from 'react'
import { Check, X } from 'lucide-react'

const PasswordFeedback = ({ passwordValidation }: PasswordFeedbackProps) => {
  if (
    !passwordValidation.hasLowercase &&
    !passwordValidation.hasNumber &&
    !passwordValidation.hasSpecialChar &&
    !passwordValidation.hasUppercase &&
    !passwordValidation.minLength
  ) {
    return <></>
  }

  return (
    <ul className="mt-4 space-y-2 text-sm">
      <li
        className={`flex ${
          passwordValidation.minLength ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {passwordValidation.minLength ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least 8 characters
      </li>
      <li
        className={`flex ${
          passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {passwordValidation.hasUppercase ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one uppercase letter
      </li>
      <li
        className={`flex ${
          passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {passwordValidation.hasLowercase ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one lowercase letter
      </li>
      <li
        className={`flex ${
          passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {passwordValidation.hasNumber ? (
          <Check className="h-5 w-5 mr-1 text-green-600" />
        ) : (
          <X className="h-5 w-5 mr-1 text-red-600" />
        )}{' '}
        At least one number
      </li>
      <li
        className={`flex ${
          passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {passwordValidation.hasSpecialChar ? (
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
