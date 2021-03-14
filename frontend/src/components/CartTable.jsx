import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartRemoveItem } from '../actions/actionCreators';
import './Style/CartTable.css';

// Таблица товаров в корзине

export default function CartTable() {
  const { orders } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = orders.reduce((sum, { price, count }) => sum + price * count, 0);

  return (
      <div>
        <div className='title'>
          <h2 className='text-center'>Корзина</h2>
        </div>
        <section className='cart'>
          <div className='table-icons'>
            <span className='table-icon' scope='col'>#</span>
            <span scope='col'>Название</span>
            <span scope='col'>Кол-во</span>
            <span scope='col'>Стоимость</span>
            <span scope='col'>Итого</span>
            <span scope='col'>Действия</span>
          </div>
          <div className='table-content'>
            {orders.map((order, index) => (
                <div className='table-order' key={order.id}>
                  <span scope='row'>{index + 1}</span>
                  <span className='total-name'><Link to={`/catalog/${order.id}`}>{order.title}</Link></span>
                  <span>{order.count}</span>
                  <span>{order.price} руб.</span>
                  <span>{order.price * order.count} руб.</span>
                  <span><button className='btn btn-outline-danger btn-sm' onClick={() => dispatch(cartRemoveItem(order.id))}>Удалить</button>
              </span>
                </div>
            ))}

            <div className='total'>
              <span colSpan='5' className='text-right'>Общая стоимость</span>
              <span>{total} руб.</span>
            </div>
          </div>
        </section>
      </div>
  );
}