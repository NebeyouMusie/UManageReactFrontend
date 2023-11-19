import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import Layout from './components/Layout';
import Guestlayout from './components/Guestlayout';
import Dashboard from './views/Dashboard';
import UserForm from './views/UserForm';

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="users"/>} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='users' element={<Users />} />
          <Route path='/users/new' element={<UserForm />}/>
          <Route path='/users/:id' element={<UserForm />}/>
      </Route>

      <Route path='/' element={<Guestlayout />} >
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup />} />
      </Route>
    </>
  ))

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App