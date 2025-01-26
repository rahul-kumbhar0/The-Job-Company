import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Dashboard = () => {
    const navigate = useNavigate()
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Enhanced Navbar */}
            <div className='bg-white shadow-sm border-b fixed w-full top-0 z-50'>
                <div className='container mx-auto px-4 py-3'>
                    <div className='flex justify-between items-center'>
                        {/* Logo Section */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={() => navigate('/')}
                        >
                            <img 
                                src={assets.logo} 
                                alt="The Job Company" 
                                className='h-14 w-auto object-contain'
                            />
                        </motion.div>

                        {/* User Profile Section */}
                        {companyData && (
                            <div className='flex items-center gap-4'>
                                <p className='text-gray-700 font-medium hidden sm:block'>
                                    Welcome, <span className='text-purple-600'>{companyData.name}</span>
                                </p>
                                <div className='relative group'>
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        className='flex items-center gap-2 cursor-pointer'
                                    >
                                        <img 
                                            className='w-10 h-10 rounded-full border-2 border-purple-100 object-cover shadow-sm' 
                                            src={companyData.image} 
                                            alt={companyData.name} 
                                        />
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>

                                    {/* Dropdown Menu */}
                                    <div className='absolute hidden group-hover:block right-0 w-48 pt-2'>
                                        <div className='bg-white rounded-lg shadow-lg border py-1'>
                                            <button
                                                onClick={logout}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-2'
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className='flex'> 
                {/* Sidebar */}
                <div className='w-20 sm:w-64 min-h-screen bg-white border-r'>
                    <nav className='pt-5'>
                        <NavLink 
                            to='/dashboard/add-job'
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg transition-colors
                                ${isActive 
                                    ? 'bg-purple-50 text-purple-700' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            <img className='w-5' src={assets.add_icon} alt="" />
                            <span className='hidden sm:block'>Add Job</span>
                        </NavLink>

                        <NavLink 
                            to='/dashboard/manage-jobs'
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg transition-colors
                                ${isActive 
                                    ? 'bg-purple-50 text-purple-700' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            <img className='w-5' src={assets.home_icon} alt="" />
                            <span className='hidden sm:block'>Manage Jobs</span>
                        </NavLink>

                        <NavLink 
                            to='/dashboard/view-applications'
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg transition-colors
                                ${isActive 
                                    ? 'bg-purple-50 text-purple-700' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            <img className='w-5' src={assets.person_tick_icon} alt="" />
                            <span className='hidden sm:block'>View Applications</span>
                        </NavLink>
                    </nav>
                </div>

                {/* Main Content */}
                <div className='flex-1 p-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard