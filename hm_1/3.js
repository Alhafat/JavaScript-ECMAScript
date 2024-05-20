"use strict";

/*
Напишите рекурсивную функцию findElementByClass, которая принимает
корневой элемент дерева DOM и название класса в качестве аргументов и
возвращает первый найденный элемент с указанным классом в этом дереве.
*/
function findElementByClass(root, className) {
  if (root.classList && root.classList.contains(className)) {
    return root;
  }
  for (let child of root.children) {
    const found = findElementByClass(child, className);
    if (found) {
      return found;
    }
  }
  return null;
}

const rootElement = document.getElementById("root");
const targetElement = findElementByClass(rootElement, "my-class");
console.log(targetElement);
