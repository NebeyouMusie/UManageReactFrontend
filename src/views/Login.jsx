import {Link} from "react-router-dom";
import {createRef} from "react";

import { useState } from "react";
import axiosClient from "../axiosClient.js";
import { useGlobalContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, tokenSet } = useGlobalContext()
  const [message, setMessage] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    await axiosClient.post('http://localhost:8000/api/login', payload)
      .then(({data}) => {
        setUser(data.user)
        tokenSet(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login to your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}