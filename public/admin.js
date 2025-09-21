<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>لوحة التحكم - إدارة المنتجات</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    h1 { text-align: center; }
    form, .product {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    input, button {
      display: block;
      width: 100%;
      margin: 8px 0;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    button {
      background: #4CAF50;
      color: white;
      cursor: pointer;
      border: none;
    }
    button:hover { background: #45a049; }
    .danger { background: #e74c3c; }
    .danger:hover { background: #c0392b; }
    img {
      max-width: 100px;
      border-radius: 6px;
      display: block;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <h1>لوحة التحكم - إدارة المنتجات</h1>

  <!-- فورم إضافة منتج -->
  <form id="addProductForm" enctype="multipart/form-data">
    <h2>➕ إضافة منتج جديد</h2>
    <input type="text" name="name" placeholder="اسم المنتج" required>
    <input type="text" name="description" placeholder="الوصف">
    <input type="number" name="price" placeholder="السعر" required>
    <input type="text" name="category" placeholder="التصنيف">
    <input type="file" name="image" accept="image/*" required>
    <button type="submit">إضافة المنتج</button>
  </form>

  <h2>📦 جميع المنتجات</h2>
  <div id="productsContainer"></div>

  <script>
    const productsContainer = document.getElementById("productsContainer");

    // جلب جميع المنتجات
    async function fetchProducts() {
      productsContainer.innerHTML = "<p>⏳ جاري التحميل...</p>";
      const res = await fetch("/api/products");
      const products = await res.json();
      if (!res.ok) {
        productsContainer.innerHTML = "<p>❌ فشل في تحميل المنتجات</p>";
        return;
      }
      renderProducts(products);
    }

    // عرض المنتجات
    function renderProducts(products) {
      if (products.length === 0) {
        productsContainer.innerHTML = "<p>لا يوجد منتجات</p>";
        return;
      }
      productsContainer.innerHTML = "";
      products.forEach((p) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p>${p.description || ""}</p>
          <p><strong>السعر:</strong> ${p.price} </p>
          <p><strong>التصنيف:</strong> ${p.category || "غير محدد"}</p>
          <img src="${p.imageURL}" alt="${p.name}">
          <button onclick="deleteProduct('${p._id}')" class="danger">🗑 حذف</button>
          <button onclick="editProduct('${p._id}')">✏️ تعديل</button>
        `;
        productsContainer.appendChild(div);
      });
    }

    // إضافة منتج جديد
    document.getElementById("addProductForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ تم إضافة المنتج بنجاح");
        e.target.reset();
        fetchProducts();
      } else {
        alert("❌ فشل: " + (data.error || data.message));
      }
    });

    // حذف منتج
    async function deleteProduct(id) {
      if (!confirm("هل أنت متأكد من الحذف؟")) return;
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert("🗑 تم الحذف");
        fetchProducts();
      } else {
        alert("❌ فشل الحذف: " + (data.error || data.message));
      }
    }

    // تعديل منتج
    async function editProduct(id) {
      const name = prompt("اسم المنتج الجديد:");
      const description = prompt("الوصف الجديد:");
      const price = prompt("السعر الجديد:");
      const category = prompt("التصنيف الجديد:");

      if (!name || !price) return alert("⚠️ الاسم والسعر مطلوبان");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert("✏️ تم التعديل بنجاح");
        fetchProducts();
      } else {
        alert("❌ فشل التعديل: " + (data.error || data.message));
      }
    }

    // تحميل المنتجات عند فتح الصفحة
    fetchProducts();
  </script>

</body>
</html>