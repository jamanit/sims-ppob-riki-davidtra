import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage: React.FC = () => {
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
                            <h3>Lengkapi data untuk membuat akun</h3>
                        </div>

                        <RegisterForm />

                        <p className="mt-4 text-center">
                            Sudah punya akun? login <Link to="/login" className='text-orange fw-bold text-decoration-none'>di sini</Link>
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

export default RegisterPage;
