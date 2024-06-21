const http = require("http");
const url = require("url");

// Объект для хранения счетчиков просмотров
const viewCounts = {
  "/": 0,
  "/about": 0,
};

// Функция для обработки запросов
const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Обработка запросов к главной странице
  if (path === "/") {
    viewCounts["/"] += 1;
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <html>
        <body>
          <h1>Главная страница</h1>
          <p><h2>Урок 1. Введение в Node.js</h2><p>
          <p>Количество просмотров: ${viewCounts["/"]}</p>
          <a href="/about">Перейти на страницу About</a>
        </body>
      </html>
    `);
  }
  // Обработка запросов к странице "About"
  else if (path === "/about") {
    viewCounts["/about"] += 1;
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <html>
        <body>
          <h1>Страница About</h1>
          <p>Напишите HTTP сервер и реализуйте два обработчика, где:</br>
— По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”</br>
— А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”</br>
— Также реализуйте обработку несуществующих роутов (404).</br>
— * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.</br><p>
          <p>Количество просмотров: ${viewCounts["/about"]}</p>
          <a href="/">Перейти на главную страницу</a>
        </body>
      </html>
    `);
  }
  // Обработка несуществующих роутов (404)
  else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <html>
        <body>
          <h1>404 - Страница не найдена</h1>
          <a href="/">Перейти на главную страницу</a>
        </body>
      </html>
    `);
  }
};

// Создание и запуск HTTP сервера
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
