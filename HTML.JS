 
        // بيانات الفروع المحدثة
        const branches = [
            { id: 1, name: "شارع المدينة", address: "شارع المدينة المنورة" },
            { id: 2, name: "طبربور", address: "طبربور، شارع الجامعات" },
            { id: 3, name: "دابوق", address: "دابوق، شارع الدابوق الرئيسي" },
            { id: 4, name: "عبدالله غوشة", address: "شارع عبدالله غوشة" },
            { id: 5, name: "أبو نصير", address: "أبو نصير، شارع أبو نصير الرئيسي" }
        ];

        // قائمة الطعام المحدثة حسب الطلب
        const menuItems = [
            // برجر
            { id: 1, name: "برجر كلاسيك", price: 2.25, category: "برجر", image:"classic.img.jpg" },
            
            { id: 2, name: "هالك برجر", price: 2.35, category: "برجر", image:"hullk.jpg" },

            // ساندويشات
            { id: 3, name: "بروستو رول", price: 1.75, category: "ساندويشات", image:"roll.jpg" },
            { id: 4, name: "ساندويش نشامى", price: 1.50, category: "ساندويشات", image: "nashama.jpg" },
            { id: 5, name: "ساندويش زنجر", price: 1.70, category: "ساندويشات", image: "zinger.img.jpg" },

            // بروستد
            { id: 6, name: "4 قطع بروستد", price: 3.50, category: "بروستد", image: "chic4.jpg" },
            { id: 7, name: "8 قطع بروستد", price: 6.50, category: "بروستد", image: "chic8.jpg" },
            { id: 8, name: "16 قطعة بروستد", price: 12.50, category: "بروستد", image: "chic16.jpg" },

            // ستربس
            { id: 9, name: "4 قطع ستربس", price: 3.25, category: "ستربس", image: "strips.jpg" },
            { id: 10, name: "7 قطع ستربس", price: 5.00, category: "ستربس", image: "strips7.jpg" },

            // مشروبات
            { id: 11, name: "مشروب غازي", price: 0.40, category: "مشروبات", image: "pepsi.jpg" }

        ];

        // متغيرات التطبيق
        let currentPage = 'welcome';
        let selectedBranch = null;
        let cart = [];
        let selectedRating = 0;

        // عناصر DOM
        const pages = {
            welcome: document.getElementById('welcome-page'),
            customer: document.getElementById('customer-page'),
            location: document.getElementById('location-page'),
            branches: document.getElementById('branches-page'),
            menu: document.getElementById('menu-page'),
            cart: document.getElementById('cart-page'),
            payment: document.getElementById('payment-page'),
            rating: document.getElementById('rating-page')
        };

        // الأحداث
        document.getElementById('start-btn').addEventListener('click', () => {
            showPage('customer');
        });

        document.getElementById('customer-next-btn').addEventListener('click', () => {
            const name = document.getElementById('customer-name').value.trim();
            const phone = document.getElementById('customer-phone').value.trim();

            if (!name || !phone) {
                alert('الرجاء إدخال جميع البيانات المطلوبة');
                return;
            }

            if (!/^(07|06)\d{7,8}$/.test(phone)) {
                alert('رقم الهاتف غير صحيح. يجب أن يبدأ بـ 07 أو 06 ويتكون من 9 أو 10 أرقام');
                return;
            }

            showPage('location');
        });

        document.getElementById('location-next-btn').addEventListener('click', () => {
            const address = document.getElementById('customer-address').value.trim();

            if (!address) {
                alert('الرجاء إدخال العنوان');
                return;
            }

            loadBranches();
            showPage('branches');
        });

        document.getElementById('branches-next-btn').addEventListener('click', () => {
            if (!selectedBranch) {
                alert('الرجاء اختيار فرع');
                return;
            }

            loadMenu();
            showPage('menu');
        });

        document.getElementById('menu-next-btn').addEventListener('click', () => {
            updateCart();
            showPage('cart');
        });

        document.getElementById('cart-next-btn').addEventListener('click', () => {
            showPage('payment');
        });

        document.getElementById('payment-next-btn').addEventListener('click', () => {
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

            alert(`تم استلام طلبك بنجاح! طريقة الدفع: ${paymentMethod === 'cash' ? 'نقداً عند الاستلام' : 'البطاقة الائتمانية'}`);

            showPage('rating');
        });

        document.getElementById('submit-rating-btn').addEventListener('click', () => {
            const feedback = document.getElementById('feedback').value;

            document.getElementById('thank-you-message').style.display = 'block';
            document.getElementById('submit-rating-btn').disabled = true;

            setTimeout(() => {
                resetApp();
            }, 3000);
        });

        // معالجات أحداث النجوم
        document.querySelectorAll('.rating-stars span').forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-value'));

                document.querySelectorAll('.rating-stars span').forEach((s, index) => {
                    if (index < selectedRating) {
                        s.classList.add('selected');
                    } else {
                        s.classList.remove('selected');
                    }
                });
            });
        });

        // وظائف المساعدة
        function showPage(pageId) {
            Object.values(pages).forEach(page => {
                page.classList.remove('active');
            });

            pages[pageId].classList.add('active');
            currentPage = pageId;

            window.scrollTo(0, 0);
        }

        function loadBranches() {
            const branchesList = document.getElementById('branches-list');
            branchesList.innerHTML = '';

            branches.forEach(branch => {
                const branchElement = document.createElement('div');
                branchElement.className = 'branch-card';
                branchElement.innerHTML = `
                    <h3>${branch.name}</h3>
                    <p>${branch.address}</p>
                `;

                branchElement.addEventListener('click', () => {
                    document.querySelectorAll('.branch-card').forEach(b => {
                        b.classList.remove('selected');
                    });

                    branchElement.classList.add('selected');
                    selectedBranch = branch;

                    document.getElementById('branches-next-btn').disabled = false;
                });

                branchesList.appendChild(branchElement);
            });
        }

        function loadMenu() {
            const menuItemsContainer = document.getElementById('menu-items');
            menuItemsContainer.innerHTML = '';

            // تجميع العناصر حسب الفئة
            const categories = {};
            menuItems.forEach(item => {
                if (!categories[item.category]) {
                    categories[item.category] = [];
                }
                categories[item.category].push(item);
            });

            // عرض العناصر مصنفة
            for (const category in categories) {
                const categoryHeader = document.createElement('h3');
                categoryHeader.style.color = 'var(--main-red)';
                categoryHeader.style.marginTop = '20px';
                categoryHeader.style.borderBottom = '1px solid var(--main-red)';
                categoryHeader.style.paddingBottom = '5px';
                categoryHeader.textContent = category;
                menuItemsContainer.appendChild(categoryHeader);

                categories[category].forEach(item => {
                    const menuItemElement = document.createElement('div');
                    menuItemElement.className = 'menu-item';
                    menuItemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="menu-item-info">
                            <h3>${item.name}</h3>
                            <p>${item.description || 'وجبة لذيذة من مطعم بروستو'}</p>
                            <div class="menu-item-price">${item.price.toFixed(2)} دينار</div>
                            <button class="add-to-cart" data-id="${item.id}">أضف إلى السلة</button>
                        </div>
                    `;

                    menuItemsContainer.appendChild(menuItemElement);
                });
            }

            // إضافة معالج الأحداث لأزرار "أضف إلى السلة"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    const item = menuItems.find(i => i.id === itemId);

                    if (item) {
                        const existingItem = cart.find(i => i.id === itemId);

                        if (existingItem) {
                            existingItem.quantity++;
                        } else {
                            cart.push({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                quantity: 1
                            });
                        }

                        alert(`تمت إضافة ${item.name} إلى سلة التسوق`);
                    }
                });
            });
        }

        function updateCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center;">السلة فارغة</p>';
                document.getElementById('cart-next-btn').disabled = true;
                document.getElementById('total-amount').textContent = '0.00';
                return;
            }

            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div>
                        <strong>${item.name}</strong>
                        <div>${item.quantity} × ${item.price.toFixed(2)} دينار</div>
                    </div>
                    <div>${itemTotal.toFixed(2)} دينار</div>
                `;

                cartItemsContainer.appendChild(cartItemElement);
            });

            document.getElementById('total-amount').textContent = total.toFixed(2);
            document.getElementById('cart-next-btn').disabled = false;
        }

        function resetApp() {
            document.getElementById('customer-name').value = '';
            document.getElementById('customer-phone').value = '';
            document.getElementById('customer-address').value = '';
            document.getElementById('feedback').value = '';

            selectedBranch = null;
            cart = [];
            selectedRating = 0;
            8
            
            document.querySelectorAll('.rating-stars span').forEach(star => {
                star.classList.remove('selected');
            });

            document.querySelectorAll('.branch-card').forEach(branch => {
                branch.classList.remove('selected');
            });

            document.getElementById('submit-rating-btn').disabled = false;
            document.getElementById('thank-you-message').style.display = 'none';

            showPage('welcome');
        }
function loadMenu() {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';

    // تجميع العناصر حسب الفئة
    const categories = {};
    menuItems.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });

    // عرض العناصر مصنفة
    for (const category in categories) {
        const categoryHeader = document.createElement('h3');
        categoryHeader.style.color = 'var(--main-red)';
        categoryHeader.style.marginTop = '20px';
        categoryHeader.style.borderBottom = '1px solid var(--main-red)';
        categoryHeader.style.paddingBottom = '5px';
        categoryHeader.textContent = category;
        menuItemsContainer.appendChild(categoryHeader);

        categories[category].forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item';
            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description || 'وجبة لذيذة من مطعم بروستو'}</p>
                    <div class="menu-item-price">${item.price.toFixed(2)} دينار</div>

                    <!-- كاونتر الكمية -->
                    <div class="number-control" data-id="${item.id}">
                        <div class="number-left"></div>
                        <input type="number" class="number-quantity" value="0" min="0">
                        <div class="number-right"></div>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(menuItemElement);

            // التعامل مع أزرار + و -
            const numberControl = menuItemElement.querySelector(".number-control");
            const input = numberControl.querySelector(".number-quantity");

            numberControl.querySelector(".number-left").addEventListener("click", () => {
                if (input.value > 0) input.value--;
                updateCartItem(item, parseInt(input.value));
            });

            numberControl.querySelector(".number-right").addEventListener("click", () => {
                input.value++;
                updateCartItem(item, parseInt(input.value));
            });
        });
    }
}

// تحديث الكارت حسب الكمية
function updateCartItem(item, quantity) {
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
        if (quantity === 0) {
            cart = cart.filter(i => i.id !== item.id); // حذف من الكارت
        } else {
            existingItem.quantity = quantity; // تحديث الكمية
        }
    } else {
        if (quantity > 0) {
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: quantity
            });
        }
    }
}

        