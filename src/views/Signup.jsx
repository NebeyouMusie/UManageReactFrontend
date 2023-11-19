import { createRef, useState } from "react"
import { useGlobalContext } from "../contexts/ContextProvider"
import { Link } from "react-router-dom"
import axiosClient from "../axiosClient"

const Signup = () => {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, tokenSet} = useGlobalContext()
  const [errors, setErrors] = useState(null)


  const submit = async (e) => {
      e.preventDefault();

      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
      }

      await axiosClient.post('/signup', payload)
      .then(({data}) => {
        // console.log(data);
        setUser(data.user);
        tokenSet(data.token);
      })
      .catch((err) => {
        const response = err.response;

        if(response && response.status === 422){
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      })

      // console.log(payload);
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={submit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup