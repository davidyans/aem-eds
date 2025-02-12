export default function decorate(block) {
  const [quoteComponent] = block.children;
  quoteComponent.className = "quoteComponent";
}
