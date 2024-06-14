function changeStyleDelayed(elementId, delay) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.color = "blue"; // Пример изменения стиля, можно изменить другие свойства стиля
    } else {
      console.error(`Element with ID ${elementId} not found`);
    }
  }, delay);
}

// Создаем элемент p
const pElement = document.createElement("p");
pElement.textContent = "ЗДЕСЬ ИЗМЕНИТСЯ ЦВЕТ ТЕКСТА ЧЕРЕЗ 2 СЕКУНДЫ";
pElement.id = "myElement";
pElement.classList.add("myElement");

// Получаем или создаем элемент blockCardElement
let blockCardElement = document.querySelector(".box");
if (!blockCardElement) {
  // Если элемент с классом "box" не найден, создаем его
  blockCardElement = document.createElement("div");
  blockCardElement.classList.add("box");
  document.body.appendChild(blockCardElement); // Добавляем blockCardElement в body
}

// Добавляем pElement в blockCardElement
blockCardElement.appendChild(pElement);
console.log(blockCardElement);

// Пример использования функции
changeStyleDelayed("myElement", 2000); // Через 2 секунды изменяет стиль элемента с id 'myElement'
