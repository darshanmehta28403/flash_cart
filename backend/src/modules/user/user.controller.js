const userService = require("./user.service");
const bcrypt = require('bcrypt');
const logger = require('../../middlewares/logger');

const createUser = async (req, res, next) => {
  try {
    let emailNotFound = await userService.getUserByEmail(req.body.email);
    if (!emailNotFound) {
      req.body.passwordHash = await bcrypt.hash(req.body.password, 10);
      delete req.body.password;
      const result = await userService.createUser(req.body);
      logger.info("Create User");
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    }
    else{
      logger.error("Could not create user due to email collision");
      return res.status(400).json({message: "Email already registered"});
    }
  } catch (error) {
    logger.error("Couldn't create user");
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();
    logger.info("Users retrieved");
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("Cannot retrieve users");
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.params.id);
    logger.info("User retrieved by id");
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("No user found");
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    let user = await userService.getUserById(req.params.id);
    let changedDetails = req.body;
    if(user){
      Object.keys(changedDetails).forEach((key)=>{
        user[key] = changedDetails[key];
      })
    }
    else{
      return res.status(404).json({message: "No record found"});
    }
    const result = await userService.updateUser(req.params.id, user);
    logger.info("User updated");
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    logger.error("Cannot update user");
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let user = await userService.getUserById(req.params.id);
    if(!user){
    logger.error("User not found");
      return res.status(404).json({message: "No record found"});
    }
    const result = await userService.deleteUser(req.params.id);
    logger.info("User Deleted");
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    logger.info("User cannot be deleted");
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
