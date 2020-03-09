<?php
// This file enqueues a shortcode.

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

add_shortcode( 'cocobot', function ( $atts ) {
	$default_atts = array();
	$args         = shortcode_atts( $default_atts, $atts );

	$coco_bot     = get_option( 'coco_bot_settings_option_name' );
	$params       = ( ! empty( $coco_bot['name_0'] ) ) ? 'name="'.$coco_bot['name_0'].'"' : 'name="CoCoHub Demo Bot"';
	$params       .= ( ! empty( $coco_bot['humanidorurl_1'] ) ) ? 'human_id_or_url="'.$coco_bot['humanidorurl_1'].'"' : 'human_id_or_url="coco_bot_vp3"';
	$params       .= ( ! empty( $coco_bot['botgreeting_2'] ) ) ? 'bot_greeting="'.$coco_bot['botgreeting_2'].'"' : '';
	$params       .= ( ! empty( $coco_bot['isfabless_3'] ) ) ? 'is_fabless="'.$coco_bot['isfabless_3'].'"' : '';
	$params       .= ( ! empty( $coco_bot['height_4'] ) ) ? 'height="'.$coco_bot['height_4'].'"' : '';
	$params       .= ( ! empty( $coco_bot['width_5'] ) ) ? 'width="'.$coco_bot['width_5'].'"' : '';
	$params       .= ( ! empty( $coco_bot['defaultopen_6'] ) ) ? 'is_open_on_start="'.$coco_bot['defaultopen_6'].'"' : 'is_open_on_start="true"';

	return '<div id="cocobot" ' . $params . '></div>';
} );
