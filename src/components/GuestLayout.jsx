import { Navigate, Outlet } from "react-router-dom"
import { useGlobalContext } from "../contexts/ContextProvider"

const GuestLayout = () => {
  const {token} = useGlobalContext();

  if(token){
    return <Navigate to="/" />
  } 

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default GuestLayout