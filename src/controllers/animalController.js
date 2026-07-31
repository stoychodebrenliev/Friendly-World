import { Router } from "express";
import animalService from '../services/animalService.js';
import { isAuth } from "../middlewares/authMiddleware.js";
import { animalSchema } from "../validations/animalValidator.js";
import getErrorMessage from "../utils/getErrorMessage.js";

const animalController = Router();

animalController.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll();

    res.render('dashboard', {
        animals
    });
});

animalController.get('/animals/create', isAuth, (req, res) => {
    return res.render('create')
});

animalController.post('/animals/create', isAuth, async (req, res) => {
    try{
    const animalData = await animalSchema.parseAsync(req.body);

    await animalService.create(animalData, req.user.id);

    return res.redirect('/dashboard');
    } catch(error) {
        return res.render('create', {
            error: getErrorMessage(error),
            animal: req.body
        })
    }
})

export default animalController;
