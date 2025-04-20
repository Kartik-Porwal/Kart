const Category = require('../Models/CategoryModel');

exports.getAllCategory = async() => {
    let categories;
    try{
         categories = await Category.find();
    } catch(err){
        throw new Error('Database query failed');
    }
    if(!products || products.length == 0){
        throw new Error('No Users found');
    }
    return products;
};