import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useCart } from '../hooks/useCart';
import AppContext from '../context';

import './Header.css';

function Header(props) {
  const { totalPrice } = useCart();
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  function handleClick() {
    return setLoggedIn(true);
  }

  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='/'>
        <div className='d-flex align-center'>
          <img width={40} height={40} src='/img/logo.svg' alt={'logoImg'} />
          <div>
            <h3 className='text-uppercase'>Sneakers</h3>
            <p className='opacity-5'>The store of the best sneakers</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex'>
        <li className='mr-30 cu-p' onClick={props.onClickCart}>
          <img width={18} height={18} src='/img/cart.svg' alt={'cartImg'} />
          <span>{totalPrice}$</span>
        </li>
        <li>
          <Link to='/favorites'>
            <img
              className='mr-30 cu-p'
              width={18}
              height={18}
              src='/img/heart.svg'
              alt={'heartImg'}
            />
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <img width={18} height={18} src='/img/user.svg' alt={'userImg'} />
          </Link>
        </li>
        {loggedIn ? (
          <li>
            <button
              onClick={() => {
                sessionStorage.removeItem('token');
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <button className='button-2' onClick={handleClick}>
            Login
          </button>
        )}
      </ul>
    </header>
  );
}
export default Header;
