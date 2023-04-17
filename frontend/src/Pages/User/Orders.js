import { useEffect, useState } from 'react';
import '../../App.css'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { BACKEND_URL } from '../../Constants';

function Orders() {

    const [orders, setOrders] = useState([]);
    let subtotal = 0;

    const renderProducts = (products) => {
        return products.map((product, index) => {
            subtotal += parseInt(product.price) * parseInt(product.quantity);
            return (
                <div className="checkout-item" key={index}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                            <img src={product.image} alt="Product" className='cart-product-image' />
                            <div className='checkout-quantity'>
                                <div style={{ margin: 'auto' }}>{product.quantity}</div>
                            </div>
                        </div>
                        <div style={{ color: "#959595", marginLeft: '20px', width: '100%' }}>
                            <div className="checkout-details">
                                <div className='checkout-product-details'>
                                    <div className="checkout-item-name" style={{ color: "#000" }}>
                                        {product.name}
                                    </div>
                                    <div style={{ marginBottom: '15px', color: "#000" }}>
                                        {product.type}
                                    </div>
                                </div>
                                <div className='checkout-item-price' style={{ color: "#000" }}>
                                    ${(parseInt(product.price) * parseInt(product.quantity)).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const renderOrders = () => {
        if (orders.length === 0)
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '348px', width: '100%' }}>
                    You don't have any orders yet
                </div>
            )
        console.log(orders)
        return orders.map((order, index) => {
            subtotal=0;
            return (
                <div style={{ width: '45%', margin: '20px' }} key={index}>
                    <div>{order.date.replace(',', '')}</div>
                    {renderProducts(order.products)}
                    <div className='checkout-item'>
                        <div className='checkout-total-item'>
                            <div className='checkout-label'>Subtotal</div>
                            <div className='checkout-value'>${subtotal.toFixed(2)}</div>
                        </div>
                        <div className='checkout-total-item'>
                            <div className='checkout-label'>Shipping</div>
                            <div className='checkout-value'>$15.00</div>
                        </div>
                        <div className='checkout-total-item'>
                            <div className='checkout-total'>Total</div>
                            <div className='checkout-total-value'><span style={{ fontSize: '13px', color: '#929292', fontWeight: '400', fontStyle: 'italic' }}>USD $</span> {(subtotal + 15).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        await fetch(BACKEND_URL + '/User/GetOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('email')
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status_code === 200)
                    setOrders(data.response)
                else
                    console.log(data.response)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <Header />
            <div style={{ backgroundColor: '#F6F6F6', flex: '1', marginTop: '165px' }}>
                <h1 style={{ paddingBlock: '30px', textAlign: 'center' }}>Orders</h1>
                <div style={{ marginLeft: '20px', marginTop: '20px', width: "100%" }}>
                    <div style={{
                        display: 'flex', width: '100%',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}>
                        {renderOrders()}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders;