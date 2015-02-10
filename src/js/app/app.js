;(function($) {

	// Plugin constructor with options and methods
	var MainPlugin = function() {

		var _self = this;

		var _options = {
			
			slickDefaults: {
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: true,
				dots: false,
				fade: Modernizr.csstransitions && !Modernizr.mq('only all and (max-width: 1024px)'),
				infinite: true,
				speed: 1000
			}
		};

		this.methods = {

			init: function () {

				// Loads foundation jquery plugins
				$(document).foundation();

				// Scroll to top button
				$('.js-backtotop').click(function(){
					$('html, body').animate({scrollTop : 0}, 500);
					return false;
				});

				// Find page name
				var page = $('#content').find('[data-page]').data('page');

				// Active navlink indicator
				$('#nav li.nav-' + page).find('a').addClass('secondary');

				switch (page) {

					case "index":
						_self.methods.initIndex();
						break;
				}
			},

			initIndex: function() {
				// Load slick carousel plugin
				$('.js-slick').slick(_options.slickDefaults);
			}
		}

		// Initialize 
		_self.methods.init();
	};

	// Load plugin on document ready
	$(document).ready(new MainPlugin());

})($);