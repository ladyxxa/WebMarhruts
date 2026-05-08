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

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    console.log(`Request: ${pathname}`); 
    
    const addMatch = pathname.match(/^\/add\/(\d+)\/(\d+)$/);
    if (addMatch) {
        const x1 = parseInt(addMatch[1], 10);
        const x2 = parseInt(addMatch[2], 10);
        const sum = x1 + x2;
        
        res.statusCode = 200;
        res.end(sum.toString());
        return;
    }
    
    const mpyMatch = pathname.match(/^\/mpy\/(\d+)\/(\d+)$/);
    if (mpyMatch) {
        const y1 = parseInt(mpyMatch[1], 10);
        const y2 = parseInt(mpyMatch[2], 10);
        const product = y1 * y2;
        
        res.statusCode = 200;
        res.end(product.toString());
        return;
    }
    
    const dateMatch = pathname.match(/^\/(\d{6})$/);
    if (dateMatch) {
        const requestedDate = dateMatch[1];
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
    
    // ========== КОРНЕВОЙ МАРШРУТ: / ==========
    if (pathname === '/') {
        res.statusCode = 200;
        res.end(
        );
        return;
    }
    
    // ========== 404 ДЛЯ ВСЕХ ОСТАЛЬНЫХ ПУТЕЙ ==========
    res.statusCode = 404;
    res.end('Not found. Use /, /add/x1/x2, /mpy/y1/y2, or /DDMMYY');
});
