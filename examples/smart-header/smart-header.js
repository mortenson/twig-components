import TwigBase from '../../twig-base';

export default class SmartHeader extends TwigBase {

  connectedCallback() {
    let parent = this.parentElement;
    this.depth = 1;
    while (parent = parent.parentElement) {
      for (let i in parent.children) {
        if (parent.children.hasOwnProperty(i)) {
          if (parent.children[i].tagName === this.tagName) {
            ++this.depth;
            break;
          }
        }
      }
    }
    super.connectedCallback();
  }

  getTemplateVariables() {
    let variables = super.getTemplateVariables();
    variables.depth = this.depth;
    return variables;
  }

}
