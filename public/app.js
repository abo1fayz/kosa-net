// public/app.js

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchInput = document.getElementById('search-input');
    const categoriesFilter = document.getElementById('categories-filter');
    const noProductsMessage = document.getElementById('no-products-message');

    let allProducts = []; // لتخزين جميع المنتجات التي تم جلبها

    // دالة لجلب وعرض المنتجات
    const fetchAndDisplayProducts = async () => {
        productsContainer.innerHTML = ''; // مسح المحتوى القديم
        loadingSpinner.style.display = 'block'; // إظهار مؤشر التحميل
        noProductsMessage.style.display = 'none'; // إخفاء رسالة عدم وجود منتجات

        try {
            const response = await fetch('/api/products');
            allProducts = await response.json(); // حفظ جميع المنتجات
            
            loadingSpinner.style.display = 'none'; // إخفاء مؤشر التحميل
            
            filterAndRenderProducts(); // فلترة وعرض المنتجات عند التحميل الأولي

        } catch (error) {
            console.error('فشل في جلب المنتجات:', error);
            loadingSpinner.style.display = 'none';
            productsContainer.innerHTML = ''; // تأكد من مسح أي محتوى قديم
            noProductsMessage.textContent = 'عذراً، فشل في تحميل المنتجات.';
            noProductsMessage.style.display = 'block';
        }
    };

    // دالة لفلترة وعرض المنتجات
    const filterAndRenderProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategoryBtn = categoriesFilter.querySelector('.category-btn.active');
        const selectedCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'الكل';

        const filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                  product.description.toLowerCase().includes(searchTerm);
            
            // يمكنك هنا إضافة حقل "category" للمنتج في الـ Backend والـ Model
            // ومقارنته بـ product.category.toLowerCase()
            const matchesCategory = selectedCategory === 'الكل' || 
                                    (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

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

                // يمكنك إضافة أيقونة الواتساب هنا إذا كان لديك رقم هاتف لكل منتج
                // <i class="fab fa-whatsapp whatsapp-icon"></i>
                productCard.innerHTML = `
                    <img src="${product.imageURL}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">${product.price} ر.س</p>
                    </div>
                `;
                
                productsContainer.appendChild(productCard);
            });
        }
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
