import React, { useState, useContext } from 'react';
import axios from 'axios';

import styles from './LoginInput.module.css';
import { HOST } from '../../App';
import AppContext from '../../context';

const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${HOST}Token?email=${email}&password=${password}`,
        { email: email.replace('%40', '@'), password }
      );
      console.log(response.data.access_token);
      if (response.data.access_token) {
        sessionStorage.setItem('token', 'bearer ' + response.data.access_token);
        sessionStorage.setItem('email', email);
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {!loggedIn && showModal && (
        <div className={styles.modal}>
          <div className={styles.screen}>
            <div class={styles.modalContent}>
              <svg
                className={styles.logo}
                version='1.0'
                xmlns='http://www.w3.org/2000/svg'
                width='105.000000pt'
                height='121.000000pt'
                viewBox='0 0 105.000000 121.000000'
                preserveAspectRatio='xMidYMid meet'
              >
                <g
                  transform='translate(0.000000,121.000000) scale(0.100000,-0.100000)'
                  fill='#000000'
                  stroke='none'
                >
                  <path
                    d='M241 998 c-28 -14 -54 -37 -73 -67 -29 -46 -29 -47 -26 -178 3 -128
4 -132 33 -175 17 -24 51 -54 75 -68 43 -24 55 -25 250 -30 l205 -5 3 -167 c2
-165 3 -168 24 -168 44 0 110 42 140 89 29 46 29 47 26 178 -3 128 -4 132 -33
175 -17 24 -51 54 -75 68 -43 24 -55 25 -250 30 l-205 5 -3 168 c-2 165 -3
167 -25 167 -12 0 -42 -10 -66 -22z'
                  />
                  <path
                    d='M710 940 c0 -121 33 -183 115 -221 73 -34 75 -31 75 74 0 85 -2 97
-29 139 -30 46 -95 88 -139 88 -21 0 -22 -4 -22 -80z'
                  />
                  <path
                    d='M140 367 c0 -85 2 -97 29 -139 30 -46 95 -88 139 -88 21 0 22 4 22
83 -1 122 -36 185 -122 222 -67 27 -68 26 -68 -78z'
                  />
                </g>
              </svg>
            </div>
            <div class={styles.email}>
              <label for='email'>Email Address</label>
              <div class='sec-2'>
                <ion-icon name='mail-outline'></ion-icon>
                <input
                  type='email'
                  name='email'
                  placeholder='Username@gmail.com'
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div class={styles.password}>
              <label for='password'>Password</label>
              <div class='sec-2'>
                <ion-icon name='lock-closed-outline'></ion-icon>
                <input
                  class='pas'
                  type='password'
                  name='password'
                  placeholder='············'
                  onChange={handlePasswordChange}
                />
                <ion-icon class={styles.showHide} name='eye-outline'></ion-icon>
              </div>
            </div>
            <button class={styles.login} onClick={handleLogin}>
              Login
            </button>
            <div class={styles.footer}>
              <span>Sign up</span>
              <span>Forgot Password?</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
