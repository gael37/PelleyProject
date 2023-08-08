
import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'


const Register = () => {

  // ! Location Variables
  const navigate = useNavigate()

  // ! State
  const [loading, setLoading] = useState(false)

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState('')
  const [passError, setPassError] = useState('')
  const [selectedImages, setSelectedImages] = useState([])

  const [firstFormFieldsLoad, setFirstFormFieldsload] = useState(false)
  const [postcodeError, setPostcodeError] = useState('')
  const [postcodeData, setPostcodeData] = useState(null)



  // ! Executions

  // Submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('form fields', formFields)
    try {
      await axios.post('/api/auth/register/', formFields)
      console.log('Register successful')
      navigate('/login')
    } catch (err) {
      if (formFields.password !== formFields.password_confirmation) {
        setErrors({
          message: 'Passwords do not match',
        })
      }
      console.log(err.response.data.message)
      setErrors(err.response.data.message)
    }
  }

  // Update formFields state when input changes
  const handleChange = (e) => {
    setPassError('')
    const updatedFormFields = {
      ...formFields,
      [e.target.name]: e.target.value,
    }
    setFormFields(updatedFormFields)

    // Setting errors back to empty string if we type into an input and an error is present
    if (errors) setErrors('')
  }


  const goLogin = () => {
    navigate('/login')
  }

  return (
    <main className="login-form-page">
      {/* <div className='login-form-page-image'>
        <img src={logoSlogan} />
      </div> */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Create an Account</h3>
        {/* Username */}
        <label htmlFor="username">Username <span>*</span></label>
        < input
          type="text"
          name="username"
          onChange={handleChange}
          value={formFields.username}
          placeholder="Username"
          required
        />
        {/* Email */}
        < label htmlFor="email" > Email < span >*</span ></label >
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formFields.email}
          placeholder="Email Address"
          required
        />
        {/* Password */}
        <label htmlFor="password">Password <span>*</span></label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formFields.password}
          placeholder="Password"
          required
        />
        {/* PasswordConfirmation */}
        <label htmlFor="passwordConfirmation">Confirm Password <span>*</span></label>
        <input
          type="password"
          name="password_confirmation"
          className='pass-input'
          onChange={handleChange}
          value={formFields.password_confirmation}
          placeholder="Confirm Password"
          required
        />
        {/* Error Message */}
        {
          errors && <small className='text-danger'>{errors}</small>
        }
        {
          passError && <small className='text-danger'>{passError}</small>
        }
        <button className='action-btn login-btn'>Sign Up</button>

      </form >
      <br></br>
      <div className="flex-signin">
        <p>Already have an account?</p>
        <button className='clear-btn register-btn' onClick={goLogin}>Sign in</button>
      </div>

    </main >
  )
}

export default Register