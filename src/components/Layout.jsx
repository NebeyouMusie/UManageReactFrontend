import { Link, Navigate, Outlet } from "react-router-dom"
import Dashboard from "../views/Dashboard"
import { useGlobalContext } from "../contexts/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axiosClient";

const Layout = () => {
  const {user, token, setUser, tokenSet, notification} = useGlobalContext();

  if(!token){
    return <Navigate to="/login" />
  }

  const Logout = (e) => {
      e.preventDefault();

      axiosClient.post('http://localhost:8000/api/logout')
      .then(() => {
        setUser({});
        tokenSet(null);
      });
  }

  useEffect(() => {
    const display = async () => {

      await axiosClient.get('http://localhost:8000/api/user')
      .then(({data}) => {
        setUser(data);
      });
    }

    display();
  }, []);

  function getInitials(fullName) {
    return fullName.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }

  return (
    <div id="defaultLayout">

      {/* <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside> */}

      <div className="content">
        
        <header>
          <div>
          <h1 className="logo">
          <Link to="/users">UManage.</Link>
          </h1>
          </div>
          <div className="userOptions">
            <a href="#" onClick={Logout} className="btn-logout">Logout</a>
              <h2 >
                <Link className="username" to={`/users/${user.id}`} >
                    {getInitials(user.name)}
                </Link>
              </h2>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

      </div>

      {notification && <div className="notification">
        {notification}
      </div>}
    </div>
  )
}

export default Layout