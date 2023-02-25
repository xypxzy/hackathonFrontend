import './index.css';
import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home.jsx';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context';

export const HOST = 'http://192.168.11.244/';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartData = await axios.get(
          'https://63a9da26594f75dc1dc25cdf.mockapi.io/cart'
        );
        const favouriteData = await axios.get(
          'https://63a9da26594f75dc1dc25cdf.mockapi.io/favourites'
        );
        const itemsData = await axios.get(
          `https://63a9da26594f75dc1dc25cdf.mockapi.io/items`
        );

        setCartItems(cartData.data);
        setFavourites(favouriteData.data);
        setItems(itemsData.data);
      } catch (e) {
        alert('Error while data request');
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          'https://63a9da26594f75dc1dc25cdf.mockapi.io/cart/' + findItem.id
        );
      } else {
        const { data } = await axios.post(
          'https://63a9da26594f75dc1dc25cdf.mockapi.io/cart',
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (e) {
      alert('can not add to cart');
      console.error(e);
    }
  };
  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(
          'https://63a9da26594f75dc1dc25cdf.mockapi.io/favourites/' + obj.id
        );
        setFavourites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          'https://63a9da26594f75dc1dc25cdf.mockapi.io/favourites',
          obj
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (e) {
      alert("can't add to favourite");
      console.error(e);
    }
  };
  const onRemoveItem = (id) => {
    axios.delete('https://63a9da26594f75dc1dc25cdf.mockapi.io/cart/' + id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        isItemAdded,
        onAddToFavourite,
        setCartOpened,
        setCartItems,
        loggedIn,
        setLoggedIn,
      }}
    >
      <div className='wrapper clear flex-wrap'>
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavourite={onAddToFavourite}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route path='/favorites' element={<Favourites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
