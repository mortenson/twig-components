import Twig from 'twig';

export default class TwigBase extends HTMLElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
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

  renderTemplate(variables) {
    return Twig.twig({
      data: this.constructor.template || '',
    }).render(variables);
  }

  render() {
    this.shadowRoot.innerHTML = this.renderTemplate(this.getTemplateVariables());
  }

}
