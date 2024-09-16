import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email dan password tidak boleh kosong.');
            setShowAlert(true);
            return;
        }
        setError(null);

        try {
            const response = await loginUser({ email, password });
            dispatch(login(response.data));

            localStorage.setItem('token', response.data.data.token);

            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Email atau password salah.');
            setShowAlert(true);
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
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Masukkan email'
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
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Masukkan password'
                        className='form-control'
                        required
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-orange w-100">Masuk</button>
        </form>
    );
};

export default LoginForm;
