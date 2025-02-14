export default function decorate(block) {
  const [title] = block.children;
  title.className = 'weather-title';

  var weather_title = block.querySelector('.weather-title');

  if (title) {
    const paragraph = title.querySelector('p');

    if (paragraph) {
      paragraph.classList.add('location');
    }
  }
}
