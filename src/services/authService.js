import bcrypt from 'bcrypt';

import userRepository from '../repositories/userRepository.js';

export async function register(userData) {

    const {email, password} = userData;

    const existingUser = await userRepository.findByEmail(email);

    if(existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return userRepository.create({
        email,
        password: hashedPassword
    });
}

const authService = {
    register
}

export default authService;