import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface userSkill{
    userId: number,
    skillId: number
}

const getSkills = async () => {
    try {
        const response = await axios.get(`${apiUrl}/skill`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getSkillById = async (id: string) => {
    try {
        const response = await axios.get(`${apiUrl}/skill/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const saveSkill = async (data: userSkill) => {
    try {
        const response = await axios.post(`${apiUrl}/user-skill`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const removeSkill = async (data: userSkill) => {
    try{
        const response = await axios.delete(`${apiUrl}/user-skill`, {data});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    } else if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error('An unknown error occurred');
    }
};

export { getSkills, saveSkill, getSkillById, removeSkill, handleError }