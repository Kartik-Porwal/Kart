const Product = require('../Models/ProductModel');

exports.getAllProducts = async() => {
    let products;
    try{
        products = await Product.find();
    }  catch(err){
        throw new Error('Database query failed');
    }
    if(!products || products.length == 0){
        throw new Error('No Products found');
    }
    return products;
};

exports.getProductById = async(productId) => {
    let product;
    try{
        product = await Product.findById(productId);
    } catch(err){
        throw new Error('Database query failed');
    }
    if(!product) {
        throw new Error('Unable to find Product by That id');
    }
    return product;
};

exports.getProductByName = async(productName) => {
    try{
        const products = await Product.find({
            name: { $regex: productName, $options: 'i'}
        });
        if(!products.length === 0){
            throw new Error('No products found');
        }
        return products;
    } catch(err){
        throw new Error(err.message || 'No products found');
    }
};

exports.addProduct = async(productData) => {
    const {name, price, description, brand} = productData;
    let existingProduct;
    try{
       existingProduct = await Product.findOne({name});  
    } catch(err){
        console.log("error: ", err);
        throw new Error("Data Base Query failed.");
    }
    if(existingProduct){
        throw new Error("Product already exists.");
    }

    const product = new Product({
        name,
        price,
        description,
        brand,
    })
    try{
        await product.save();
    } catch(err){
        console.log("error during save: ", err);
        throw new Error("Failed to add product.");
    }
    console.log("product created");
    return{
        _id: product._id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
    }
};

exports.updateProductById = async(productId, name, description, brand, price) => {
    console.log("initial data:", {name, description, brand, price});
    let product;
    try{
        product = await Product.findByIdAndUpdate(productId,
            {name, description, brand, price},
            {new: true, runValidators: true}
        );
    } catch(err){
        throw new Error('Database query failed');
    }
    if(!product) {
        throw new Error('Unable to find Product by That id');
    }
    console.log(product);
    return product;
};
