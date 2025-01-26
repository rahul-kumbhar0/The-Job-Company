import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const { user, isSignedIn } = useUser()
    const { getToken } = useAuth()
    
    const [searchFilter, setSearchFilter] = useState({ title: '', location: '' })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    const fetchJobs = async () => {
        try {
            console.log('Fetching jobs...');
            const response = await api.get('/api/jobs');
            console.log('Jobs response:', response.data);
            
            if (response?.data?.success) {
                setJobs(response.data.jobs || []);
            } else {
                console.error('Jobs fetch failed:', response.data);
                toast.error('No jobs found');
            }
        } catch (error) {
            console.error('Jobs fetch error:', error.response || error);
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

    const value = {
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
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;