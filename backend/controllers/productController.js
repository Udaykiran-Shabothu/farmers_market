const Product = require("../models/Product");

//creation of the product
exports.addProduct = async (req,res) => {
    const {name,price,quantity,category,image} = req.body;
    
    try{
    const productItem = await Product.create({
        name,
        price,
        quantity,
        category,
        image,
        farmer: req.user.id
    })
    res.json(productItem)
}
catch(e){
     res.status(400).json({message: e})
}
};


//getting all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "name email");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//getting single product by id
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//updating product applicable only to farmers 
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // check ownership
    if (product.farmer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete product only owner can do it

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product.farmer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};