const prisma = require("../../config/prisma");
const logger = require('../../middlewares/logger');

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
};

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
};

const updateUser = async (userId, userData) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: userData
  })
};

const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
};
