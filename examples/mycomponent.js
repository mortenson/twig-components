import TwigBase from '../twig-base';

class MyComponent extends TwigBase {

  static get observedAttributes() {
    return ['name', 'user-prompt'];
  }

  getTemplate() {
    return 'Hello {{ name }}! {{ user_prompt }}?';
  }

}

customElements.define('my-component', MyComponent);
