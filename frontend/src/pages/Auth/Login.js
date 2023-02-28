import './Auth.css'

import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../slices/authSlice'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    dispatch(login(user))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Login to see what's brand new!</p>
      <form onSubmit={handleSubmit}>

        <input type="text" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />

        <input type="password" name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />

        {!loading && <input type="submit" value="Log in" />}

        {loading && <input type="submit" value="Logging..." disabled />}

        {error && <Message msg={error} type="error" />}

      </form>
      <p>Do not have an account? <Link to="/register">Register!</Link></p>
    </div>
  )
}

export default Login