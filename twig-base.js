import Twig from 'twig';

export default class TwigBase extends HTMLElement {

  constructor() {
    super();
    this.template = '';
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return [];
  }

  getTemplateVariables() {
    let attributes = {};
    this.constructor.observedAttributes.forEach((attribute) => {
      if (this.hasAttribute(attribute)) {
        attributes[attribute] = this.getAttribute(attribute);
      }
    });
    return attributes;
  }

  render() {
    this.shadowRoot.innerHTML = Twig.twig({
      data: this.constructor.template
    }).render(this.getTemplateVariables());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

}
