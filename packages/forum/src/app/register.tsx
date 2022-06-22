import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { userLogin } from '../service/auth'

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  return (
    <form onSubmit={handleSubmit(userLogin)}>
      <input
        {...register('email', {
          required: 'This is required field',
        })}
        placeholder="Email"
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p>{message}</p>}
      />

      <input
        {...register('password', {
          required: 'This is required field',
        })}
        type="password"
        placeholder="Password"
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p>{message}</p>}
      />

      <input type="submit" />
    </form>
  )
}
