<?php
// This file enqueues a shortcode.

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

add_shortcode( 'cocobot', function ( $atts ) {
	$default_atts = array();
	$args         = shortcode_atts( $default_atts, $atts );
	extract( shortcode_atts(
        array(
            'component' => '',
		), $atts));
		
	$coco_bot     = get_option( 'coco_bot_settings_option_name' );
	$params = '';
	$params       .= ( ! empty( $coco_bot['name_0'] ) ) ? 'bot_name="'.$coco_bot['name_0'].'"' : 'bot_name="CoCoHub"';
	$params       .= ( ! empty( $coco_bot['source_language_code_7'] ) ) ? 'source_language_code="'.$coco_bot['source_language_code_7'].'"' : 'source_language_code=""';
	$params       .= ( ! empty( $coco_bot['user_own_email_field'] ) ) ? 'user_email="'.$coco_bot['user_own_email_field'].'"' : 'user_email=""';
	$params       .= ( ! empty( $component ) ) ? 'human_id_or_url="'.$component.'"' : ( ( ! empty( $coco_bot['human_id_or_url'] ) ) ? 'human_id_or_url="'.$coco_bot['human_id_or_url'].'"' : 'human_id_or_url=""' );
	$params       .= ( ! empty( $coco_bot['channel_id'] ) ) ? 'channel_id="'.$coco_bot['channel_id'].'"' : ( ( ! empty( $coco_bot['channel_id'] ) ) ? 'channel_id="'.$coco_bot['channel_id'].'"' : 'channel_id=""' );
	$params       .= ( ! empty( $coco_bot['botgreeting_2'] ) ) ? 'bot_greeting="'.$coco_bot['botgreeting_2'].'"' : 'bot_greeting="Hello"';
	$params       .= ( ! empty( $coco_bot['isfabless_3'] ) ) ? 'is_fabless="'.$coco_bot['isfabless_3'].'"' : 'is_fabless=""';
	$params       .= ( ! empty( $coco_bot['isrtl_3'] ) ) ? 'is_rtl="'.$coco_bot['isrtl_3'].'"' : 'is_rtl=""';
	$params       .= ( ! empty( $coco_bot['is_window_on_left_3'] ) ) ? 'is_window_on_left="'.$coco_bot['is_window_on_left_3'].'"' : 'is_window_on_left=""';
	$params       .= ( ! empty( $coco_bot['height_4'] ) ) ? 'height="'.$coco_bot['height_4'].'"' : 'height="500"';
	$params       .= ( ! empty( $coco_bot['width_5'] ) ) ? 'width="'.$coco_bot['width_5'].'"' : 'width="300"';
	$params       .= ( ! empty( $coco_bot['defaultopen_6'] ) ) ? 'is_open_on_start="'.$coco_bot['defaultopen_6'].'"' : 'is_open_on_start=""';
	$params       .= ( ! empty( $coco_bot['fab_right_field_id'] ) ) ? 'fab_right="'.$coco_bot['fab_right_field_id'].'"' : 'fab_right=""';
	$params       .= ( ! empty( $coco_bot['fab_bottom_field_id'] ) ) ? 'fab_bottom="'.$coco_bot['fab_bottom_field_id'].'"' : 'fab_bottom=""';

	return '<div id="cocobot" ' . $params . '></div>';
} );