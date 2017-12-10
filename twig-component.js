import Twig from 'twig';

class TwigComponent extends HTMLElement {
  static get observedAttributes() { return ['name']; }

  static get template() { return 'Hello {{ name }}'; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    let attributes = {};
    this.constructor.observedAttributes.forEach((attribute) => {
      if (this.hasAttribute(attribute)) {
        attributes[attribute] = this.getAttribute(attribute);
      }
    });
    return Twig.twig({
      data: this.constructor.template,
    }).render(attributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.innerHTML = this.render();
  }
}

customElements.define('twig-example', TwigComponent);
