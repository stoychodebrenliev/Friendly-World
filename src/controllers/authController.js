import { Router } from "express";
import authService from "../services/authService.js";
import { signToken } from "../utils/jwt.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { registerSchema } from "../validations/authValidator.js";
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
})

export default authController;