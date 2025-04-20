const express = require("express");
const mongoose = require("mongoose");
const protect = require("../Middleware/Auth");
const router = express.Router();
const { register, signIn, getAllUsers, getUserById, updateUserById, deleteUserById, getUsersByName, logout} = require('../Controllers/UserController');


router.get('/', getAllUsers);
router.get('/:id', getUserById);
//router.get('/search', getUsersByName);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/Register', register);
router.post('/SignIn', signIn);
router.post('/Logout', logout);

module.exports = router;