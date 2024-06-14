function getUserData(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user data: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
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
        return Promise.reject(error);
      }
    });
}

// Пример использования функции
getUserData(1)
  .then((user) => console.log(user))
  .catch((error) => console.error("Error fetching user data:", error.message));

getUserData(1, "https://jsonplaceholder.typicode.com/users");
