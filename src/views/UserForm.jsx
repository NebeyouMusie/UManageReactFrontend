import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/ContextProvider';
import axiosClient from '../axiosClient';

const UserForm = () => {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {notificationSet} = useGlobalContext()

  if(id){
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`http://localhost:8000/api/users/${id}`)
      .then(({data}) => {
        setLoading(false);
        setUser(data.data);
      })
      .catch(() => {
        setLoading(false);
      })
    }, []);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    if(user.id) {
      axiosClient.put(`http://localhost:8000/api/users/${user.id}`, user)
      .then(() => {
        notificationSet('user was successfully updated!');
        navigate('/users');
      })
      .catch((err) => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
        }
      })
    }else{
      axiosClient.post(`http://localhost:8000/api/users`, user)
      .then(() => {
        notificationSet('user was successfully created!');
        navigate('/users');
      })
      .catch((err) => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
        }
      })
    }
  }

  return (
    <>
    
    {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
    <div className="card animated fadeInDown">
      {loading && (
        <div className="text-center">
          Loading...
        </div>
      )}
      {errors &&
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }
      {!loading && (
        <form onSubmit={onSubmit}>
          <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
          <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
          <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
          <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
          <button className="btn">Save</button>
        </form>
      )}
    </div>
  </>
  )
}

export default UserForm;