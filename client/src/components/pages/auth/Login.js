import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Imports
import axios from 'axios'
import { setToken } from '../../../helpers/auth'

import logoSlogan from '../../../assets/images/logo2.png'
const Login = () => {

  const [passError, setPassError] = useState('')
  // ! Location Variables
  const navigate = useNavigate()

  // ! State
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setError('')
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      console.log(data)
      console.log(data.token)
      setToken(data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Invalid credentials')
    }
  }

  const goRegister = () => {
    navigate('/register')
  }

  useEffect(() => {
    setFormFields({
      email: 'gus@email.com',
      password: 'chameau12',
    })
  }, [])
  // ! JSX
  return (

    <main className="login-form-page">
      <div className='login-form-page-image'>
        {/* <img src={logoSlogan} /> */}
      </div>
      <form className="login-form" onSubmit={handleSubmit} id='login-form'>
        <h3>Sign In</h3>
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          // className='login-input'
          onChange={handleChange}
          value={formFields.email}
          placeholder="Email Address"
          required
        />
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          // className='login-input'
          onChange={handleChange}
          value={formFields.password}
          placeholder="Password"
          required
        />
        {/* Error Message */}
        {error && <small className='text-danger'>{error}</small>}
        {/* Submit */}
        <button className='action-btn login-btn'>Sign In</button>
        {/* <button onClick={loginAsGuest} className='yellow-button login-button green-button'>Skip and sign in as a test user</button> */}
      </form>
      <br />
      <p>New to Pelley Group for CPAs?</p>
      <button className='clear-btn register-btn' onClick={goRegister}>Create your account</button>
    </main>
  )
}

export default Login