const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Объект для хранения счетчиков просмотров
let viewCounts = {
  "/": 0,
  "/about": 0,
};

// Функция для загрузки счетчиков из файла
function loadViewCounts() {
  try {
    const data = fs.readFileSync("viewCounts.json", "utf8");
    viewCounts = JSON.parse(data);
  } catch (err) {
    console.error("Ошибка загрузки счетчиков:", err);
  }
}

// Функция для сохранения счетчиков в файл
function saveViewCounts() {
  try {
    fs.writeFileSync("viewCounts.json", JSON.stringify(viewCounts), "utf8");
  } catch (err) {
    console.error("Ошибка сохранения счетчиков:", err);
  }
}

// Загрузить счетчики из файла при запуске сервера
loadViewCounts();

// Middleware для увеличения счетчика и сохранения в файл
function incrementAndViewCounter(req, res, next) {
  const path = req.path;
  viewCounts[path]++;
  saveViewCounts();
  next();
}

// Middleware для отображения страницы с счетчиком
function showPageWithCounter(req, res) {
  const path = req.path;
  res.send(`
    <html>
      <body>
        <h1>${path === "/" ? "Главная страница" : "Страница About"}</h1>
        <p><h2>Урок 3. Модули и фреймворк Express (WIP)</h2><p>
        <p>Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:</br>
        — На каждой странице реализован счетчик просмотров</br>
        — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница</br>
        — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы</br>
       — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.</br><p>
        <p>Количество просмотров: ${viewCounts[path]}</p>
        <a href="/">Перейти на главную страницу</a>
        <a href="/about">Перейти на страницу About</a>
      </body>
    </html>
  `);
}

// Middleware для обработки страницы '/'
app.get("/", incrementAndViewCounter, showPageWithCounter);

// Middleware для обработки страницы '/about'
app.get("/about", incrementAndViewCounter, showPageWithCounter);

// Обработка несуществующих роутов (404)
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <body>
        <h1>404 - Страница не найдена</h1>
        <a href="/">Перейти на главную страницу</a>
        <a href="/about">Перейти на страницу About</a>
      </body>
    </html>
  `);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
