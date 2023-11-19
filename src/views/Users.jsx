import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosClient from "../axiosClient";
import { useGlobalContext } from "../contexts/ContextProvider";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {notificationSet, user, setToken} = useGlobalContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    setLoading(true);
    axiosClient.get('/users')
    .then(({data}) => {
      setLoading(false);
      console.log(data);
      setUsers(data.data);
    })
    .catch(() => {
        setLoading(false);
    })
  }


  const onDeleteClick = async (u) => {
    if(!window.confirm("Are you sure you want to delete this user?")){
      return 
    }
  
    try {
      await axiosClient.delete(`http://localhost:8000/api/users/${u.id}`);
      notificationSet('User was successfully deleted!');
      if (user.id === u.id) {
        console.log(user.id === u.id);
        setToken(null);
        localStorage.removeItem('ACCESS_TOKEN'); // remove the token
        navigate('/signup', { replace: true }); // navigate to signup page
      } else {
        getUser();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", maxWidth: '900px', margin: '0 auto'}}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={`/users/${u.id}`}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default Users