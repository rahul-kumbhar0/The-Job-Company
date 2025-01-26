import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <nav className='bg-white shadow-sm fixed top-0 left-0 right-0 z-50'>
            <div className='container px-4 2xl:px-20 mx-auto py-4'>
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <Link to="/" className='flex items-center'>
                        <img 
                            src={assets.logo} 
                            alt="The Job Company" 
                            className='h-14 cursor-pointer'
                        />
                    </Link>

                    {/* Navigation Links & Auth Buttons */}
                    <div className='flex items-center gap-6'>
                        {user ? (
                            <div className='flex items-center gap-6'>
                                <Link 
                                    to='/applications' 
                                    className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
                                >
                                    Applied Jobs
                                </Link>
                                <div className='h-5 w-px bg-gray-300 hidden md:block'></div>
                                <div className='hidden md:block text-gray-600'>
                                    Hi, {user.firstName} {user.lastName}
                                </div>
                                <UserButton 
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-10 h-10'
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <button 
                                    onClick={() => setShowRecruiterLogin(true)}
                                    className='text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md font-medium'
                                >
                                    Recruiter Login
                                </button>
                                <button 
                                    onClick={() => openSignIn()}
                                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors font-medium'
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar