import animalRepository from "../repositories/animalRepository.js";

function getAll() {
    return animalRepository.getAll();
}

const animalService = {
    getAll
};

export default animalService;