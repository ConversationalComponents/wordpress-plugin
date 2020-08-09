<?php
/**
*@package CoCoHub
*/
/* 
Plugin Name: CoCoHub
Plugin URI: https://cocohub.ai/?utm_source=wp-plugins&utm_campaign=plugin-uri&utm_medium=wp-dash
Description: The first repository for chatbot conversational components. Create advanced chatbots and connect them to your website. Use existing components or create new ones using Dialogflow, MS bot framework, Rasa and more.
Version: 1.1.8
Author: CoCoHub.ai
Author URI: https://cocohub.ai/?utm_source=wp-plugins&utm_campaign=author-uri&utm_medium=wp-dash
License: MIT
Text Domain: cocohub
*/ 

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

define( 'ERW_WIDGET_PATH', plugin_dir_path( __FILE__ ) );
define( 'ERW_ASSET_MANIFEST', ERW_WIDGET_PATH . '/build/asset-manifest.json' );
define( 'ERW_INCLUDES', plugin_dir_path( __FILE__ ) . '/includes' );

require_once( ERW_INCLUDES . '/CoCoBotSettings.php' );
require_once( ERW_INCLUDES . '/enqueue.php' );
require_once( ERW_INCLUDES . '/shortcode.php' );

add_filter('plugin_action_links_'.plugin_basename(__FILE__), 'coco_add_plugin_page_settings_link');

function coco_add_plugin_page_settings_link( $links ) {
	$links[] = '<a href="' .
		admin_url( 'options-general.php?page=cocohub-bot-settings' ) .
		'">' . __('Settings') . '</a>';
	return $links;
}
