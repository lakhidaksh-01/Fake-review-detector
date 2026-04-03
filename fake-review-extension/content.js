console.log("Extension loaded");

// Example: grab all paragraph text
const reviews = document.querySelectorAll("p");

reviews.forEach(r => {
  console.log(r.innerText);
});