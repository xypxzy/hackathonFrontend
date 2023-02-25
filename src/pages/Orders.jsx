import Index from '../components/Card';
import React from 'react';
import axios from 'axios';

import Login from '../components/LoginInput/LoginInput';

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'https://63a9da26594f75dc1dc25cdf.mockapi.io/orders'
      );
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
    })();
  }, []);

  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>My orders</h1>
      </div>

      <div className='d-flex flex-wrap'>
        {orders.map((item, index) => (
          <Index key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
