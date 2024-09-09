const express = require("express");
const {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getLowStockProducts,
  getCriticalStockProducts,
  getTotalStockValue,
  getManufacturers,
  getStockValueByManufacturerId,
} = require("../db/productCrud");

const router = express.Router();

// GET: Products with low stock
// Använder next för att skicka felet till den globala felhanteraren
router.get("/low-stock", async (req, res, next) => {
  try {
    const lowStock = await getLowStockProducts();
    res.status(200).json(lowStock);
  } catch (error) {
    next(error);
  }
});

// GET: Products with critical stock
router.get("/critical-stock", async (req, res, next) => {
  try {
    const criticalStock = await getCriticalStockProducts();
    res.status(200).json(criticalStock);
  } catch (error) {
    next(error);
  }
});

// GET: Total stock value
router.get("/total-stock-value", async (req, res, next) => {
  try {
    const totalStockValue = await getTotalStockValue();
    res.status(200).json({ totalStockValue });
  } catch (error) {
    next(error);
  }
});

// GET: All manufacturers
router.get("/manufacturers", async (req, res, next) => {
  try {
    const manufacturers = await getManufacturers();
    res.status(200).json(manufacturers);
  } catch (error) {
    next(error);
  }
});

// GET: Stock value by manufacturer ID
router.get("/stock-value/:manufacturerId", async (req, res, next) => {
  try {
    const { manufacturerId } = req.params;
    const stockValue = await getStockValueByManufacturerId(manufacturerId);
    res.status(200).json({ stockValue });
  } catch (error) {
    next(error);
  }
});

// Create a product
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const products = await findProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET a specific product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// PUT update a product by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE delete a product by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }
    res.json({ message: "Produkten har tagits bort" });
  } catch (error) {
    next(error);
  }
});

// DELETE delete all products
router.delete("/", async (req, res, next) => {
  try {
    await deleteAllProducts();
    res.status(200).send("All products deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
