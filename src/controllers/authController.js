import { Router } from "express";
import authService from "../services/authService.js";
import { signToken } from "../utils/jwt.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { loginSchema, registerSchema } from "../validations/authValidator.js";
import getErrorMessage from "../utils/getErrorMessage.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('register')
});

authController.post('/register', isGuest, async (req, res) => {

    try {
        const userData = await registerSchema.parseAsync(req.body);

        const user = await authService.register(userData);

        const token = signToken(user);
        
        res.cookie('auth', token, {httpOnly: true});

        res.redirect('/')
    } catch (error) {

        res.render('register', {
            error: getErrorMessage(error),
            email: req.body.email
        })
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.render('login')
});

authController.post('/login', isGuest, async (req, res) => {

    try {
        const userData = await loginSchema.parseAsync(req.body);

        const user = await authService.login(userData);

        const token = signToken(user);
        
        res.cookie('auth', token, {httpOnly: true});

        res.redirect('/')
    } catch (error) {

        res.render('login', {
            error: getErrorMessage(error),
            email: req.body.email
        })
    }
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/')
})

export default authController;