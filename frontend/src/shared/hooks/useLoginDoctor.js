import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const useLoginDoctor = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate=useNavigate();
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(process.env.REACT_APP_LOGIN_DOCTOR, {
                email, password
            });
            if (!response.data.success) {
                // Handle unexpected messages from the backend
                setError(response.data.message || 'An error occurred during login.');
            } else {
                // Save the user to local storage
                localStorage.setItem('doctor', JSON.stringify(response.data));
                // Update the auth context
                dispatch({ type: 'LOGIN_DOCTOR', payload: response.data });
                navigate('/doctor/dashboard')

            }
        } catch (error) {
            if (error.response) {
                // Handle specific status codes
                switch (error.response.status) {
                    case 401:
                        setError('Unauthorized access. Please check your credentials.');
                        break;
                    case 400:
                        setError('Incorrect email or password. Please try again.');
                        break;
                    default:
                        setError('An error occurred. Please try again.');
                        break;
                }
            } else {
                // Handle errors that do not have a response
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
