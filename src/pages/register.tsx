import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { FC, useState } from 'react'

const Register: FC = () => {
  const { register } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = async (event: any) => {
    event.preventDefault()

    register({ email, password })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </a>
          </Link>
        }>
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              className="block mt-1 w-full"
              type="email"
              onChange={event => setEmail(event.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              className="block mt-1 w-full"
              type="password"
              onChange={event => setPassword(event.target.value)}
              value={password}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/login">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Already registered?
              </a>
            </Link>

            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Register
