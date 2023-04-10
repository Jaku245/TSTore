import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../Components/Header';
import '../../App.css';
import Footer from "../../Components/Footer";

function Product() {

    const notify = () => toast.success("Product added to cart!");
    const [product, ] = useState(JSON.parse(localStorage.getItem('product')));
    const [productImage, setProductImage] = useState(product.variants[0].image);
    const [selectedType, setSelectedType] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const renderVariants = () => {
        return product.variants.map((variant, index) => {
            return (
                <div key={index} style={selectedType === index ? { marginRight: '20px', cursor: 'pointer', border: '1px solid #a2a2a2', padding: '3px', borderRadius: '50%' } : { marginRight: '20px', cursor: 'pointer', padding: '3px' }} onClick={() => {
                    setProductImage(variant.image)
                    setSelectedType(index)
                    setQuantity(1)
                }} >
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: variant.color }}></div>
                </div>
            )
        })
    }

    const addToCart = () => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (cart) {
            const item = cart.find(item => item.name === product.name && item.type === product.variants[selectedType].type);
            if (item) {
                item.quantity = parseInt(item.quantity) + parseInt(quantity);
            } else {
                cart.push({
                    name: product.name,
                    price: parseInt(product.price),
                    image: product.variants[selectedType].image,
                    type: product.variants[selectedType].type,
                    quantity: parseInt(quantity)
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.setItem('cart', JSON.stringify([{
                name: product.name,
                price: parseInt(product.price),
                image: product.variants[selectedType].image,
                type: product.variants[selectedType].type,
                quantity: parseInt(quantity)
            }]));
        }
        notify();
    }

    return (
        <>
            <Header />
            <div className="product-page-body">
                <div style={{ width: '360px' }}>
                    <div className="product-name">
                        {product.name}
                    </div>
                    <div>
                        <span className="product-price">${parseInt(product.price).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', marginBlock: '30px' }}>
                        {renderVariants()}
                    </div>
                    <p className="login-label">Quantity</p>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="quantity-input" />
                    <div className='not-selected-btn add-cart-btn' onClick={() => addToCart()} >Add to cart</div>
                </div>
                <div className="product-page-image">
                    <img style={{ width: '100%' }} src={productImage} alt="Product" />
                </div>
                <div className="product-description">
                    {product.description}
                </div>
            </div>
            <Footer />
            <ToastContainer
                position="top-left"
                autoClose={2000}
            />
        </>
    );
}

export default Product;
