import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';

const Dashboard = () => {
  const history = useNavigate()
  const { logindata, setLoginData } = useContext(LoginContext)
  console.log(logindata)

  const dashboardvalid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch('http://localhost:5000/validuser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })

    const data = await res.json();
    if (!data.status === 401 || !data) {
      history("*")
    } else {
      console.log("user verified")
      setLoginData(data)
      history("/dashboard")

    }

  }
  useEffect(() => {
    dashboardvalid()
  }, [])
  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <img src="https://www.shareicon.net/data/2017/01/06/868320_people_512x512.png" style={{ width: "200px", marginTop: 20 }} alt="" />
      <h1>User Email: {logindata.validuserOne ? logindata.validuserOne.email : "Loading..."}</h1>
    </div>



  )
}

export default Dashboard