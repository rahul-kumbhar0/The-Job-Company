import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export function AppContextProvider({ children }) {
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    
    const [searchFilter, setSearchFilter] = useState({ title: '', location: '' });
    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/api/jobs');
            if (response?.data?.success) {
                setJobs(response.data.jobs);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to fetch jobs. Please try again later.');
        }
    };

    const fetchCompanyData = async () => {
        if (!companyToken) return;
        try {
            const response = await api.get('/api/company/company', {
                headers: { token: companyToken }
            });
            if (response?.data?.success) {
                setCompanyData(response.data.company);
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
            toast.error('Failed to fetch company data');
        }
    };

    const fetchUserData = async () => {
        if (!isSignedIn || !user) return;
        try {
            const token = await getToken();
            if (!token) return;
            const response = await api.get('/api/users/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response?.data?.success) {
                setUserData(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to fetch user data');
        }
    };

    const fetchUserApplications = async () => {
        if (!isSignedIn || !user) return;
        try {
            const token = await getToken();
            if (!token) return;
            const response = await api.get('/api/users/applications', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response?.data?.success) {
                setUserApplications(response.data.applications);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            toast.error('Failed to fetch applications');
        }
    };

    useEffect(() => {
        fetchJobs();
        const storedToken = localStorage.getItem('companyToken');
        if (storedToken) setCompanyToken(storedToken);
    }, []);

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    useEffect(() => {
        if (isSignedIn && user) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [isSignedIn, user]);

    const contextValue = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        userData,
        setUserData,
        userApplications,
        setUserApplications,
        fetchUserData,
        fetchUserApplications,
        isSignedIn,
        user,
        backendUrl: import.meta.env.VITE_BACKEND_URL
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;