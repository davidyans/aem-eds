export default function decorate(block) {
  const [text, author] = block.children;
  text.className = 'quoteText';
  author.className = 'quoteAuthor';
}
