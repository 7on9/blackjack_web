import React from 'react'
import './style.css'

const Entry = () => {
  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="text" name="password" required />
            <label>Room</label>
          </div>
          <a href="#">
            <span />
            <span />
            <span />
            <span />
            Submit
          </a>
        </form>
      </div>
    </>
  )
}

export default Entry
