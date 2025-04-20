const UserService = require('../Services/UserService');

exports.register = async(req, res, next) => {
    try{
        const user = await UserService.register(req.body);
        return res.status(201).json(user);
    } catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
};

exports.signIn = async(req, res, next) => {
    try{
        const user = await UserService.signIn(req.body);
        return res.status(201).json(user);
    } catch(err){
        return res.status(400).json({message: err.message});
    }
};

exports.getAllUsers = async(req, res, next) => {
    try{
        const users = await UserService.getAllUsers();
        return res.status(201).json(users);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getUserById = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        return res.status(201).json(user);
    } catch(err){
        res.status(404).json({message: err.message});
    }
};

exports.updateUserById = async(req, res, next) => {
    try{
        const userId = req.params.id;
        //const {firstName, lastName, email, password} = req.body;
        const users = await UserService.updateUserById(userId, req.body);
        return res.status(201).json(users);
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.deleteUserById = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const users = await UserService.deleteUserById(userId);
        return res.status(201).json(users);
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.logout = async(req, res, next) => {
    try {
        // Call the service to handle any token invalidation logic (if applicable)
        const result = await UserService.logout();

        // Clear the token from cookies or client-side storage
        res.clearCookie('token'); // If using cookies to store JWT
        // Alternatively, you can clear from localStorage on the client-side, but this is handled in the frontend.

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: 'Logout failed' });
    }
};

/*exports.getUsersByName = async(req, res, next) => {
    const {firstName, lastName} = req.body;
    userName = firstName + lastName;
    if(!userName){
        return res.status(400).json({ message: 'User name is required' });
    }
try{
     const users = await UserService.getUsersByName(userName);
     return res.status(200).json({users});
} catch(err) {
    return res.status(404).json({message: err.message});
}
};*/