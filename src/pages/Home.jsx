import Index from '../components/Card';
import React from 'react';
import Login from '../components/LoginInput/LoginInput';
function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavourite,
  onAddToCart,
}) {
  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>{searchValue ? searchValue : 'All sneakers'}</h1>
        <div className='search-block d-flex'>
          <img src='/img/search.svg' alt='search img' />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className='clear cu-p'
              src='/img/btn-remove.svg'
              alt='clear btn'
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder='Search'
          />
        </div>
      </div>

      <Login />
      <div className='d-flex flex-wrap'>
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Index
              key={index}
              onFavourite={(obj) => onAddToFavourite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading
              {...item}
            />
          ))}
      </div>
    </div>
  );
}
export default Home;
