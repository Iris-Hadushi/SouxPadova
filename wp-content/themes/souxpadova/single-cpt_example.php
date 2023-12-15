<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 * Template Name: Custom Post Type Example [Standard]
 * Description: Custom Post Type Example [Standard]
 */

$templates = array('posts/cpt_example/default.twig');
$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render( $templates, $context );
