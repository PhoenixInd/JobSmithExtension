import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface SignInData {
    email: string;
    password: string;
}

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

const encodePassword = (password: string): string => {
    for (let i = 0; i < 3; i++) {
        password = btoa(password);
    }
    return password;
};

const register = async (data: SignUpData) => {
    data.password = encodePassword(data.password);
    try {
        const response = await axios.post(`${apiUrl}/auth/register`, {...data, roleId: 3});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const login = async (data: SignInData) => {
    data.password = encodePassword(data.password);
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, data);
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        chrome.storage.local.set({'token':token}, () => {
            console.log('Token is saved to chrome.storage');
          })
        setAuthToken(token);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const setAuthToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    } else if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error('An unknown error occurred');
    }
};

const validateToken = async () => {
    try {
        const response = await axios.get(`${apiUrl}/auth/validate`);
        if (response.status === 200) {
            return { isValid: true, user: response.data };
        }
    } catch (error) {
        return { isValid: false, user: null };
    }
    return { isValid: false, user: null };
};

const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

export const authService = {
    register,
    login,
    validateToken
};
