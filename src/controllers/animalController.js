import { Router } from "express";
import animalService from '../services/animalService.js';


const animalController = Router();

animalController.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll();

    res.render('dashboard', {
        animals
    });
});

export default animalController;
