import Product from "../models/product.model.js";


//add product : /api/product/add-product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;
    const image = req.files?.map((file)=>file.filename);

    if (
      !name ||
      !price ||
      !offerPrice ||
      !description ||
      !category ||
      !image ||
      image.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }
    
    await Product.create({
        name,
        description,
        price,
        offerPrice,
        category,
        image,
    });
    res.status(200).json({ message: "Product added successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in adding product" });
  }
};

//get products : /api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in getting products" });
  }
};

// get single product : /api/product/get/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if(!product){
    return res.status(404).json({
      message: "Product Not found",
      success: false,
    })};
    res.status(200).json({
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in getting product" });
  }
};

//change stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true});
    if(!product){
        return res.status(404).json({
        message: "Product Not found",
        success: false,
      })
    }
    res.status(200).json({
      product,
      message: "Stock changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in changing stock" });
  }
};