export default function decorate(block) {
  const weatherTitle = block.querySelector('.weather-title');

  const [title] = block.children;
  title.className = 'weather-comp-container';

  if (weatherTitle) {
    const paragraph = weatherTitle.querySelector('p');

    if (paragraph) {
      paragraph.classList.add('location');
    }
  }
}
