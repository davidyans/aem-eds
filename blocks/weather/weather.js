export default function decorate(block) {
  const weatherTitle = block.querySelector('.weather-title');

  const [title] = block.children;
  title.className = 'weather-comp-container';

  const [subcontainer] = title.children;
  subcontainer.className = 'weather-comp-subcontainer';

  if (weatherTitle) {
    const paragraph = weatherTitle.querySelector('p');

    if (paragraph) {
      paragraph.classList.add('location');
    }
  }
}
