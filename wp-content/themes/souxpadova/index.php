<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context          = Timber::context();
$context['posts'] = new Timber\PostQuery();

$slugs = [];
$topics = Timber::get_terms('category');
// $topics = Timber::get_terms(array(
//     'taxonomy'     => 'category',
//     'meta_key'     => 'order',
//     'orderby'      => 'meta_value',
//     'order'        => 'ASC',
// ));

$unique_topics = [];
foreach ($topics as $topic) {
    if(!in_array($topic->slug, $slugs))
    {
        $slugs[] = $topic->slug;
        $unique_topics[] = $topic;
    }
}
$context["topics"] = $unique_topics;

$templates        = array( 'blog.twig', 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'front-page.twig', 'home.twig');
}
Timber::render( $templates, $context );
