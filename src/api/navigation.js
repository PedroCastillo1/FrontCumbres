import axiosInstance from './axiosInstance';
import { useHistory } from 'react-router-dom';

export const useNavigation = () => {
    const history = useHistory();

    const navigateTo = async (path, data = {}) => {
        try {
            await axiosInstance.post(path, data);
            history.push(path);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    const registerToMotivation = (data) => navigateTo('/motivation', data);
    const motivationToHome = (data) => navigateTo('/home', data);
    const homeToSetupSession = (data) => navigateTo('/setup-session', data);
    const setupSessionToSetupSession2 = (data) => navigateTo('/setup-session2', data);
    const setupSession2ToChronometer = (data) => navigateTo('/chronometer', data);
    const chronometerToCheckout = (data) => navigateTo('/checkout', data);
    const checkoutToHome = (data) => navigateTo('/home', data);

    return {
        registerToMotivation,
        motivationToHome,
        homeToSetupSession,
        setupSessionToSetupSession2,
        setupSession2ToChronometer,
        chronometerToCheckout,
        checkoutToHome,
    };
};