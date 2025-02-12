export default function decorate(block) {
  const [text, author] = block.children;
  text.className = 'text';
  author.className = 'author';
}
