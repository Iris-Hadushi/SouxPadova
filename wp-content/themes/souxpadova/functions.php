<?php
/**
* Based on awesome 'Timber starter-theme'
* https://github.com/timber/starter-theme
* Developed © Gioele Chiappani
*
* @package  WordPress
* @subpackage  Timber
* @since   Timber 0.1
*/

/**
* This ensures that Timber is loaded and available as a PHP class.
* If not, it gives an error message to help direct developers on where to activate
*/
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>'.__('Timber non attivato. Assicurati di aver attivato il plugin:','timber').'<a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
* Sets the directories (inside your theme) to find .twig files
*/
Timber::$dirname = array( 'templates', 'views' );

/**
* By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
* No prob! Just set this value to true
*/
Timber::$autoescape = false;


/**
* We're going to configure our theme inside of a subclass of Timber\Site
* You can move this to its own file and include here via php's include("MySite.php")
*/
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		// Default Timber/Twig Setup
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );

		// Admin Integrations
		add_action( 'admin_head', array( $this, 'admin_styles') ); // Admin CSS Styles integration
		add_action( 'admin_menu', array( $this, 'admin_pages' ) ); // Admin modify/hide entrypoint for specific users or all users
		add_filter( 'admin_body_class', array( $this, 'current_user_role' ) ); // Add 'user-based' class to admin <body>
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts') ); // Admin Javascript integration (use built-in jQuery for WP Backend)

		// Add new userr Roles
		add_action( 'init', array( $this, 'add_site_manager_role') );

		// Add options pages (using ACF Pro Plugin)
		add_action( 'init', array( $this, 'add_option_page' ) );

		// Register new WP istances (CPT or Taxonomies)
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );

		// Enqueue CSS & JS assets
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );

		// Usefull included integration
		add_filter( 'use_block_editor_for_post', '__return_false', 10 ); // Remove 'Gutemberg Builder' for default posts
		add_filter( 'use_block_editor_for_post_type', '__return_false', 10 ); // Remove 'Gutemberg Builder' for Custom Post Types

		// Vendors/Plugin Additions : CF7 Features
		add_filter( 'wpcf7_form_elements', array( $this, 'cf7_remove_tags' ));
		add_filter( 'shortcode_atts_wpcf7', array( $this, 'cf7_dinamyc_attributes' ), 10, 3 );

		parent::__construct();
	}

	/** This is where you can add your functions to Admin Backend <head> */
	public function admin_styles() { }

	/** This is where you can add your assets (CSS&JS) for your Admin Backend */
    public function admin_scripts() {
		wp_enqueue_style('admin', get_stylesheet_directory_uri() . '/dist/css/admin.min.css');
        wp_enqueue_script('admin', get_template_directory_uri() . "/dist/js/admin.js");
	}

	/** This is where you can add/remove Admin pages/menus */
    public function admin_pages(){
		if (current_user_can('site_manager')) {
			remove_menu_page( 'edit.php' );
			remove_menu_page( 'edit-comments.php' );
            remove_menu_page( 'tools.php' );
            remove_submenu_page( 'themes.php', 'themes.php' ); // hide the theme selection submenu
            remove_submenu_page( 'themes.php', 'widgets.php' ); // hide the widgets submenu
            remove_submenu_page( 'themes.php', 'customize.php?return=%2Fwp-admin%2Findex.php' ); // hide the customizer submenu
            remove_submenu_page( 'themes.php', 'customize.php?return=%2Fwp-admin%2Ftools.php&#038;autofocus%5Bcontrol%5D=background_image' ); // hide the background submenu

            add_menu_page(
                'Menu', 'Menu', 'edit_posts', '/nav-menus.php', '', 'dashicons-menu', 4
            );
        }
	}

	/** Creating ACF Options Page 'Informazioni' */
	public function add_option_page() {
		if( function_exists('acf_add_options_page') ) { 
			acf_add_options_page(array(
				'page_title'  => 'Informazioni Generali',
				'menu_title'  => 'Informazioni',
				'menu_slug'   => 'your-project-settings',
				'capability'  => 'edit_posts',
				'redirect'    => false,
				'icon_url'    => 'dashicons-index-card',
			));
			acf_add_options_sub_page( array(
                'page_title'  => 'Esempio SubPage',
                'menu_title'  => 'Esempio SubPage',
                'parent_slug' => 'your-project-settings',
                'capability'  => 'edit_posts',
                'redirect'    => false
            ) );
		}
	}

	/** This is where you can register custom post types. */
	public function register_post_types() { }
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() { }
	/** This is where you can add your assets */
	public function enqueue_assets() {
		wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
		wp_enqueue_style('bootstrap-icons', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css'); // If you want a good icon library ready to use
		wp_enqueue_style('lightgallery', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.10.0/css/lightgallery.min.css'); // Include Ligthgallery CSS to create Lightboxes 
		wp_enqueue_style('swiper-theme', 'https://unpkg.com/swiper/swiper-bundle.min.css'); // Include Swiper Carousel CSS
		wp_enqueue_style('mapbox-gl', 'https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css'); // Include MapboxGL CSS (instead of using GMaps)

		// Custom CSS
		wp_enqueue_style('style', get_stylesheet_directory_uri() . '/dist/css/main.min.css');

		// Update WP jQuery Version
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js', '', '', true);
		wp_enqueue_script('jquery');

		// Inject Scripts
		wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', '', '', true );

		wp_enqueue_script('scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/ScrollTrigger.min.js', '', '', true);

		// Custom JS
		wp_enqueue_script('vendors', get_template_directory_uri() . "/dist/js/vendors~main.min.js",'','',true);
		wp_enqueue_script('main', get_template_directory_uri() . "/dist/js/main.min.js",'','',true);
	}

	/** Add User Role Class to Body **/
    public function current_user_role($classes) {
        global $current_user;
        $user_role = array_shift($current_user->roles);
		$user = $user_role . ' ' . $current_user->user_login;
        /* Adds the user id to the admin body class array */
        $classes = $user;
        return $classes;
    }

	/** Add New User Role : Site Manager (site_manager) */
	public function add_site_manager_role() {
        add_role(
            'site_manager',
            __('Site Manager', 'your-project'),
            array(
                'manage_categories' => true,
                'manage_links' => true,
                'upload_files' => true,
                'unfiltered_html' => true,
                'edit_posts' => true,
                'edit_others_posts' => true,
                'edit_published_posts' => true,
                'publish_posts' => true,
                'edit_pages' => true,
                'read' => true,
                'level_7' => true,
                'level_6' => true,
                'level_5' => true,
                'level_4' => true,
                'level_3' => true,
                'level_2' => true,
                'level_1' => true,
                'level_0' => true,
                'edit_others_pages' => true,
                'edit_published_pages' => true,
                'publish_pages' => true,
                'delete_pages' => true,
                'delete_others_pages' => true,
                'delete_published_pages' => true,
                'delete_posts' => true,
                'delete_others_posts' => true,
                'delete_published_posts' => true,
                'delete_private_posts' => true,
                'edit_private_posts' => true,
                'read_private_posts' => true,
                'delete_private_pages' => true,
                'edit_private_pages' => true,
                'read_private_pages' => true,
                'copy_posts' => true,
                'edit_theme_options' => true,
                'edit_attachments' => true,
                'delete_attachments' => true,
                'read_others_attachments' => true,
                'edit_others_attachments' => true,
                'delete_others_attachments' => true,
                'delete_users' => true,
                'create_users' => true,
                'list_users' => true,
                'remove_users' => true,
                'promote_users' => true,
                'promote_users_to_higher_level' => true,
            )
        );
    }

	/** This is where you add some context
	*
	* @param string $context context['this'] Being the Twig's {{ this }}.
	*/
	public function add_to_context( $context ) {
		// Get Fields from Options
		$context['options'] = get_fields('option');
		$context['holder'] = get_field('holder','option');
		// Menus
		$context['menu']  = new Timber\Menu();
		$context['main_menu']  = new Timber\Menu('main_menu');
        $context['quick_menu']  = new Timber\Menu('quick_menu');
		$context['language_switcher'] = new Timber\Menu('language_switcher');

		// Site itself
		$context['site']  = $this;

		// Usefull Integration
		$context['url_parameters'] = Timber\URLHelper::get_params(); // Timber Heleper to get some URL params
		$context['cookie_test'] = isset($_COOKIE['test']) ? $_COOKIE['bar'] : 'foo'; // An example of getting cookie if exists

		return $context;
	}

	/** Function to set an example cookie */
	public function custom_cookies(){
		setcookie("test", 'foo', strtotime('+15 days'), '/', 'your-project.noooserver.com');
	}


	/** Others usefull functions based on some plugins or others */

	// CF7 Plugin : Remove unsefull <br>
	public function cf7_remove_tags($content) {
		// $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

    	$content = str_replace('<br />', '', $content);

		return $content;
	}

	// CF7 Plugin : Set dynamic attributes to use it in forms 
	public function cf7_dinamyc_attributes( $out, $pairs, $atts ) {
		$attributes = array( 'url','title');
	
		foreach ($attributes as $value) {
			if ( isset( $atts[$value] ) ) {
				$out[$value] = $atts[$value];
			}
		}
		return $out;
	}


	/** Theme Supports */
	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a hard-coded <title> tag in the document head, and expect WordPress to provide it for us.
		*/
		add_theme_support( 'title-tag' );

		/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
		add_theme_support( 'post-thumbnails' );

		/*
		* Switch default core markup for search form, comment form, and comments to output valid HTML5.
		*/
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		* Enable support for Post Formats.
		*
		* See: https://codex.wordpress.org/Post_Formats
		*/
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** TWIG Filters/Extensions Functions */

	// Slug-ify a string
	public function slugify( $title ) {
		return sanitize_title( $title );
	}

	// Get SVG Code instead an <img src="" />
	public function get_svg_from_file($file) {
  		return file_get_contents( $file, false, stream_context_create(array('ssl' => array('verify_peer' => false, 'verify_peer_name' => false))));
    }

	/** This is where you can add your own functions to twig.
	*
	* @param string $twig get extension.
	*/
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );

		/** Usefull integrations */
		$twig->addFilter(new Twig\TwigFilter('get_svg_from_file', array($this, 'get_svg_from_file'))); // Get SVG Code instead an <img src="" ... /> 
		$twig->addFilter(new Twig\TwigFilter('get_id_by_slug', array($this, 'get_id_by_slug'))); // Return a 'slugified' string (remove spaces, uppercase, etc..)
		
		return $twig;
	}

}

new StarterSite();
