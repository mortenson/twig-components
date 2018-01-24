import Twig from 'twig';

export default class TwigBase extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    if (this.dataset.ssrContent) {
      this.innerHTML = JSON.parse(this.dataset.ssrContent);
    }
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  getTemplate() {
    return '';
  }

  getTemplateVariables() {
    const attributes = {};
    this.constructor.observedAttributes.forEach((attribute) => {
      if (this.hasAttribute(attribute)) {
        attributes[attribute.replace('-', '_')] = this.getAttribute(attribute);
      }
    });
    return attributes;
  }

  renderTemplate(variables) {
    return Twig.twig({
      data: this.getTemplate(),
    }).render(variables);
  }

  render() {
    this.shadowRoot.innerHTML = this.renderTemplate(this.getTemplateVariables());
  }
}
