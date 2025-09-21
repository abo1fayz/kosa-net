const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// استدعاء الموديل
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 3000;

// إعدادات الـ views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ميدل وير
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// إعداد Multer لحفظ الملفات مؤقتاً
const storage = multer.memoryStorage();
const upload = multer({ storage });

// إنشاء عملاء Supabase
const client1 = createClient(process.env.SUPABASE_URL_1, process.env.SUPABASE_KEY_1);
const client2 = createClient(process.env.SUPABASE_URL_2, process.env.SUPABASE_KEY_2);

const clients = [client1, client2];
let current = 0; // مؤشر للتناوب

function getNextClient() {
  const client = clients[current];
  current = (current + 1) % clients.length;
  return client;
}

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====================== Routes ====================== //

// API لإضافة منتج جديد
app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    let imageUrl = null;
    if (file) {
      const client = getNextClient(); // التناوب بين الحسابين
      const fileName = `${Date.now()}-${file.originalname}`;

      const { data, error } = await client
        .storage
        .from("public1") // اسم الـ bucket الجديد
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (error) {
        console.error("خطأ في رفع الصورة:", error.message);
        return res.status(500).json({ error: "فشل رفع الصورة" });
      }

      const { data: publicUrlData } = client
        .storage
        .from("public1")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // إنشاء المنتج وتخزين رابط الصورة
    const product = new Product({
      name,
      description,
      price,
      image: imageUrl
    });
    await product.save();

    res.status(201).json({ message: "تمت إضافة المنتج بنجاح", product });
  } catch (err) {
    console.error("خطأ:", err.message);
    res.status(500).json({ error: "حدث خطأ أثناء إضافة المنتج" });
  }
});

// API لعرض جميع المنتجات
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "فشل جلب المنتجات" });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});