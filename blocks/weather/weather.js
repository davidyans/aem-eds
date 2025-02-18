export default function decorate(block) {

  const [title] = block.children;
  title.className = 'weather-comp-container';

  const [subcontainer] = title.children;
  subcontainer.className = 'weather-comp-subcontainer';
}
