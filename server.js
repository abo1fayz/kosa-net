// server.js
const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("@supabase/supabase-js");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// استدعاء الموديلات
const Product = require("./models/Product");
const Repair = require("./models/Repair");

const app = express();
const PORT = process.env.PORT || 3000;

// ====================== Middleware ====================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ملفات static
app.use(express.static(path.join(__dirname, "public")));

// إعداد القوالب EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// إعداد Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL || "https://ikpijsdqmavklpgunumm.supabase.co",
  process.env.SUPABASE_KEY || "YOUR_PUBLIC_ANON_KEY"
);

// إعداد Multer لتخزين الملفات في الذاكرة
const upload = multer({ storage: multer.memoryStorage() });

// ====================== الاتصال بقاعدة البيانات ====================== //
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://GM-MOHAMED:Sqdl0o6aZgGE2DmA@cluster0.ljrua7h.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ Connected to MongoDB Atlas!"))
  .catch((err) => console.error("❌ Connection error:", err));

// ====================== Routes ====================== //

// صفحة تجريبية EJS
app.get("/ap", (req, res) => {
  res.render("ui");
});

// صفحة إدارة المنتجات
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// صفحة إدارة الإصلاحات
app.get("/repair-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "repair-admin.html"));
});

// ====================== Product Routes ====================== //
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products.", error: error.message });
  }
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "An image is required." });

    const { data, error } = await supabase.storage
      .from("products")
      .upload(`public/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(data.path);

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageURL: publicUrlData.publicUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product.", error: error.message });
  }
});

app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;
    let updateData = { ...req.body };

    if (req.file) {
      const { data, error } = await supabase.storage
        .from("products")
        .upload(`public/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(data.path);
      updateData.imageURL = publicUrlData.publicUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) return res.status(404).json({ message: "Product not found." });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product.", error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product.", error: error.message });
  }
});

// ====================== Repair Routes ====================== //
app.get("/api/repairs", async (req, res) => {
  try {
    const repairs = await Repair.find({});
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch repairs.", error: error.message });
  }
});

app.post("/api/repairs", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "An image is required." });

    const { data, error } = await supabase.storage
      .from("repairs")
      .upload(`public/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("repairs")
      .getPublicUrl(data.path);

    const newRepair = new Repair({
      title: req.body.title || "إصلاح ناجح",
      imageURL: publicUrlData.publicUrl,
    });

    const savedRepair = await newRepair.save();
    res.status(201).json(savedRepair);
  } catch (error) {
    res.status(400).json({ message: "Failed to create repair.", error: error.message });
  }
});

app.delete("/api/repairs/:id", async (req, res) => {
  try {
    const deletedRepair = await Repair.findByIdAndDelete(req.params.id);
    if (!deletedRepair) return res.status(404).json({ message: "Repair not found." });
    res.status(200).json({ message: "Repair deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete repair.", error: error.message });
  }
});

// ====================== إعادة توجيه أي طلب إلى index.html ====================== //
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ====================== Server ====================== //
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
