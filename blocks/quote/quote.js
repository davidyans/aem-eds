export default function decorate(block) {
  const [quoteText, quoteAuthor] = block.children;
  quoteText.className = 'quoteText';
  quoteAuthor.className = 'quoteAuthor';
}
