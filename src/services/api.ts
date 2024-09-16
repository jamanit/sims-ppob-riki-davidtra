import axios from 'axios';

const api = axios.create({
    baseURL: 'https://take-home-test-api.nutech-integrasi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = (data: { email: string; password: string }) =>
    api.post('/login', data);

export const registerUser = (data: { email: string; first_name: string; last_name: string; password: string }) =>
    api.post('/registration', data);

export const fetchUser = async (token: string) => {
    return await api.get('/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const fetchServices = async (token: string) => {
    return await api.get('/services', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const fetchBanners = async (token: string) => {
    return await api.get('/banner', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const fetchBalance = async (token: string) => {
    return await api.get('/balance', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const topUp = async (amount: number, token: string) => {
    return await api.post('/topup',
        { top_up_amount: amount },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};

export const Transaction = async (serviceCode: string, token: string) => {
    return await api.post('/transaction',
        { service_code: serviceCode },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};

export const fetchTransactions = async (token: string, offset: number, limit: number) => {
    return await api.get('/transaction/history', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            offset: offset,
            limit: limit
        }
    });
};

export const fetchProfile = async (token: string) => {
    return await api.get('/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};


export const ProfileUpdate = async (token: string, updatedData: { email: string; first_name: string; last_name: string }) => {
    return await api.put('/profile/update', updatedData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const ProfileImage = async (token: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return await api.put('/profile/image', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};

export default api;
