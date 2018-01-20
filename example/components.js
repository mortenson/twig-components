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

class MySlotted extends TwigBase {
  static get observedAttributes() {
    return [];
  }

  getTemplate() {
    return 'Your content: <slot />';
  }
}

customElements.define('my-slotted', MySlotted);
