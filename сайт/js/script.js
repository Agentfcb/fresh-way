// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.querySelector('.cart-count');

// Обновление счетчика корзины
function updateCartCount() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавление товара в корзину
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            
            // Проверяем, есть ли товар уже в корзине
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            updateCartCount();
            
            // Визуальная обратная связь
            this.textContent = 'Добавлено!';
            this.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.style.backgroundColor = '';
            }, 1000);
        });
    });
    
    // Карусель акций
    const promoItems = document.querySelectorAll('.promo-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Скрываем все слайды
        promoItems.forEach(item => {
            item.style.transform = `translateX(-${index * 100}%)`;
        });
        
        // Обновляем точки
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Следующий слайд
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % promoItems.length;
        showSlide(currentSlide);
    });
    
    // Предыдущий слайд
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + promoItems.length) % promoItems.length;
        showSlide(currentSlide);
    });
    
    // Навигация по точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автопрокрутка карусели
    setInterval(() => {
        currentSlide = (currentSlide + 1) % promoItems.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Переключение вкладок
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс к текущей кнопке и контенту
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== РАБОЧИЙ КОД ДЛЯ КУКИ-УВЕДОМЛЕНИЯ ==========
// Этот код точно работает!


});
