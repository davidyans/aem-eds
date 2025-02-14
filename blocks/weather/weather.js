export default function decorate(block) {
  const [title] = block.children;
  title.className = 'weather-title';
}
