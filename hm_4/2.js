function saveUserData(user) {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to save user data: ${response.status} ${response.statusText}`
        );
      }
    })
    .catch((error) => {
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("net::ERR_FAILED")
      ) {
        return Promise.reject(
          new Error("Failed to load resource: net::ERR_FAILED")
        );
      } else {
        return Promise.reject(error); // Прокидываем оригинальную ошибку дальше
      }
    });
}

// Пример использования функции
const user = {
  name: "John Smith",
  age: 30,
  email: "john@example.com",
};

saveUserData(user)
  .then(() => {
    console.log("Данные пользователя успешно сохранены");
  })
  .catch((error) => {
    console.error("Ошибка при сохранении данных пользователя:", error.message);
  });
