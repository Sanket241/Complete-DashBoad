import React, { useState } from 'react'
import "./mix.css"
import { NavLink } from 'react-router-dom';
const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCpassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: ""
  })
  console.log(inpval)

  const setVal = (e) => {
    // console.log(e.target.value)
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }
  const addUserdata = async (e) => {
    e.preventDefault();
    const { fname, password, email, cpassword } = inpval;
    if (fname === "") {
      alert("Please enter your name");
    }
    else if (email === "") {
      alert("Please enter your email");
    }
    else if (!email.includes === "@") {
      alert("Please enter valid email");

    }
    else if (password === "") {
      alert("Please enter your password");

    }
    else if (password.length < 6) {
      alert("password must be 6 char");

    }
    else if (cpassword === "") {
      alert("Please enter your password");

    }
    else if (cpassword.length < 6) {
      alert("password must be 6 char");

    }
    else if (password !== cpassword) {
      alert("passowrd and confirm pass does not match")
    }
    else {
      console.log("done")
      const data = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({
          fname, email, password, cpassword
        }), headers: {
          "Content-Type": "application/json"
        }
      })
      const res = await data.json();
      console.log(res)

      // for clean element in block on register page

      //          <-----------   // pahla tarika 1  ----------->

      // localStorage.setItem("user",JSON.stringify(res))
      // const auth = localStorage.getItem('user')
      // if(auth){
      //   // alert("User Registered");
      //   setInpval({...inpval,fname:"",email:"",password:"",cpassword:""});
      // }


      //          <-----------   // pahla tarika 2  ----------->

      if (res.status === 201) {// <<<<<<<--------------- this is directly connected toward in router.js line no 27 status wala
        alert("User Registered")
        // console.log(res.status)
        setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });

      }
    }
  }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up </h1>
            <p style={{ textAlign: "center" }}>We are glad to you will be using project cloud to mangae <br />
              you tasks! We hope that you yopu will get like it.</p>
          </div>

          <form>

            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input type="text" onChange={setVal} name='fname' value={inpval.fname} id='fname' placeholder='Enter Your Name' />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" onChange={setVal} name='email' value={inpval.email} id='email' placeholder='Enter Your Email address' />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter your password ' />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name='cpassword' id='cpassword' placeholder='Enter your Confirm Password ' />
                <div className="showpass" onClick={() => setCpassShow(!cpassShow)}>{!cpassShow ? "Show" : "Hide"}</div>
              </div>
            </div>
            <button className='btn' onClick={addUserdata}>Sign Up</button>
            <p>Already have an account ?<NavLink to="/">Sign in</NavLink> </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register