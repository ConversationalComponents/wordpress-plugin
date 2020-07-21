<?php

class CoCoBotSettings {
	private $coco_bot_settings_options;

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'coco_bot_settings_add_plugin_page' ) );
		add_action( 'admin_init', array( $this, 'coco_bot_settings_page_init' ) );		
	}

	public function coco_bot_settings_add_plugin_page() {
		add_options_page(
			'CoCoHub Chatbot Settings', // page_title
			'CoCoHub Bot', // menu_title
			'manage_options', // capability
			'cocohub-bot-settings', // menu_slug
			array( $this, 'coco_bot_settings_create_admin_page' ) // function
		);
	}
	public function coco_bot_settings_create_admin_page() {
		$this->coco_bot_settings_options = get_option( 'coco_bot_settings_option_name' ); ?>
		<div class="wrap">
			<h2>CoCoHub Chatbot Settings</h2>
			<p>Use shortcode: <code>[cocobot]</code> to add the chat-window to your page</p>
			<p>Get a chatbot url(component_id) for your bot at <a href="https://cocohub.ai" target="_blank">cocohub.ai</a> </p>
			<p>Check out our tutorial to building and connecting your bot <a href="https://docs.cocohub.ai/tutorials/wp_cocobot" target="_blank">here</a></p>
			<?php settings_errors(); ?>

			<form method="post" action="options.php">
				<?php
					settings_fields( 'coco_bot_settings_option_group' );
					do_settings_sections( 'coco-bot-settings-admin' );
					submit_button();
				?>
			</form>
		</div>
	<?php }

	public function coco_bot_settings_page_init() {
		register_setting(
			'coco_bot_settings_option_group', // option_group
			'coco_bot_settings_option_name', // option_name
			array( $this, 'coco_bot_settings_sanitize' ) // sanitize_callback
		);

		add_settings_section(
			'coco_bot_settings_setting_section', // id
			'Settings', // title
			array( $this, 'coco_bot_settings_section_info' ), // callback
			'coco-bot-settings-admin' // page
		);

		add_settings_field(
			'name_0', // id
			'Name (required)', // title
			array( $this, 'name_0_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'humanidorurl_1', // id
			'component_id or url (required)', // title
			array( $this, 'humanidorurl_1_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'botgreeting_2', // id
			'Bot Greeting', // title
			array( $this, 'botgreeting_2_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'height_4', // id
			'Height', // title
			array( $this, 'height_4_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'width_5', // id
			'Width', // title
			array( $this, 'width_5_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'isfabless_3', // id
			'Is Fabless', // title
			array( $this, 'isfabless_3_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'defaultopen_6', // id
			'Chat-window is open by default', // title
			array( $this, 'defaultopen_6_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		
		add_settings_field(
			'isrtl_3', // id
			'Is RTL', // title
			array( $this, 'isrtl_3_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'source_language_code_7', // id
			'Source language code (en, he, ab, etc)', // title
			array( $this, 'source_language_code_7_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'fab_right_field_id', // id
			'Fab Right Side Distance', // title
			array( $this, 'fab_right_field_id_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);

		add_settings_field(
			'fab_bottom_field_id', // id
			'Fab Bottom Distance', // title
			array( $this, 'fab_bottom_field_id_callback' ), // callback
			'coco-bot-settings-admin', // page
			'coco_bot_settings_setting_section' // section
		);


	}

	public function coco_bot_settings_sanitize($input) {
		$sanitary_values = array();
		if ( isset( $input['name_0'] ) ) {
			$sanitary_values['name_0'] = sanitize_text_field( $input['name_0'] );
		} 

		if ( isset( $input['source_language_code_7'] ) ) {
			$sanitary_values['source_language_code_7'] = sanitize_text_field( $input['source_language_code_7'] );
		} 

		if ( isset( $input['humanidorurl_1'] ) ) {
			$sanitary_values['humanidorurl_1'] = sanitize_text_field( $input['humanidorurl_1'] );
		}

		if ( isset( $input['botgreeting_2'] ) ) {
			$sanitary_values['botgreeting_2'] = sanitize_text_field( $input['botgreeting_2'] );
		}

		if ( isset( $input['isfabless_3'] )) {	
			if( $input['isfabless_3'] == 1) {
				$sanitary_values['isfabless_3'] = true;
			}	
		} else {
			$sanitary_values['isfabless_3'] = false;
		}


		if ( isset( $input['isrtl_3'] )) {	
			if( $input['isrtl_3'] == 1) {
				$sanitary_values['isrtl_3'] = true;
			}	
		} else {
			$sanitary_values['isrtl_3'] = false;
		}

		if ( isset( $input['height_4'] ) ) {
			$sanitary_values['height_4'] = sanitize_text_field( $input['height_4'] );
		}

		if ( isset( $input['width_5'] ) ) {
			$sanitary_values['width_5'] = sanitize_text_field( $input['width_5'] );
		}

		if ( isset( $input['fab_right_field_id'] ) ) {
			$sanitary_values['fab_right_field_id'] = sanitize_text_field( $input['fab_right_field_id'] );
		}

		if ( isset( $input['fab_bottom_field_id'] ) ) {
			$sanitary_values['fab_bottom_field_id'] = sanitize_text_field( $input['fab_bottom_field_id'] );
		}

		if ( isset( $input['defaultopen_6'] ) ) {
			if( $input['defaultopen_6']  == 1) {
				$sanitary_values['defaultopen_6'] = true;
			}
		} else {
			$sanitary_values['defaultopen_6'] = false;
		}

		return $sanitary_values;
	}

	public function coco_bot_settings_section_info() {

	}

	public function name_0_callback() {
		printf(
			'<input class="regular-text" type="text" name="coco_bot_settings_option_name[name_0]" id="name_0" value="%s" required>',
			 $default = esc_attr( $this->coco_bot_settings_options['name_0'] ?? 'Lead Generator Bot') 
		);
	}
	
	public function source_language_code_7_callback() {
		printf(
			'<input class="regular-text" type="text" name="coco_bot_settings_option_name[source_language_code_7]" id="source_language_code_7" value="%s">',
			 $default = esc_attr( $this->coco_bot_settings_options['source_language_code_7'] ?? '')
		);
	}

	public function humanidorurl_1_callback() {
		printf(
			'<input class="regular-text" type="text" name="coco_bot_settings_option_name[humanidorurl_1]" id="humanidorurl_1" value="%s" required>',
			$default = esc_attr( $this->coco_bot_settings_options['humanidorurl_1'] ?? 'coco_bot_vp3')
		);
	}

	public function botgreeting_2_callback() {
		printf(
			'<input class="regular-text" type="text" name="coco_bot_settings_option_name[botgreeting_2]" id="botgreeting_2" value="%s">',
			$default = esc_attr( $this->coco_bot_settings_options['botgreeting_2'] ?? 'Hello')
		);
	}

	public function isfabless_3_callback() {
        $is_checked =  esc_attr( $this->coco_bot_settings_options['isfabless_3'] ?? 0) == 1 ? 1 : 0;

		$html =	'<input type="checkbox" class="regular-text" type="checko" name="coco_bot_settings_option_name[isfabless_3]" id="isfabless_3" value="1"' .  checked(1,  $is_checked , false ).'/>';

		echo $html;
	}


	public function isrtl_3_callback() {
        $is_checked =  esc_attr( $this->coco_bot_settings_options['isrtl_3'] ?? 0) == 1 ? 1 : 0;

		$html =	'<input type="checkbox" class="regular-text" type="checko" name="coco_bot_settings_option_name[isrtl_3]" id="isrtl_3" value="1"' .  checked(1,  $is_checked , false ).'/>';

		echo $html;
	}

	public function height_4_callback() {
		printf(
			'<input class="regular-text" type="number" name="coco_bot_settings_option_name[height_4]" id="height_4" value="%u">',
			$default = esc_attr( $this->coco_bot_settings_options['height_4'] ?? 500)
		);
	}

	public function width_5_callback() {
		printf(
			'<input class="regular-text" type="number" name="coco_bot_settings_option_name[width_5]" id="width_5" value="%u">',
			$default = esc_attr( $this->coco_bot_settings_options['width_5'] ?? 300)
		);
	}

	public function defaultopen_6_callback() {
		$is_checked =  esc_attr( $this->coco_bot_settings_options['defaultopen_6'] ?? 0) == 1 ? 1 : 0;

		$html = '<input class="regular-text" type="checkbox" name="coco_bot_settings_option_name[defaultopen_6]" id="defaultopen_6" value="1"'.  checked( 1, esc_attr( $this->coco_bot_settings_options['defaultopen_6'] ?? false), false ).'/>';
			
		echo $html;
		
	}

	public function fab_bottom_field_id_callback() {
		printf(
			'<input class="regular-text" type="number" name="coco_bot_settings_option_name[fab_bottom_field_id]" id="fab_bottom_field_id" value="%u">',
			$default = esc_attr( $this->coco_bot_settings_options['fab_bottom_field_id'] ?? '20')
		);
	}
	
	public function fab_right_field_id_callback() {
		printf(
			'<input class="regular-text" type="number" name="coco_bot_settings_option_name[fab_right_field_id]" id="fab_right_field_id" value="%u">',
			$default = esc_attr( $this->coco_bot_settings_options['fab_right_field_id'] ?? '20')
		);
	}
	
}
if ( is_admin() ) {
	$coco_bot_settings = new CoCoBotSettings();
}


/*
 * Retrieve this value with:
 * $coco_bot_settings_options = get_option( 'coco_bot_settings_option_name' ); // Array of All Options
 * $name_0 = $coco_bot_settings_options['name_0']; // Name
 * $source_language_code_7 = $coco_bot_settings_options['source_language_code_7']; // language code
 * $humanidorurl_1 = $coco_bot_settings_options['humanidorurl_1']; // HumanIdOrUrl
 * $botgreeting_2 = $coco_bot_settings_options['botgreeting_2']; // BotGreeting
 * $isfabless_3 = $coco_bot_settings_options['isfabless_3']; // IsFabless
 * $isrtl_3 = $coco_bot_settings_options['isrtl_3']; // IsRtl
 * $height_4 = $coco_bot_settings_options['height_4']; // Height
 * $width_5 = $coco_bot_settings_options['width_5']; // Width
 * $fab_right = $coco_bot_settings_options['fab_right_field_id']; // right offset for fab
 * $fab_bottom = $coco_bot_settings_options['fab_bottom_field_id']; // bottom offset for fab
 */