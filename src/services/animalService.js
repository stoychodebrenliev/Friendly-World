import animalRepository from "../repositories/animalRepository.js";

function getAll() {
    return animalRepository.getAll();
}

function create(animalData, ownerId) {
    return animalRepository.create({
        ...animalData,
        ownerId
    })
}

const animalService = {
    getAll,
    create
};

export default animalService;