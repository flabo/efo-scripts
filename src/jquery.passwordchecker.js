// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var pluginName = "passwordchecker",
			defaults = {
				target: "#passwordchecker"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						var plugin = this;
						$(this.element).on('keyup', function(){
							var string = $(this).val();
							var ps = plugin.displayPasswordStrength(string);
							if (ps) $(plugin.settings.target).text(ps);
						});
				},
				displayPasswordStrength: function(pwd) {
					var ps = this.passwordStrengthCalculator(pwd);
					if (ps < 25) {
						return "弱";
					} else if (ps < 35) {
						return "中";
					} else if (ps > 34) {
						return "強";
					}
					return "";
				},
				passwordStrengthCalculator: function(pwd) {
					var score = 0;
					if (pwd.length > 5 && pwd.length < 8) {
						score = (score + 6);
					}
					else if (pwd.length > 7 && pwd.length < 16) {
						score = (score + 12);
					} else if (pwd.length > 15)
					{
						score = (score + 18);
					}
					if (pwd.match(/[a-z]/)) {
						score = (score + 1);
					}
					if (pwd.match(/[A-Z]/)) {
						score = (score + 5);
					}
					if (pwd.match(/\d+/))
					{
						score = (score + 5);
					}
					if (pwd.match(/(.*[0-9].*[0-9].*[0-9])/))
					{
						score = (score + 5);
					}
					if (pwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/))
					{
						score = (score + 5);
					}
					if (pwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
						score = (score + 5);
					}
					if (pwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
					{
						score = (score + 2);
					}
					if (pwd.match(/([a-zA-Z])/) && pwd.match(/([0-9])/))
					{
						score = (score + 2);
					}
					if (pwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
						score = (score + 2);
					}
					return score;
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
