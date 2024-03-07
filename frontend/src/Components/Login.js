import React, { useState } from 'react'
import "./mix.css"
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",

  })
  const navigate = useNavigate()
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
  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
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
    else {
      try {
        const data = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email, password
          })
        });

        if (!data.ok) {
          throw new Error(`HTTP error! Status: ${data.status}`);
        }

        const res = await data.json();
        console.log(res);

        if (res.status === 201) {  // Check for 'status' instead of 'staus'
          localStorage.setItem('usersdatatoken', res.result.token);
          navigate('/dashboard');
          setInpval({ ...inpval, email: "", password: "" });
        } else {
          alert("Login failed. Check your credentials.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred during login. Please try again.");
      }
    }
  }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back log In</h1>
            <p>We are glad to you are back. please login</p>
          </div>

          <form>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter Your Email address' />
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passShow ? "password" : "text"} name='password' value={inpval.password} onChange={setVal} id='password' placeholder='Enter your password Address' />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
              </div>
            </div>

            <button className='btn' onClick={loginuser}>Login</button>
            <p>Don't Have an account? <NavLink to="/register" >Sign Up</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login