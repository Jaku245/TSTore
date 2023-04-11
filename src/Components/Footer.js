import '../App.css';
import logo from '../Assets/logo.png';

function Footer() {

    const sendOrderToQueue = async () => {
        // const products = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        // await fetch('https://rhpu678adc.execute-api.us-east-1.amazonaws.com/prod/addOrderToQueue', {
        await fetch('https://l48fewytlg.execute-api.us-east-1.amazonaws.com/prod/addOrderToQueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": "desaijaimin5@gmail.com",
                "products": [
                    {
                        "name": "abc",
                        "type": "1",
                        "quantity": "1"
                    }
                ]
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

    return (
        <div className='footer-background'>
            <div className='footer-logo-div'>
                <img src={logo} alt="T-Store Logo" className="footer-logo" onClick={() => sendOrderToQueue()} />
            </div>
            <div className='footer-information'>
                <p>
                    For more Information, please contact us at:
                </p>
                <p style={{ fontWeight: '600', marginLeft: '15px', fontSize: '18px' }}>
                    support@tstore.com
                </p>
            </div>
        </div>
    );
}

export default Footer;
