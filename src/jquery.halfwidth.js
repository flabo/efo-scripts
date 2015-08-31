// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var pluginName = "halfwidth",
				defaults = {
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
						$(this.element).on('keydown', function(){
							var string = $(this).val();
							$(this).val(plugin.converter(string));
						});
				},
				converter: function(r) {
					return r.replace(/\u3000/g, ' ').replace(/[！-～]/g, function(r) {
						return String.fromCharCode(r.charCodeAt(0) - 0xFEE0);
					});
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
