import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../components/ContentHeader';
import { fetchServices, fetchBanners } from '../services/api';

const DashboardPage: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [banners, setBanners] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const fetcData = async () => {
                try {
                    const response = await fetchServices(token);
                    if (response.data.status === 0) {
                        setServices(response.data.data);
                    }

                    const bannerResponse = await fetchBanners(token);
                    if (bannerResponse.data.status === 0) {
                        setBanners(bannerResponse.data.data);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil layanan:', error);
                }
            };

            fetcData();
        }
    }, []);

    const handleImageClick = (service: any) => {
        navigate(`/payment?service_code=${service.service_code}&service_name=${encodeURIComponent(service.service_name)}&service_tariff=${encodeURIComponent(service.service_tariff)}&service_icon=${encodeURIComponent(service.service_icon)}`);
    };

    return (
        <div className="container mt-3 mb-5">

            <ContentHeader />

            <div className="row mb-5">
                {services.map((service, index) => (
                    <div key={index} className="col-2 col-md-2 col-lg-1 mb-3">
                        <img src={service.service_icon}
                            className="img-fluid"
                            alt={service.service_name}
                            onClick={() => handleImageClick(service)}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className='small text-center'>{service.service_name}</div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <p>Temukan promo menarik</p>
                <div className="d-flex flex-row overflow-auto" style={{ whiteSpace: 'nowrap' }}>
                    {banners.map((banner, index) => (
                        <img
                            key={index}
                            src={banner.banner_image}
                            className="img-fluid me-3"
                            alt={banner.banner_name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
