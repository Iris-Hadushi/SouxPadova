<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 * Template Name: Homepage
 * Description: Homepage
 */

$templates = array('pages/homepage.twig');
$context = Timber::get_context();
$context['post'] = new TimberPost();

$context['posts'] = Timber::get_posts(array(
    "posts_per_page" => -1,
    'numberposts'  => -1,
    // 'suppress_filters' => true,
));

Timber::render( $templates, $context );
