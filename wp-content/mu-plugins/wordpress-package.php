<?php
/**
 * Plugin Name: WordPress Package Security
 * Description: Disable Access Direct to WordPress Package (site.com/wordpress.json)
 * Version:     1.0.0
 * License:     MIT
 *
 * @package WP-PACKAGIST
 */
function wp_cli_wordpress_package_access( $rules ) {
$content = <<<EOD
\n# Protect wordpress.json
<Files ~ "^(wordpress.json|wordpress.lock|wp-cli.yml|wp-cli.local.yml)">
    Order Allow,Deny
    Deny from all
</Files>\n
EOD;
    return $rules.$content;
}
add_filter('mod_rewrite_rules', 'wp_cli_wordpress_package_access');