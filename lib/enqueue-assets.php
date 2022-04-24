<?php

function malin_enqueue_assets(){
    wp_enqueue_style('malin_theme_css', get_template_directory_uri().'/dist/assets/css/bundle.css', array(), 1.0, 'all');
}

add_action( 'wp_enqueue_scripts', 'malin_enqueue_assets' );