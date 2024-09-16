import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, ProfileUpdate, ProfileImage } from '../services/api';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { FaPencilAlt } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userResponse = await fetchProfile(token);
                    if (userResponse.data.status === 0) {
                        setEmail(userResponse.data.data.email);
                        setFirstName(userResponse.data.data.first_name);
                        setLastName(userResponse.data.data.last_name);
                        const imageUrl = userResponse.data.data.profile_image;
                        setProfileImage(imageUrl && !imageUrl.includes('null') ? imageUrl : null);
                    } else {
                        setAlert({ type: 'danger', message: 'Gagal mengambil data pengguna.' });
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data pengguna:', error);
                    setAlert({ type: 'danger', message: 'Terjadi kesalahan saat mengambil data pengguna.' });
                }
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAlert(null);

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const updatedData = {
                    email,
                    first_name: firstName,
                    last_name: lastName,
                };

                const response = await ProfileUpdate(token, updatedData);
                if (response.data.status === 0) {
                    setAlert({ type: 'success', message: 'Profil berhasil diperbarui.' });
                } else {
                    setAlert({ type: 'danger', message: 'Gagal memperbarui profil.' });
                }
            } catch (error) {
                console.error('Terjadi kesalahan saat memperbarui profil:', error);
                setAlert({ type: 'danger', message: 'Terjadi kesalahan saat memperbarui profil.' });
            }
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlert(null);

        if (e.target.files && e.target.files.length > 0) {
            const newFile = e.target.files[0];

            if (newFile.size > 100 * 1024) {
                setAlert({ type: 'danger', message: 'Ukuran file melebihi batas maksimum 100KB.' });
                return;
            }

            setFile(newFile);

            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await ProfileImage(token, newFile);
                    if (response.data.status === 0) {
                        setProfileImage(URL.createObjectURL(newFile));
                        setAlert({ type: 'success', message: 'Gambar profil berhasil diperbarui.' });
                    } else {
                        setAlert({ type: 'danger', message: 'Gagal memperbarui gambar profil.' });
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat memperbarui gambar profil:', error);
                    setAlert({ type: 'danger', message: 'Terjadi kesalahan saat memperbarui gambar profil.' });
                }
            }
        }
    };

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div className="container mt-3 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="mb-3 text-center">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={profileImage ? profileImage : '/images/Profile Photo.png'}
                                className='mb-3'
                                alt="Profile"
                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                            <FaPencilAlt
                                onClick={handleIconClick}
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    fontSize: '24px',
                                    width: '40px',
                                    height: '40px',
                                    lineHeight: '20px',
                                    border: '2px solid #f13b2f',
                                }}
                            />
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />

                        <h3>{firstName} {lastName}</h3>
                    </div>

                    {alert && (
                        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                            {alert.message}
                            <button type="button" className="btn-close" onClick={handleCloseAlert} aria-label="Close"></button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="first_name" className='form-label'>First Name</label>
                            <div className="input-group">
                                <span className="input-group-text"><HiOutlineUser /></span>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='Masukkan nama depan'
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
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder='Masukkan nama belakang'
                                    className='form-control'
                                    required
                                />
                            </div>
                        </div>

                        <button className='mt-3 btn btn-outline-orange w-100'>Perbarui Profil</button>
                    </form>

                    <button className='mt-5 btn btn-orange w-100' onClick={handleLogout}>Keluar</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
