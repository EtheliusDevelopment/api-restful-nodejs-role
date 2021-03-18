import Product from '../models/Product'

export const createProduct = async (req, res) => {
    
    const { name, category, price, imageURL} = req.body
    const newProduct = new Product ({name, category, price, imageURL})
    await newProduct.save();
    
    res.json('creating product')
};

export const getProducts = (req, res) => {
    res.json("get products")
};

export const getProductById = (req, res) => {

};

export const updateProductById = (req, res) => {

};

export const deleteProductById = (req, res) => {

};
