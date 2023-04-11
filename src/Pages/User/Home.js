import { useEffect, useState } from "react";

import Header from '../../Components/Header';
import '../../App.css';
import { BACKEND_URL } from "../../Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../Components/Footer";

function Home() {

    const navigate = useNavigate();
    const location = useLocation();
    const notify = () => toast.success("Order places successfully.");
    let state = location.state;

    if (state) {
        if (state.showToast && state.showToast === 'true') {
            notify();
            location.state.showToast = 'false';
        }
    }

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // const login = async () => {
    //     const profile = {
    //         email: email,
    //         password: password
    //     }
    //     await fetch(BACKEND_URL + '/User/Login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(profile)
    //     }).then(res => res.json())
    //         .then(data => {
    //             if (data.status_code === 200) {
    //                 localStorage.setItem('email', email);
    //                 setEmail('');
    //                 setPassword('');
    //             }
    //             else
    //                 alert(data.message);
    //         });
    // }

    useEffect(() => {
        async function fetchData() {

            setIsLoading(true)
            await fetch(BACKEND_URL + '/GetProducts', {
                method: 'GET'
            }).then(res => {
                console.log(res);
                return res.json();
            })
                .then(async data => {
                    if (data.status_code === 200) {
                        await setProducts(data.response);
                    }
                    else
                        alert(data.response);
                    setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                    setIsLoading(false)
                });
        }
        fetchData();
    }, []);

    const renderProducts = () => {
        if (products.length === 0)
            return <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: '200', height: '450px' }}>No Products Found</div>
        return products.map((product, index) => {
            return (
                <div className="product-body" key={index} onClick={() => {
                    localStorage.setItem('product', JSON.stringify(product));
                    navigate('/Product')
                }}>
                    <div className="figure">
                        <img className="Sirv image-main" src={product.variants[0].thumbnail} data-src={product.variants[0].image} alt="thumbnail" />
                        <img className="Sirv image-hover" src={product.variants[0].image} alt="main" />
                    </div>
                    <div style={{ paddingTop: '10px', fontWeight: '200', fontSize: '14px' }}>
                        {product.name}
                    </div>
                    <div>
                        From <span style={{ fontWeight: 800 }}>${parseInt(product.price).toFixed(2)}</span>
                    </div>
                </div>
            )
        });
    }

    return (
        <>
            <div className="home-body">
                {
                    isLoading ?
                        <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: '200', height: '450px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#000", opacity: '0.2', color: '#fff' }}>Fetching Items...</div>
                        :
                        <>
                            {renderProducts()}
                        </>
                }
            </div>
            <Header />
            <Footer />
            <ToastContainer
                position="top-left"
                autoClose={5000}
            />
        </>
    );
}

export default Home;
