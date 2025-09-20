<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>متجر المنتجات</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Cairo', sans-serif;
            background-color: #f8f9fa;
            color: #333;
            direction: rtl;
            line-height: 1.6;
        }

        .app-layout {
            max-width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            min-height: 100vh;
            position: relative;
            padding-bottom: 70px;
        }

        /* شريط علوي (App Bar) */
        .top-bar {
            background-color: #fff;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .logo-container {
            flex: 1;
            text-align: center;
        }

        .logo {
            height: 150px;
            max-width: 100%;
            border-radius: 10px;
        }

        .admin-icon {
            font-size: 1.5rem;
            color: #555;
            text-decoration: none;
        }

        /* قسم التحديثات */
        .update-section {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            margin: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .update-title {
            font-size: 1.2rem;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .products-scroll {
            display: flex;
            overflow-x: auto;
            gap: 15px;
            padding: 5px 0;
        }

        .products-scroll::-webkit-scrollbar {
            height: 5px;
        }

        .products-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
        }

        .scroll-item {
            flex: 0 0 auto;
            width: 80px;
            text-align: center;
        }

        .scroll-img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            object-fit: cover;
            background-color: #fff;
            padding: 5px;
        }

        .scroll-name {
            font-size: 0.7rem;
            margin-top: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* قسم البحث والفلاتر */
        .search-section {
            padding: 15px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
        }

        .search-bar {
            position: relative;
            margin-bottom: 15px;
        }

        .search-input {
            width: 100%;
            padding: 12px 45px 12px 15px;
            border: 1px solid #ddd;
            border-radius: 25px;
            font-size: 1rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            font-family: 'Cairo', sans-serif;
        }

        .search-input::placeholder {
            color: #999;
        }

        .search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #777;
        }

        .categories {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding: 5px 0;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .categories::-webkit-scrollbar {
            display: none;
        }

        .category-btn {
            padding: 8px 15px;
            background-color: #f1f3f5;
            border: none;
            border-radius: 20px;
            font-size: 0.9rem;
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Cairo', sans-serif;
        }

        .category-btn.active {
            background-color: #4a6bdf;
            color: white;
        }

        /* قسم المنتجات */
        .products-section {
            padding: 15px;
        }

        .section-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #4a6bdf;
            display: inline-block;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .product-card {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .product-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            background-color: #f5f5f5;
        }

        .product-info {
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .product-name {
            font-size: 1.1rem;
            margin-bottom: 8px;
            color: #333;
        }

        .product-desc {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 10px;
            flex-grow: 1;
        }

        .product-price-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }

        .price-container {
            display: flex;
            flex-direction: column;
        }

        .original-price {
            color: #999;
            text-decoration: line-through;
            font-size: 0.9rem;
        }

        .discount-price {
            color: #e74c3c;
            font-weight: 700;
            font-size: 1.2rem;
        }

        .discount-badge {
            background-color: #e74c3c;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
        }

        .whatsapp-btn {
            background-color: #25D366;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            flex-shrink: 0;
        }

        /* شريط التنقل السفلي */
        .bottom-nav {
            display: flex;
            justify-content: space-around;
            background-color: #fff;
            padding: 10px 0;
            border-top: 1px solid #eee;
            position: fixed;
            bottom: 0;
            width: 100%;
            max-width: 1200px;
            z-index: 100;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #666;
            font-size: 0.8rem;
        }

        .nav-item.active {
            color: #4a6bdf;
        }

        .nav-icon {
            font-size: 1.3rem;
            margin-bottom: 4px;
        }

        /* أدوات مساعدة */
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #4CAF50;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 50px auto;
            display: none;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .no-products {
            text-align: center;
            padding: 30px;
            color: #666;
            grid-column: 1 / -1;
        }

        /* تصميم متجاوب - تعديلات لجعل المنتجين بجانب بعض على الجوال */
        @media (max-width: 768px) {
            .products-grid {
                grid-template-columns: repeat(2, 1fr); /* عمودين بدلاً من واحد */
                gap: 15px; /* تقليل المسافة بين العناصر */
            }
            
            .product-card {
                margin-bottom: 0; /* إزالة الهوامش السفلية إذا كانت موجودة */
            }
            
            .product-image {
                height: 150px; /* تقليل ارتفاع الصورة قليلاً */
            }
            
            .product-info {
                padding: 10px; /* تقليل المساحة الداخلية */
            }
            
            .product-name {
                font-size: 1rem; /* تصغير حجم الخط قليلاً */
            }
            
            .product-desc {
                font-size: 0.8rem; /* تصغير حجم وصف المنتج */
                height: 36px; /* تقليل الارتفاع المخصص للوصف */
            }
            
            .discount-price {
                font-size: 1.1rem; /* تصغير حجم سعر المنتج */
            }
            
            .whatsapp-btn {
                width: 35px;
                height: 35px;
                font-size: 1rem;
            }
            
            .categories {
                padding-bottom: 8px; /* زيادة المساحة للتمرير */
            }
            
            .category-btn {
                padding: 6px 12px;
                font-size: 0.85rem;
            }
            
            .update-section {
                margin: 8px;
                padding: 8px 12px;
            }
            
            .scroll-item {
                width: 70px;
            }
            
            .scroll-img {
                width: 50px;
                height: 50px;
            }
        }

        @media (max-width: 480px) {
            .products-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }
            
            .product-image {
                height: 130px;
            }
            
            .product-name {
                font-size: 0.9rem;
            }
            
            .discount-price {
                font-size: 1rem;
            }
            
            .top-bar {
                padding: 10px;
            }
            
            .logo {
                height: 100%;
                width: 100%;
                object-fit: contain;
            }
        }

        /* شارة التصنيف على بطاقة المنتج */
        .category-badge {
            display: inline-block;
            background: #e0e0e0;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="app-layout">
        <!-- الشريط العلوي -->
        <header class="top-bar">
            
            <div class="logo-container">
                <img  src="./photo_2025-09-19_22-25-34.jpg" alt="Logo" class="logo">
            </div>
            <div></div> <!-- عنصر نائب للمحاذاة -->
        </header>

        <!-- قسم التحديثات والعروض -->
        <div class="update-section">
            <div class="update-title">أحدث المنتجات</div>
            <div class="products-scroll" id="latest-products">
                <!-- سيتم ملء هذا القسم بالمنتجات الحديثة من خلال JavaScript -->
            </div>
        </div>

        <!-- قسم البحث والفلاتر -->
        <section class="search-section">
            <div class="search-bar">
                <input type="text" class="search-input" id="search-input" placeholder="ابحث عن منتج...">
                <i class="fas fa-search search-icon"></i>
            </div>
            <div class="categories" id="categories-filter">
                <button class="category-btn active" data-category="الكل">الكل</button>
                <button class="category-btn" data-category="إلكترونيات">إلكترونيات</button>
                <button class="category-btn" data-category="ملابس">ملابس</button>
                <button class="category-btn" data-category="أثاث">أثاث</button>
                <button class="category-btn" data-category="كتب">كتب</button>
                <button class="category-btn" data-category="أخرى">أخرى</button>
            </div>
        </section>

        <!-- قسم المنتجات -->
        <section class="products-section">
            <h2 class="section-title">منتجاتنا</h2>
            
            <div id="loading-spinner" class="spinner"></div>
            
            <div class="products-grid" id="products-container">
                <!-- سيتم ملء هذا القسم بالمنتجات من خلال JavaScript -->
            </div>
            
            <p id="no-products-message" class="no-products" style="display: none;">لا توجد منتجات مطابقة.</p>
        </section>

        <!-- شريط التنقل السفلي -->
        <nav class="bottom-nav">
            <a href="/" class="nav-item active">
                <i class="fas fa-home nav-icon"></i>
                <span>الرئيسية</span>
            </a>
            <a href="tipa.html" class="nav-item">
                <i class="fa-solid fa-print nav-icon"></i>
                <span>قسم الصيانة</span>
            </a>
            <a href="kadamat.html" class="nav-item">
                <i class="fas fa-shopping-cart nav-icon"></i>
                <span>الخدماىت العامة</span>
            </a>
            
        </nav>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const productsContainer = document.getElementById('products-container');
            const latestProductsContainer = document.getElementById('latest-products');
            const loadingSpinner = document.getElementById('loading-spinner');
            const searchInput = document.getElementById('search-input');
            const categoriesFilter = document.getElementById('categories-filter');
            const noProductsMessage = document.getElementById('no-products-message');

            let allProducts = []; // لتخزين جميع المنتجات التي تم جلبها

            // دالة لجلب وعرض المنتجات
            const fetchAndDisplayProducts = async () => {
                productsContainer.innerHTML = ''; // مسح المحتوى القديم
                latestProductsContainer.innerHTML = ''; // مسح المحتوى القديم
                loadingSpinner.style.display = 'block'; // إظهار مؤشر التحميل
                noProductsMessage.style.display = 'none'; // إخفاء رسالة عدم وجود منتجات

                try {
                    const response = await fetch('/api/products');
                    
                    if (!response.ok) {
                        throw new Error(`خطأ في جلب البيانات: ${response.status}`);
                    }
                    
                    allProducts = await response.json(); // حفظ جميع المنتجات
                    
                    loadingSpinner.style.display = 'none'; // إخفاء مؤشر التحميل
                    
                    // عرض أحدث المنتجات في قسم التحديثات
                    displayLatestProducts(allProducts);
                    
                    // فلترة وعرض المنتجات عند التحميل الأولي
                    filterAndRenderProducts();

                } catch (error) {
                    console.error('فشل في جلب المنتجات:', error);
                    loadingSpinner.style.display = 'none';
                    productsContainer.innerHTML = ''; // تأكد من مسح أي محتوى قديم
                    noProductsMessage.textContent = 'عذراً، فشل في تحميل المنتجات. يرجى المحاولة لاحقاً.';
                    noProductsMessage.style.display = 'block';
                }
            };

            // دالة لعرض أحدث المنتجات
            const displayLatestProducts = (products) => {
                // نأخذ فقط 5 منتجات كأحدث المنتجات
                const latestProducts = products.slice(0, 5);
                
                latestProducts.forEach(product => {
                    const scrollItem = document.createElement('div');
                    scrollItem.classList.add('scroll-item');
                    
                    scrollItem.innerHTML = `
                        <img src="${product.imageURL}" alt="${product.name}" class="scroll-img">
                        <div class="scroll-name">${product.name}</div>
                    `;
                    
                    latestProductsContainer.appendChild(scrollItem);
                });
            };

            // دالة لفلترة وعرض المنتجات
            const filterAndRenderProducts = () => {
                const searchTerm = searchInput.value.toLowerCase();
                const activeCategoryBtn = categoriesFilter.querySelector('.category-btn.active');
                const selectedCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'الكل';

                const filteredProducts = allProducts.filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                          (product.description && product.description.toLowerCase().includes(searchTerm));
                    
                    // فلترة حسب التصنيف
                    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
                    
                    return matchesSearch && matchesCategory;
                });

                productsContainer.innerHTML = ''; // مسح القائمة الحالية قبل عرض المنتجات المفلترة

                if (filteredProducts.length === 0) {
                    noProductsMessage.textContent = 'لا توجد منتجات مطابقة.';
                    noProductsMessage.style.display = 'block';
                } else {
                    noProductsMessage.style.display = 'none';
                    filteredProducts.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.classList.add('product-card');

                        productCard.innerHTML = `
                            <img src="${product.imageURL}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-desc">${product.description || 'لا يوجد وصف'}</p>
                                <div>
                                    <span class="category-badge">${product.category || 'غير مصنف'}</span>
                                </div>
                                <div class="product-price-container">
                                    <div class="price-container">
                                        <span class="discount-price">${product.price} $</span>
                                    </div>
                                    <button class="whatsapp-btn" onclick="shareProduct('${product.name}', '${product.imageURL}')">
                                        <i class="fab fa-whatsapp"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                        
                        productsContainer.appendChild(productCard);
                    });
                }
            };

            // دالة لمشاركة المنتج عبر واتساب
           window.shareProduct = (productName, productImage) => {
    const phoneNumber = "905387709053"; // ضع رقمك هنا بصيغة دولية
    const message = `مرحبا! أريد الاستفسار عن المنتج: ${productName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

            // معالج حدث لإدخال البحث
            searchInput.addEventListener('input', filterAndRenderProducts);

            // معالج حدث لأزرار الفئات
            categoriesFilter.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-btn')) {
                    // إزالة الفئة النشطة من جميع الأزرار
                    categoriesFilter.querySelectorAll('.category-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    // تفعيل الزر الذي تم النقر عليه
                    e.target.classList.add('active');
                    filterAndRenderProducts(); // إعادة فلترة وعرض المنتجات
                }
            });

            // جلب وعرض المنتجات عند تحميل الصفحة
            fetchAndDisplayProducts();
        });
    </script>
</body>
</html>
