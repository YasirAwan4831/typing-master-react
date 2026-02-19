// Code snippets for typing practice (JavaScript/Programming)
export const codeSnippets = [
  "function calculateSum(a, b) { return a + b; }",
  
  "const array = [1, 2, 3, 4, 5]; const sum = array.reduce((acc, val) => acc + val, 0);",
  
  "class Person { constructor(name, age) { this.name = name; this.age = age; } }",
  
  'if (condition === true) { console.log("Condition met"); } else { console.log("Condition not met"); }',
  
  "for (let i = 0; i < 10; i++) { console.log(i); }",
  
  'const promise = new Promise((resolve, reject) => { setTimeout(() => resolve("Done!"), 1000); });',
  
  "try { const result = riskyOperation(); } catch (error) { console.error(error); }",
  
  'const obj = { name: "John", age: 30, greet() { return `Hello, ${this.name}`; } };',
  
  "const fetchData = async () => { const response = await fetch(url); return response.json(); };",
  
  "const numbers = [1, 2, 3, 4, 5]; const doubled = numbers.map(num => num * 2);",
  
  "const evenNumbers = array.filter(num => num % 2 === 0);",
  
  "function fibonacci(n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }",
  
  'const user = { name: "Alice", email: "alice@example.com", isActive: true };',
  
  "const [state, setState] = useState(0); useEffect(() => { console.log(state); }, [state]);",
  
  "export default function Component() { return <div>Hello World</div>; }",
  
  "const handleClick = (event) => { event.preventDefault(); console.log('Clicked!'); };",
  
  "import React, { useState, useEffect } from 'react';",
  
  "const sortedArray = [...array].sort((a, b) => a - b);",
  
  "const mergedObject = { ...obj1, ...obj2 };",
  
  "const isValid = value !== null && value !== undefined && value !== '';",
  
  'localStorage.setItem("key", JSON.stringify(data));',
  
  'const data = JSON.parse(localStorage.getItem("key")) || defaultValue;',
  
  "const debounce = (func, delay) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), delay); }; };",
  
  "const apiUrl = `https://api.example.com/users/${userId}/posts`;",
  
  "const hasPermission = roles.includes('admin') || roles.includes('moderator');",
  
  "Array.from({ length: 10 }, (_, i) => i + 1);",
  
  "const uniqueArray = [...new Set(array)];",
  
  "const randomNumber = Math.floor(Math.random() * 100) + 1;",
  
  "document.getElementById('myElement').addEventListener('click', handleClick);",
  
  "const regex = /^[a-zA-Z0-9]+$/; const isValid = regex.test(input);"
];

export default codeSnippets;