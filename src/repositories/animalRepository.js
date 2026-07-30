import prisma from "../lib/prisma.js"

async function create(animalData) {
    return prisma.animal.create({
        data: animalData
    })
    
};

async function getAll() {
    return prisma.animal.findMany({
        include: {
            owner: {
                select: {
                    email: true
                }
            }
        }
    })
};

const animalRepository = {
    create,
    getAll
}

export default animalRepository