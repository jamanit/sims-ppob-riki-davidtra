import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ContentHeader from '../components/ContentHeader';
import { topUp } from '../services/api';
import { MdOutlineMoney } from "react-icons/md";

const TopUpPage: React.FC = () => {
    const [topUpAmount, setTopUpAmount] = useState<string | number>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'danger' | null>(null);
    const [validationMessage, setValidationMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem('token');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTopUpAmount(value);

        const amount = parseFloat(value);
        if (!isNaN(amount) && amount >= 10000 && amount <= 1000000) {
            setIsButtonDisabled(false);
            setValidationMessage(null);
        } else {
            setIsButtonDisabled(true);
            setValidationMessage('Jumlah top up harus antara 10.000 dan 1.000.000.');
        }
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.getAttribute('data-nominal');
        if (value) {
            setTopUpAmount(value);
            setIsButtonDisabled(false);
            setValidationMessage(null);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleConfirmTopUp = async () => {
        setShowModal(false);

        setAlertMessage(null);

        const amount = parseFloat(topUpAmount as string);

        if (!isNaN(amount) && amount >= 10000 && amount <= 1000000 && amount > 0) {
            if (token) {
                try {
                    const response = await topUp(amount, token);
                    setAlertMessage('Top up berhasil');
                    setAlertType('success');
                    setValidationMessage(null);
                    setTopUpAmount('');
                } catch (error) {
                    setAlertMessage('Terjadi kesalahan saat top up');
                    setAlertType('danger');
                }
            } else {
                setAlertMessage('Token tidak ditemukan');
                setAlertType('danger');
            }
        } else {
            setAlertMessage('Jumlah top up tidak valid');
            setAlertType('danger');
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    const formattopUpAmount = `Rp. ${Number(topUpAmount).toLocaleString('id-ID')}`;

    return (
        <div className="container mt-3 mb-5">
            <ContentHeader />

            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={handleCloseAlert} aria-label="Tutup"></button>
                </div>
            )}

            <div className="row">
                <p className='mb-0'>Silahkan masukkan</p>
                <h3 className='mb-4'>Nominal Top Up</h3>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <form onSubmit={(e) => { e.preventDefault(); handleShowModal(); }}>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text"><MdOutlineMoney /></span>
                                    <input
                                        type="number"
                                        id="top_up_amount"
                                        value={topUpAmount}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nominal Top Up"
                                        className='form-control'
                                        required
                                        autoFocus
                                        min="10000"
                                        step="10000"
                                    />
                                </div>
                                {validationMessage && (
                                    <p className="text-danger mt-2">
                                        {validationMessage}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={`btn w-100 ${isButtonDisabled ? 'btn-secondary' : 'btn-orange'}`}
                                disabled={isButtonDisabled}
                            >
                                Top Up
                            </button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-wrap gap-1">
                            <button type='button' className='btn btn-outline-secondary' data-nominal="10000" onClick={handleButtonClick}>Rp. 10.000</button>
                            <button type='button' className='btn btn-outline-secondary' data-nominal="20000" onClick={handleButtonClick}>Rp. 20.000</button>
                            <button type='button' className='btn btn-outline-secondary' data-nominal="50000" onClick={handleButtonClick}>Rp. 50.000</button>
                            <button type='button' className='btn btn-outline-secondary' data-nominal="100000" onClick={handleButtonClick}>Rp. 100.000</button>
                            <button type='button' className='btn btn-outline-secondary' data-nominal="250000" onClick={handleButtonClick}>Rp. 250.000</button>
                            <button type='button' className='btn btn-outline-secondary' data-nominal="500000" onClick={handleButtonClick}>Rp. 500.000</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Top Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Apakah Anda yakin ingin melakukan top up sebesar <span className='fw-bold'>{formattopUpAmount}</span>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button className='btn btn-orange' onClick={handleConfirmTopUp}>
                        Ya, Top Up
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TopUpPage;
