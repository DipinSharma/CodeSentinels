import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const useSignUpDoctor = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const SignUp = async (email, password, name, username) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(process.env.REACT_APP_SIGNUP_DOCTOR, {
                email, password, name, username
            });

            if (!response.data.success) {
                setError(response.data.message);
            } else {
                localStorage.setItem('doctor', JSON.stringify(response.data));

                // Update the auth context
                dispatch({ type: 'LOGIN_DOCTOR', payload: response.data });

                // Navigate to the patient dashboard
                navigate('/doctor/dashboard');
            }
        } catch (err) {
            if (err.response) {
                // Handle server errors
                if (err.response.status === 401) {
                    setError('Unauthorized: Please check your credentials.');
                } else {
                    setError(err.response.data.message || 'An error occurred.');
                }
            } else {
                // Handle network errors or other issues
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { SignUp, isLoading, error };
};
