import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <img src="/images/Logo.png" alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                <Link className="navbar-brand fw-bold" to="/">SIMS PPOB</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/topup')}`} to="/topup">Top Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/transaction')}`} to="/transaction">Transaksi</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/profile')}`} to="/profile">Akun</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
