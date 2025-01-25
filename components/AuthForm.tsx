'use client'

import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomInput from './CustomInput'
import PasswordFeedback from './PasswordFeedback'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import RegisterFields from './RegisterFields'

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState<LoginUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [passwordValid, setPasswordValid] = useState<boolean>(false)

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    console.log('values', values)
    setIsLoading(false)
  }

  const emailError = form.formState.errors.email
  const isEmailValid = form.watch('email') && !emailError
  const formPassword = form.watch('password')

  const passwordValidation = {
    minLength: formPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(formPassword),
    hasLowercase: /[a-z]/.test(formPassword),
    hasNumber: /[0-9]/.test(formPassword),
    hasSpecialChar: /[\W_]/.test(formPassword),
  }

  useEffect(() => {
    const isValidPassword = Object.values(passwordValidation).every(Boolean)
    setPasswordValid(isValidPassword)
  }, [formPassword])

  const isFormValid =
    isEmailValid &&
    passwordValid &&
    Object.keys(form.formState.errors).length === 0

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={'/'} className="flex cursor-pointer items-center gap-1">
          <Image
            src={'/icons/logo.svg'}
            alt="Bank Logo"
            width={34}
            height={34}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Digital Bank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h2 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}

            <p className="text-16 font-normal text-gray-600">
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h2>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* {TODO} */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && <RegisterFields control={form.control} />}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                id="email"
                inputPlaceholder="Enter your email"
                type="email"
                key="email"
                autocomplete="email"
              />
              <div className="password-container">
                <CustomInput
                  control={form.control}
                  name="password"
                  id="password"
                  label="Password"
                  inputPlaceholder="Enter your password"
                  type="password"
                  key="password"
                  autocomplete="current-password"
                />
                <PasswordFeedback passwordValidation={passwordValidation} />
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="form-btn"
                  disabled={isLoading || !isFormValid}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="form-link"
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
