const ProductService = require('../Services/ProductService');

exports.getAllProducts = async(req, res, next) => {
     try{
        const products = await ProductService.getAllProducts();
        return res.status(201).json(products);
     } catch(err){
        return res.status(400).json({message: err.message});
     }
};

exports.getProductById = async(req, res, next) => {
    try{   
       const productId = req.params.id;
       const product = await ProductService.getProductById(productId);
       return res.status(201).json(product);
    } catch(err){
        return res.status(400).json({message: err.message});
    }
};

exports.getProductByName = async(req, res, next) => {
        const {productName} = req.query;
        if(!productName){
            return res.status(400).json({ message: 'Product name is required' });
        }
    try{
         const products = await ProductService.getProductByName(productName);
         return res.status(200).json({products});
    } catch(err) {
        return res.status(404).json({message: err.message});
    }
};

exports.addProduct = async(req, res, next) => {
    try{
        const product = await ProductService.addProduct(req.body);
        return res.status(201).json(product)
    } catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
};

exports.updateProductById = async(req, res, next) => {
    try{
        const productId = req.params.id;
        const {name, description, brand, price} = req.body
        const product = await ProductService.updateProductById(productId, name, description, brand, price);
        return res.status(201).json(product);
    } catch(err){
        res.status(400).json({message: err.message});
    }
}