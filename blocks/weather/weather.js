export default function decorate(block) {
  const weather_title = block.querySelector('.weather-title');

  const [title] = block.children;
  title.className = 'weather-comp-container';

  if (weather_title) {
    const paragraph = weather_title.querySelector('p');

    if (paragraph) {
      paragraph.classList.add('location');
    }
  }
}
