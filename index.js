const http = require('http');

// ВАШ ЛОГИН - ОБЯЗАТЕЛЬНО ЗАМЕНИТЕ!
const LOGIN = "ladyxxa";

// Функция текущей даты DDMMYY
function getCurrentDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    return day + month + year;
}

// СОЗДАЁМ СЕРВЕР
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    
    console.log(`Получен запрос: ${method} ${url}`); // Для отладки
    
    // ТОЛЬКО GET ЗАПРОСЫ
    if (method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }
    
    // ========== 1. КОРНЕВОЙ МАРШРУТ / ==========
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is working! Try /add/5/3 or /mpy/4/2 or /' + getCurrentDate());
        return;
    }
    
    // ========== 2. МАРШРУТ /add/число/число ==========
    if (url.startsWith('/add/')) {
        const parts = url.split('/');
        if (parts.length === 4) {
            const x1 = parseInt(parts[2]);
            const x2 = parseInt(parts[3]);
            
            if (!isNaN(x1) && !isNaN(x2)) {
                const result = x1 + x2;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(result.toString());
                return;
            }
        }
    }
    
    // ========== 3. МАРШРУТ /mpy/число/число ==========
    if (url.startsWith('/mpy/')) {
        const parts = url.split('/');
        if (parts.length === 4) {
            const y1 = parseInt(parts[2]);
            const y2 = parseInt(parts[3]);
            
            if (!isNaN(y1) && !isNaN(y2)) {
                const result = y1 * y2;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(result.toString());
                return;
            }
        }
    }
    
    // ========== 4. МАРШРУТ /DDMMYY (ровно 6 цифр после слэша) ==========
    // Проверяем, что URL состоит из слэша и ровно 6 цифр
    const dateMatch = url.match(/^\/(\d{6})$/);
    if (dateMatch) {
        const requestedDate = dateMatch[1];
        const currentDate = getCurrentDate();
        
        if (requestedDate === currentDate) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(LOGIN);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Wrong date. Expected ${currentDate}, got ${requestedDate}`);
        }
        return;
    }
    
    // ========== 5. ВСЁ ОСТАЛЬНОЕ ==========
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found. Use: /add/x1/x2, /mpy/y1/y2, or /' + getCurrentDate());
});

// ЗАПУСК СЕРВЕРА
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📅 Сегодняшняя дата: ${getCurrentDate()}`);
    console.log(`🔑 Ваш логин: ${LOGIN}`);
    console.log(`✅ Проверьте: http://localhost:${PORT}/`);
    console.log(`➕ http://localhost:${PORT}/add/5/3`);
    console.log(`✖️ http://localhost:${PORT}/mpy/4/2`);
});
