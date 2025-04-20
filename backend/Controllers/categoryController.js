const CategoryService = require('../Services/CategoryService');

exports.getAllcategory = async(req, res, next) => {
    try{
       const categories = await ProductService.getAllcategory();
       return res.status(201).json(categories);
    } catch(err){
       return res.status(400).json({message: err.message});
    }
};