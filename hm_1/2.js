"use strict";

/*
Напишите функцию createCounter, которая создает счетчик и возвращает
объект с двумя методами: increment и decrement. Метод increment должен
увеличивать значение счетчика на 1, а метод decrement должен уменьшать
значение счетчика на 1. Значение счетчика должно быть доступно только
через методы объекта, а не напрямую.
*/

function createCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
