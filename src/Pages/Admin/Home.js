import Header from '../../Components/Header';
import '../../App.css';

function AdminHome() {

    return (
        <>
            <Header />
            <div>
                {"Admin: " + localStorage.getItem('email')}
            </div>
        </>
    );
}

export default AdminHome;
