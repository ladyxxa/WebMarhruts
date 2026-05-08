const http = require('http');
const url = require('url');

const YOUR_LOGIN = "ladyxxa";

// Функция для получения текущей даты в формате DDMMYY
function getCurrentDateFormatted() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    return day + month + year;
}

// Создаём HTTP-сервер
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    // === Маршрут А:  ===
    if (/^\/(\d{6})$/.test(pathname)) {
        const requestedDate = pathname.slice(1);
        const currentDate = getCurrentDateFormatted();
        
        if (requestedDate === currentDate) {
            res.statusCode = 200;
            res.end(YOUR_LOGIN);
        } else {
            res.statusCode = 404;
            res.end(`Wrong date. Today is ${currentDate}`);
        }
        return;
    }
    
    // === Маршрут Б: ===
    const addMatch = pathname.match(/^\/add\/(\d+)\/(\d+)$/);
    if (addMatch) {
        const x1 = parseInt(addMatch[1], 10);
        const x2 = parseInt(addMatch[2], 10);
        res.statusCode = 200;
        res.end((x1 + x2).toString());
        return;
    }
    
    // === Маршрут В: /mpy/y1/y2 ===
    const mpyMatch = pathname.match(/^\/mpy\/(\d+)\/(\d+)$/);
    if (mpyMatch) {
        const y1 = parseInt(mpyMatch[1], 10);
        const y2 = parseInt(mpyMatch[2], 10);
        res.statusCode = 200;
        res.end((y1 * y2).toString());
        return;
    }
    
    // === Корневой маршрут: / ===
    if (pathname === '/') {
        res.statusCode = 200;
        res.end(
            'Available endpoints:\n' +
            '• /' + getCurrentDateFormatted() + ' - returns your login\n' +
            '• /add/x1/x2 - returns sum\n' +
            '• /mpy/y1/y2 - returns product\n'
        );
        return;
    }
    
    // === 404 для всех остальных путей ===
    res.statusCode = 404;
    res.end('Not found');
});

// Render передаёт PORT через переменную окружения
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Today's date: ${getCurrentDateFormatted()}`);
});
