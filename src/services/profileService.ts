import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface Profile{
    id: number
    userId: number
    profession: string | null
    bio: string | null
    location: string | null
    website: string | null
}

const getProfile = async () => {
    try {
        const response = await axios.get(`${apiUrl}/profile`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const editProfile = async (data: Profile) => {
    try {
        const response = await axios.patch(`${apiUrl}/profile/${data.id}`, data);
        return response;
    } catch (error) {
        handleError(error);
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

export { getProfile, editProfile, handleError }