<?php

require_once './vendor/autoload.php';

$json = file_get_contents('./dist/templates.json');
$templates = json_decode($json, TRUE);
$loader = new Twig_Loader_Array($templates);
$twig = new Twig_Environment($loader);

$html = file_get_contents('./index.html');
$document = new DOMDocument();
@$document->loadHTML($html);

pre_render_twig_components($document, $document, $templates, $twig);

function pre_render_twig_components(DOMNode &$element, DOMDocument $document, array $templates, Twig_Environment $twig) {
  foreach ($templates as $tag_name => $template) {
    /** @var DOMElement $tag */
    foreach ($element->getElementsByTagName($tag_name) as $tag) {
      if ($tag->hasAttribute('ssr')) {
        continue;
      }
      $context = [];
      /** @var DOMAttr $attribute */
      foreach ($tag->attributes as $attribute) {
        $context[$attribute->name] = $attribute->value;
      }
      $render = $twig->render($tag_name, $context);
      $child = $document->createDocumentFragment();
      $child->appendXML($render);
      $tag->appendChild($child);
      $tag->setAttribute('ssr', 'true');
      pre_render_twig_components($tag, $document, $templates, $twig);
    }
  }
}

echo $document->saveHTML();
