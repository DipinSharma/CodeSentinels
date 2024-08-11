import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove user form storage
        localStorage.removeItem('user');
        localStorage.removeItem('doctor');
        // dispatch logout action
        dispatch({ type: 'LOGOUT_USER' });
        dispatch({ type: 'LOGOUT_DOCTOR' });

    }
    return { logout };
}