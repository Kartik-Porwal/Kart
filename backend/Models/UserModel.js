const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
       type: String,
       required: true,
       trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
     },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    /*phone: {
        type: String,
        required: true,
    },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        postalCode: { type: String, default: '' },
        country: { type: String, default: '' },
    },
    cart: [
        {
            product: {
                type: mongoose.schema.objectId,
                ref: 'product',
                
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],   
    orders: [
        {
           type: mongoose.schema.Types.objectId,
           ref: 'order',
        },
    ],*/
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);