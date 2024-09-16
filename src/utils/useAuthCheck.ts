import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/api';

export const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const getUserData = async () => {
            try {
                const response = await fetchUser(token);
                setUser(response.data);
            } catch (error) {
                setError('Failed to fetch user data');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [navigate]);

    return { loading, error, user };
};
