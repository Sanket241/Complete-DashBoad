import React, { useContext } from 'react';
import './header.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goerror = () => {
    history("*")
  }
  const goDash = () => {
    history("/dashboard")
  }
  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch('http://localhost:5000/logout', {
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
      history("/")

    }

  }

  return (
    <>
      <header>
        <nav>
          <h1>ATTIRE</h1>
          <div className="avtar">
            {
              logindata.validuserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.validuserOne.fname[0].toUpperCase()}</Avatar> :
                <Avatar style={{ background: "blue" }} onClick={handleClick} />
            }
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              logindata.validuserOne ? (
                <>
                  <MenuItem onClick={() => {
                    goDash()
                    handleClose()
                  }}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                  }}>Logout</MenuItem>
                </>

              )
                : (
                  <MenuItem onClick={() => {
                    handleClose()
                    goerror()
                  }}
                  >Profile</MenuItem>
                )
            }

          </Menu>

        </nav>
      </header>
    </>
  );
};

export default Header;
