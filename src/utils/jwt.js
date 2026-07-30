import jwt from 'jsonwebtoken';

export function signToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}