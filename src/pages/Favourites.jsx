import Card from '../components/Card';
import React from 'react';
import AppContext from '../context';

function Favourites() {
  const { favourites, onAddToFavourite } = React.useContext(AppContext);

  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>My favourites</h1>
      </div>

      <div className='d-flex flex-wrap'>
        {favourites.map((item, index) => (
          <Card
            key={index}
            favourited={true}
            onFavourite={onAddToFavourite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favourites;
