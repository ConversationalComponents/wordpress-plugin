<?php
// This file enqueues scripts and styles

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

add_action( 'init', function() {

    add_filter( 'script_loader_tag', function( $tag, $handle ) {
      if ( ! preg_match( '/^erw-/', $handle ) ) { return $tag; }
      return str_replace( ' src', ' async defer src', $tag );
    }, 10, 2 );
  
    add_action( 'wp_enqueue_scripts', function() {
        wp_enqueue_script( 'main-from-cdn', "https://storage.googleapis.com/coco_public/chatwindow/v4/main.js", array(), null, true );
    });
  });