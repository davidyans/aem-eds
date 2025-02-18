export default function decorate(block) {
  const [container] = block.children;
  container.className = 'weather-comp-container';

  const [subcontainer] = container.children;
  subcontainer.className = 'weather-comp-subcontainer';

  const [title] = container.children;
  title.className = 'location';
}
