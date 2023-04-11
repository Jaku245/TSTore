import { useEffect, useState } from 'react';
import '../../App.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Header from '../../Components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { API_GATEWAY_URL, BACKEND_URL } from '../../Constants';

function Checkout() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [onPayment, setOnPayment] = useState(false);
    const [success, setSuccess] = useState(false);
    const [, setErrorMessage] = useState("");
    const [, setOrderID] = useState(null);
    const [paypalClientID, setPaypalClientID] = useState("");
    const navigate = useNavigate();


    const [products,] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    var subtotal = 0

    const renderProducts = () => {
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

    // reference from https://www.unimedia.tech/paypal-checkout-integration-with-react/
    // creates a paypal order
    // Card Number: 4000001240000000
    // Expiration Date: Future Month/Future/Current Year
    // CVV: Any 3 digits
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Payment for ",
                        amount: {
                            currency_code: "USD",
                            value: (subtotal + 15).toFixed(2),
                        },
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occurred with your payment ");
        console.log(data);
    };

    const placeOrder = async () => {
        await addOrderToDB()
        await sendOrderToQueue()
        await navigate('/Home', { state: { showToast: 'true' } });
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (success) {
            addOrderToDB()
            sendOrderToQueue()
            navigate('/Home', { state: { showToast: 'true' } });
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [success]
    );

    const addOrderToDB = async () => {
        const products = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        await fetch(BACKEND_URL + '/User/CreateOrder', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "id": new Date().getTime() + "",
                "email": localStorage.getItem('email'),
                "products": products,
                "date": new Date().toLocaleString(),
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status_code === 200)
                    console.log(data.response)
                else
                    console.log(data.response)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const sendOrderToQueue = async () => {
        const products = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        // await fetch('https://rhpu678adc.execute-api.us-east-1.amazonaws.com/prod/addOrderToQueue', {
        await fetch( API_GATEWAY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": localStorage.getItem('email'),
                "products": products
            })
        })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('cart');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getPyaPalCredentials()
    }, [])

    const getPyaPalCredentials = async () => {
        await fetch(BACKEND_URL + '/PaypalCredentials', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status_code === 200) {
                    setPaypalClientID(data.response)
                }
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
            <div style={{ display: 'flex', alignItems: 'stretch', paddingTop: '165px' }}>
                <div style={{ width: '40%', paddingLeft: '250px', borderRight: '1px solid #c1c1c1' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Contact Information</div>
                    <div style={{ marginLeft: '10px' }}>{localStorage.getItem('email')}</div>
                    {onPayment
                        ?
                        <>
                            <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Payment Information</div>
                            <div className="checkout-form">
                                <div style={{ marginTop: '20px' }}></div>
                                {console.log(paypalClientID)}
                                <PayPalScriptProvider options={{ "client-id": paypalClientID }}>
                                    <PayPalButtons
                                        style={{ layout: "vertical" }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                    />
                                </PayPalScriptProvider>
                                <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => setOnPayment(false)}>
                                    <div className="selected-btn">Back to Shipping</div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Shipping Address</div>
                            <div className="checkout-form">
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <input type="text" placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)} className="checkout-input" style={{ width: '100%', marginRight: '10px' }} />
                                    <input type="text" placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} className="checkout-input" style={{ width: '98%', marginLeft: '10px' }} />
                                </div>
                                <input type="text" placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} className="checkout-input" style={{ width: '95%' }} />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <input type="text" placeholder='City' value={city} onChange={e => setCity(e.target.value)} className="checkout-input" style={{ width: '98%', marginRight: '10px' }} />
                                    <input type="text" placeholder='Province' value={province} onChange={e => setProvince(e.target.value)} className="checkout-input" style={{ width: '98%', marginInline: '10px' }} />
                                    <input type="text" placeholder='Postal Code' value={postalCode} onChange={e => setPostalCode(e.target.value)} className="checkout-input" style={{ width: '98%', marginLeft: '10px' }} />
                                </div>
                                <input type="text" placeholder='Phone (optional)' value={phone} onChange={e => setPhone(e.target.value)} className="checkout-input" style={{ width: '95%' }} />
                                <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => placeOrder()}>
                                    <div className="selected-btn">Place Order</div>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div style={{ backgroundColor: '#F6F6F6', flex: '1' }}>
                    <div style={{ marginLeft: '20px', marginTop: '20px', width: "90%" }}>
                        {renderProducts()}
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout;