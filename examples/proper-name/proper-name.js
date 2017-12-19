import TwigBase from '../../twig-base';

export default class ProperName extends TwigBase {

  static get observedAttributes() {
    return ['first', 'last', 'suffix'];
  }

  renderTemplate(variables) {
    return require('./proper-name.twig')(variables);
  }

}
