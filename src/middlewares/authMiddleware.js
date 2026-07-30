import { verifyToken } from '../utils/jwt.js';

function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const verifiedToken = verifyToken(token);

        req.user = verifiedToken;
        res.locals.user = verifiedToken;

        next();
    } catch (error) {
        res.clearCookie('auth');
        next();
    }
}

export function isAuth(req, res, next) {
    if (req.user) {
        return next();
    }

    res.redirect('/login');
}

export function isGuest(req, res, next) {
    if (!req.user) {
        return next();
    }

    res.redirect('/');
}

export default authMiddleware;