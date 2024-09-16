import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            setError('Password harus terdiri dari minimal 8 karakter.');
            setShowAlert(true);
            return;
        }
        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok.');
            setShowAlert(true);
            return;
        }
        setError(null);

        try {
            const response = await registerUser({ email, first_name, last_name, password });

            navigate('/login', { state: { registrationSuccess: true } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && showAlert &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
                </div>
            }

            <div className="mb-3">
                <label htmlFor="email" className='form-label'>Email</label>
                <div className="input-group">
                    <span className="input-group-text"><MdOutlineEmail /></span>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder='Masukkan email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control'
                        required
                        autoFocus
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="first_name" className='form-label'>First Name</label>
                <div className="input-group">
                    <span className="input-group-text"><HiOutlineUser /></span>
                    <input
                        type="text"
                        id="first_name"
                        value={first_name}
                        placeholder='Masukkan nama depan'
                        onChange={(e) => setFirstName(e.target.value)}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className='form-label'>Last Name</label>
                <div className="input-group">
                    <span className="input-group-text"><HiOutlineUser /></span>
                    <input
                        type="text"
                        id="last_name"
                        value={last_name}
                        placeholder='Masukkan nama belakang'
                        onChange={(e) => setLastName(e.target.value)}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password</label>
                <div className="input-group">
                    <span className="input-group-text"><MdLockOutline /></span>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='Masukkan password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="confirm_password" className='form-label'>Konfirmasi Password</label>
                <div className="input-group">
                    <span className="input-group-text"><MdLockOutline /></span>
                    <input
                        type="password"
                        id="confirm_password"
                        value={confirmPassword}
                        placeholder='Konfirmasi password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='form-control'
                        required
                    />
                </div>
            </div>

            <button type="submit" className="mt-4 btn btn-orange w-100">Registrasi</button>
        </form>
    );
};

export default RegisterForm;
