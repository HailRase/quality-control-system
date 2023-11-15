import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthCheck = (isLoggedIn: boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);
};
