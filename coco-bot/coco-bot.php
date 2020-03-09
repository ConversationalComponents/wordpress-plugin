<?php
/**
*@package CoCo-Example-Bot
*/
/* 
Plugin Name: CoCo-Example-Bot
Plugin URI: https://cocohub.ai
Description: <strong>CoCo-Hub Example Chat Bot<strong>
Version: 1.0.0
Author: <a href="https://cocohub.ai">Cocohub.ai</a>
License: GPLv2 or later
Text Domain: Coco hub Plugin
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
		admin_url( 'options-general.php?page=coco-bot-settings' ) .
		'">' . __('Settings') . '</a>';
	return $links;
}