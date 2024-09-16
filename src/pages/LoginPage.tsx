import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
    const location = useLocation();
    const { registrationSuccess } = location.state || {};
    const [showAlert, setShowAlert] = useState(true);

    return (
        <div className="container-fluid">
            <div className="row no-gutters">
                <div className="col-lg-5 col-md-6 d-flex justify-content-center">
                    <div className="p-5">
                        <div className="mb-5 text-center">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <img src="/images/Logo.png" alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                <h4>SIMS PPOB</h4>
                            </div>
                            <h3>Masuk atau buat akun untuk memulai</h3>
                        </div>

                        {registrationSuccess && showAlert && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                Registrasi berhasil silahkan login.
                                <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
                            </div>
                        )}

                        <LoginForm />

                        <p className="mt-4 text-center">
                            Belum punya akun? registrasi <Link to="/register" className='text-orange fw-bold text-decoration-none'>di sini</Link>
                        </p>
                    </div>
                </div>
                <div className="col-lg-7 col-md-6 d-none d-md-block d-flex align-items-center justify-content-center">
                    <img src="/images/Illustrasi Login.png" alt="Background" className="img-fluid w-100 h-100 object-fit-cover" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
