import bcrypt from 'bcrypt';

import userRepository from '../repositories/userRepository.js';
import { email } from 'zod';

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
};

export async function login(userData) { 
    const {email, password} = userData;
    
    const user = await userRepository.findByEmail(email);

    if(!user) {
        throw new Error('User not found.');

    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if(!isPasswordValid) {
        throw new Error ('Invalid Password.')
    }
    
    return user;
}

const authService = {
    register,
    login
}

export default authService;