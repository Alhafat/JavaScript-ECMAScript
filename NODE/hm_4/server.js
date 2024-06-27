const express = require("express");
const fs = require("fs").promises;
const app = express();
const PORT = 3000;

const usersFilePath = "./data/users.json";

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, "utf8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Обработчик для создания нового пользователя
app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;

    const data = await fs.readFile(usersFilePath, "utf8");
    const users = JSON.parse(data);

    newUser.id = users.length + 1; // Присваиваем новому пользователю id
    users.push(newUser);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Обработчик для удаления пользователя
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id); // Преобразуем id в число

    const data = await fs.readFile(usersFilePath, "utf8");
    let users = JSON.parse(data);

    users = users.filter((user) => user.id !== userId);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: "Пользователь удален" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Обработчик для обновления пользователя
app.put("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id); // Преобразуем id в число

    const updatedUser = req.body;

    const data = await fs.readFile(usersFilePath, "utf8");
    let users = JSON.parse(data);

    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };

      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

      res.status(200).json(users[index]);
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
