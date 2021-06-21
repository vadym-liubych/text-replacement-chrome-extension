const words = document.querySelectorAll(
  'h1, h2, h3, h4, h5, p, li, td, caption, span, a, div',
);

for (const word of words) {
  if (word.innerHTML.includes('A')) {
    word.innerHTML = word.innerHTML.replace(/A/g, 'B!');
  }
}
