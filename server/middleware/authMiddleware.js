import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

// Middleware ( Protect Company Routes )
export const protectCompany = async (req, res, next) => {

    // Getting Token From Headers
    const token = req.headers.token
    console.log('Token received:', token)

    if (!token) {
        console.log('Authorization failed: No token provided')
        return res.json({ success: false, message: 'Not authorized, Login Again' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Token decoded:', decoded)

        req.company = await Company.findById(decoded.id).select('-password')
        console.log('Company found:', req.company)

        next()

    } catch (error) {
        console.log('Error occurred:', error.message)
        res.json({ success: false, message: error.message })
    }

}
