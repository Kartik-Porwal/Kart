const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../Utils/generateToken');

exports.register = async(userData) => {
    const {firstName, lastName, email, password} = userData;
    let existingUser;
    try{
    existingUser = await User.findOne({email});
    } catch(err){
        console.log("error:",err);
        throw new Error('Database query failed');
    }
    if(existingUser){
        throw new Error('User already exists');
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        firstName,
        lastName,
        email,
        password:  hashedPassword,
    })
    try{
        await user.save();
    } catch(err){
        console.log("error during save:",err);
        throw new Error('Failed to create user');
    }
     return {
        _id : user._id,
        firstName : user.firstName,
        lastName: user.lastName,
        email : user.email,
        token : generateToken(user._id),
     };
};

exports.signIn = async (userData) => {
    const { email, password } = userData;

    let existingUser;
    try {
        // Find the user by email
        existingUser = await User.findOne({ email }).select("+password");
    } catch (err) {
        console.error("Database query error:", err);
        throw new Error("Database query failed");
    }

    // If no user is found, return an error
    if (!existingUser) {
        throw new Error("User not found");
    }

    // Check if the user document contains a valid password
    if (!existingUser.password) {
        console.error("Password is undefined for user:", existingUser);
        throw new Error("User data is corrupted");
    }

    // Safely compare the password
    let isCorrectPassword;
    try {
        isCorrectPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        console.error("Error during password comparison:", err);
        throw new Error("Password validation failed");
    }

    // If the password does not match, return an error
    if (!isCorrectPassword) {
        throw new Error("Incorrect password");
    }

    // Return user data and token
    return {
        _id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        token: generateToken(existingUser._id),
    };
};

exports.getAllUsers = async() => {
    let users;
    try{
        users = await User.find();
    } catch(err){
        throw new Error('Database query failed');
    }
    if(!users || users.length == 0){
        throw new Error('No Users found');
    }
    return users;
};

exports.getUserById = async(userId) => {
    let user;
    try{
        user = await User.findById(userId, '-password');
    } catch(err){
        throw new Error('Database query failed');
    }
    if(!user) {
        throw new Error('Unable to find user by That id');
    }
    return user;
};

exports.updateUserById = async(userId, userData) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try{
        user = await User.findByIdAndUpdate(userId,
            userData,
            {new: true, runValidators: true, projection: password});
    } catch(err){
        throw new Error('Database query failed');
    }
    if(!user) {
        throw new Error('Unable to find user by That id');
    }
    return user;
};

exports.deleteUserById = async(userId) => {
    let user;
    try{
        user = await User.findByIdAndDelete(userId);
    } catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
    if(!user){
        throw new Error('Unable to delete user');
    }
    return {message: 'User deleted successfully'}; 
};

exports.logout = async() => {
    return {message: 'User logged out successfully'};
} 

/*exports.getUsersByName = async(userName) => {
    try{
        const users = await User.find({
            name: { $regex: userName, $options: 'i'}
        });
        if(!users.length === 0){
            throw new Error('No users found');
        }
        return users;
    } catch(err){
        throw new Error(err.message || 'No users found');
    }
};*/