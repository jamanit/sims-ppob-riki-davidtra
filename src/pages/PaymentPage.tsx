import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ContentHeader from '../components/ContentHeader';
import { Transaction } from '../services/api';
import { MdOutlineMoney } from "react-icons/md";

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceCode = queryParams.get('service_code');
    const serviceName = queryParams.get('service_name') || 'Layanan Tidak Dikenal';
    const serviceTariff = queryParams.get('service_tariff') || 'Rp0';
    const serviceIcon = queryParams.get('service_icon') || '';

    const [showModal, setShowModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleConfirmPayment = async () => {
        setShowModal(false);

        setAlertMessage(null)

        const token = localStorage.getItem('token');

        if (serviceCode && token) {
            try {
                const response = await Transaction(serviceCode, token);
                setAlertMessage('Pembayaran berhasil dilakukan.');
            } catch (error) {
                console.error('Kesalahan saat memproses pembayaran:', error);
                setAlertMessage('Terjadi kesalahan saat memproses pembayaran.');
            }
        }
    };

    const formattedTariff = `Rp. ${Number(serviceTariff).toLocaleString('id-ID')}`;

    return (
        <div className="container mt-3 mb-5">
            <ContentHeader />

            {alertMessage && (
                <div className={`alert ${alertMessage.includes('berhasil') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage(null)} aria-label="Tutup"></button>
                </div>
            )}

            <div className="row">
                <p className='mb-0'>Pembayaran</p>

                <div className="mb-4 d-flex gap-3 align-items-center">
                    {serviceIcon && (
                        <img src={serviceIcon} className="img-fluid" alt={serviceName} style={{ width: '25px', height: '25px', objectFit: 'cover' }} />
                    )}
                    <h3 className=''>{serviceName}</h3>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <form onSubmit={(e) => { e.preventDefault(); handleShowModal(); }}>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text"><MdOutlineMoney /></span>
                                    <input
                                        type="text"
                                        id='service_tariff'
                                        className='form-control'
                                        value={formattedTariff}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <button type="submit" className='btn btn-orange w-100'>Bayar</button>
                        </form>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Apakah Anda yakin ingin melakukan pembayaran untuk <span className='fw-bold'>{serviceName}</span> dengan tarif <span className='fw-bold'>{formattedTariff}</span>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button className='btn btn-orange' onClick={handleConfirmPayment}>Ya, Bayar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PaymentPage;
