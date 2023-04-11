import '../App.css';
import logo from '../Assets/logo.png';

function Footer() {

    return (
        <div className='footer-background'>
            <div className='footer-logo-div'>
                <img src={logo} alt="T-Store Logo" className="footer-logo" />
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
