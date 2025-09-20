document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const imageInput = document.getElementById('image');
    const productListContainer = document.getElementById('product-list-container');
    const submitBtn = document.getElementById('submit-btn');
    const loadingBar = document.getElementById('loading-bar');

    let isEditMode = false;
    let currentProductId = null;

    // إظهار شريط التحميل
    const showLoading = () => {
        loadingBar.style.width = "70%";
    };

    // إخفاء شريط التحميل
    const hideLoading = () => {
        loadingBar.style.width = "100%";
        setTimeout(() => {
            loadingBar.style.width = "0%";
        }, 500);
    };

    const fetchAndDisplayProducts = async () => {
        try {
            showLoading();
            const response = await fetch('/api/products');
            const products = await response.json();
            productListContainer.innerHTML = '';
            
            products.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('product-list-item');
                item.innerHTML = `
                    <span>${product.name} - ${product.price} -
                        <img id="imgui" src="${product.imageURL}"> ر.س
                    </span>
                    <div>
                        <button class="edit-btn" data-id="${product._id}">تعديل</button>
                        <button class="delete-btn" data-id="${product._id}">حذف</button>
                    </div>
                `;
                productListContainer.appendChild(item);
            });
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            hideLoading();
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('description', descriptionInput.value);
        formData.append('price', priceInput.value);
        if (imageInput.files[0]) {
            formData.append('image', imageInput.files[0]);
        }
        
        const url = isEditMode ? `/api/products/${currentProductId}` : '/api/products';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            showLoading();
            const response = await fetch(url, {
                method: method,
                body: formData
            });

            if (response.ok) {
                alert(isEditMode ? 'تم تعديل المنتج بنجاح!' : 'تم إضافة المنتج بنجاح!');
                form.reset();
                isEditMode = false;
                currentProductId = null;
                submitBtn.textContent = 'إضافة المنتج';
                fetchAndDisplayProducts();
            } else {
                const errorData = await response.json();
                alert('فشل العملية: ' + errorData.message);
            }
        } catch (error) {
            alert('حدث خطأ في الشبكة.');
            console.error(error);
        } finally {
            hideLoading();
        }
    });

    productListContainer.addEventListener('click', async (e) => {
        const btn = e.target;
        const productId = btn.dataset.id;

        if (btn.classList.contains('delete-btn')) {
            if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                try {
                    showLoading();
                    const response = await fetch(`/api/products/${productId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        alert('تم حذف المنتج بنجاح!');
                        fetchAndDisplayProducts();
                    } else {
                        const errorData = await response.json();
                        alert('فشل الحذف: ' + errorData.message);
                    }
                } catch (error) {
                    alert('حدث خطأ في الشبكة.');
                } finally {
                    hideLoading();
                }
            }
        }

        if (btn.classList.contains('edit-btn')) {
            try {
                showLoading();
                const response = await fetch(`/api/products/${productId}`);
                const productToEdit = await response.json();
                
                nameInput.value = productToEdit.name;
                descriptionInput.value = productToEdit.description;
                priceInput.value = productToEdit.price;

                isEditMode = true;
                currentProductId = productToEdit._id;
                submitBtn.textContent = 'تعديل المنتج';
            } catch (error) {
                console.error('Failed to fetch product for editing:', error);
            } finally {
                hideLoading();
            }
        }
    });

    fetchAndDisplayProducts();
});
