import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 2xl:px-20 mx-auto py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img width={160} src={assets.logo} alt="Insider Jobs" className="mb-4" />
            <p className="text-gray-600 text-sm">
              Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <img width={24} src={assets.facebook_icon} alt="Facebook" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <img width={24} src={assets.twitter_icon} alt="Twitter" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <img width={24} src={assets.instagram_icon} alt="Instagram" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link to="/" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/" className="hover:text-blue-600">Browse Jobs</Link></li>
              <li><Link to="/" className="hover:text-blue-600">Contact Us</Link></li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Job Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="#" className="hover:text-blue-600">Technology</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Marketing</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Design</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Management</Link></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Download Our App</h3>
            <p className="text-gray-600 text-sm mb-4">Get the best job searching experience with our mobile app</p>
            <div className="flex flex-col gap-2">
              <a href="#" className="transition-transform hover:scale-105">
                <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" 
                     alt="Get it on Google Play" 
                     className="h-10" />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                     alt="Download on App Store" 
                     className="h-10" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Thejobcomapny. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-600">
              <Link to="#" className="hover:text-blue-600">Privacy Policy</Link>
              <Link to="#" className="hover:text-blue-600">Terms of Service</Link>
              <Link to="#" className="hover:text-blue-600">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer