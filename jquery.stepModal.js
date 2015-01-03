/**
 *  jQuery.stepModal (Version: 1.0)
 *
 *  https://github.com/stepframe/jquery-stepModal
 *
 *  The MIT License (MIT)
 *  Copyright (c) 2013, Stepframe Interactive Media
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 **/


/* Sample CSS for modal popup
	.popup {
	  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.8);
	  display: table;
	  height: 100%; 
	  left: 0;
	  opacity: 0;
	  position: fixed;
	  top: 0;
	  width: 100%;
	  z-index: 999;
	  vertical-align: middle;
	}


remove the background from the page html and move it to the module to create programmatic
remove the close button, and create it programmatically

have separate animation options for background and content

send 2 functions in to the custom transition option (in and out)

extend to dialog - title, content, and class, button options

*/


// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

	// Create the defaults once
	var pluginName = "stepModal",
		defaults = {
			debug: false,
			transition: 'fade',
			transitionIn: 'fade',
			transitionOut: 'fade',
			closeSelector: ".modal-close",
			transitionInTime: 'slow',
			transitionOutTime: 'fast',
			dataAttribute: 'modaltarget',
			modal: true,
			modalClass: 'stepModal',
			appendSelector: 'body',
			backgroundTransitionSpeed: 'fast',
			contentAnimationDelay: 250,
			delayBackgroundAnimation: true,
			onOpen: false,
			onClose: false
		};



	function Plugin( element, options, contents ) {
		var modPop = this;
		this.eventObject = $(element);
		this.popContainer = false;
		this.contents = false;
		if (contents) {this.contents = $(contents);}

		this.setupTransitions();

		this.opts = {}
		
		if (options) {
			if (options.transition && !options.transitionIn) {options.transitionIn = options.transition;}
			if (options.transition && !options.transitionOut) {options.transitionOut = options.transition;}
			if (options.transitionIn && !options.transitionOut) {options.transitionOut = options.transitionIn;}
			/*for (var op in options) {
				modPop.opts[op] = options[op];
			}*/
		}
		this.opts = $.extend( {}, defaults, options) ;



		if (this.opts.transition && typeof(this.opts.transition) == "object" && this.opts.transition.length == 2) {
			this.opts.transitionIn = this.opts.transition[0];
			this.opts.transitionOut = this.opts.transition[1];
		} 

		if (this.opts.transitionIn && typeof(this.opts.transitionIn) == "function") {
			this.transitionIn = this.opts.transitionIn;
		} else {
			this.transitionIn = this.transitionsIn[this.opts.transitionIn];	
		}
		if (this.transitionIn == undefined) {this.transitionIn = this.defaultTransitionIn;}

		if (this.opts.transitionOut && typeof(this.opts.transitionOut) == "function") {
			this.transitionOut = this.opts.transitionOut;
		} else {
			this.transitionOut = this.transitionsOut[this.opts.transitionOut];
		}
		if (this.transitionOut == undefined) {this.transitionOut = this.defaultTransitionOut;}

		this.init();


		this.showBackground = function() {
			modPop.popContainer.fadeIn(modPop.opts.backgroundTransitionSpeed, function() {if (modPop.opts.onOpen) {modPop.opts.onOpen(modPop.contents);} modPop.triggerEvent("sfModalOpen");});
		}

		this.hideBackground = function(delay) {
			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {
				delayTime = 0;
			} 
			
			setTimeout(function(){
				modPop.popContainer.fadeOut(modPop.opts.backgroundTransitionSpeed);
				if (modPop.opts.onClose) {modPop.opts.onClose(modPop.contents);} 
				modPop.triggerEvent("sfModalClose");
			}, delayTime)

		}

		this.hideModal = function() {
			this.logMsg('hide modal');
			$(document).unbind("keyup", this.keyUpEvent);
			var content = modPop.contents;
			if (content && modPop.transitionOut) {
				modPop.transitionOut(content)
			}
			modPop.hideBackground(modPop.opts.delayBackgroundAnimation);
		}

		this.getContainer = function() {
			if (!modPop.popContainer) {
				this.logMsg('create modal');
				modPop.popContainer = $('<div/>', {'class': modPop.opts.modalClass}).appendTo(modPop.opts.appendSelector);
			}
			return $(modPop.popContainer);
		}

		this.ModalContent = function(element) {
			var jElement = $(element);
			var contentTarget = false;
			if (modPop.opts.dataAttribute) {
				var targ = jElement.data(modPop.opts.dataAttribute);
				if (targ && targ.length> 0) {
					if ($(targ).length > 0) {
						contentTarget = $(targ);
					} else if (targ.substring(0,1) != '#' && $('#' + targ).length > 0) {
						contentTarget = $('#' + targ);
					}
				}				
			}

			var href = jElement.attr('href');
			if (href && href.length> 0) {
				if ($(href).length > 0) {
					contentTarget = $(href);
				} else if (href.substring(0,1) != '#' && $('#' + href).length > 0) {
					contentTarget = $('#' + href);
				}
			}	
			if (contentTarget) {
				if (contentTarget.closest("." + modPop.opts.modalClass).length > 0) {
					modPop.popContainer = contentTarget.closest("." + modPop.opts.modalClass);
				}
			}
			return contentTarget;
		}

		this.keyUpEvent = function(e) {
			modPop.logMsg("Key Up");
			var KEYCODE_ESC = 27;
			if (e.keyCode == KEYCODE_ESC) { modPop.hideModal(); }  
		}

		this.showModal = function(element) {
			if (!this.contents) {
				this.contents = this.ModalContent(element);
			}
			var popContainer = this.getContainer()
			if (this.contents) {
				var content = this.contents;
				//popContainer.empty();
				popContainer.append(content);
				content.css('display', 'block')

				if (!modPop.opts.modal) {
					content.click(function(e) {
						e.stopPropagation();
					})
					popContainer.click(function(e) {
						e.stopPropagation();
						modPop.hideModal();
					})
					var KEYCODE_ESC = 27;
					$(document).keyup(modPop.keyUpEvent);
				}
				this.logMsg('show modal');

				this.showBackground();

				if (modPop.transitionIn) {
					modPop.transitionIn(content, modPop.opts.delayBackgroundAnimation);
				}

				$(content).find(this.opts.closeSelector).each(function(index, ele) {
					if (!$(this).data('sfclickDefined')) {
						$(this).data('sfclickDefined', true);
						$(this).click(function(e) {
							modPop.hideModal();
						})
					}
				})
			}
		}

		this.triggerEvent = function(eventName) {
			if (this.eventObject) {
				this.eventObject.trigger(eventName);
			}
		}

		this.logMsg = function(message) {
			if (modPop.opts.debug) {window.console && console.log(message)}
		}

	}
 

	Plugin.prototype.init = function() {
		var plugin = this;
		this.eventObject.click(function(e) {
			e.preventDefault();
			plugin.showModal(this);
		})
	} 

	Plugin.prototype.setupTransitions = function() {
		var modPop = this;
		var sffadeInEffect = function(content, delay) {
			content.hide();
			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {
				delayTime = 0;
			} 
			setTimeout(function(){
				content.fadeIn(modPop.opts.transitionInTime);
			}, delayTime)

			
		}
		var sfslideDownEffect = function(content) {
			var contentPos = content.css('position');
			if (!contentPos || contentPos == "static") {content.css('position', 'relative')}
			content.css('top', -1 * modPop.popContainer.height() + 'px');
			


			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {
				delayTime = 0;
			} 
			setTimeout(function(){
				content.animate({'top': 0}, modPop.opts.transitionInTime);
			}, delayTime)

		}
		
		var sffadeOutEffect = function(content, delay) {
			this.logMsg('fade out');
			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {delayTime = 0;} 

			setTimeout(function(){
				content.fadeOut(modPop.opts.transitionOutTime);
			}, delayTime)
		}

		var sfslideUpEffect = function(content) {
			var contentPos = content.css('position');
			if (!contentPos || contentPos == "static") {content.css('position', 'relative')}
			

			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {delayTime = 0;} 

			setTimeout(function(){
				content.animate({'top': -1.5 * modPop.popContainer.height()}, modPop.opts.transitionOutTime);
			}, delayTime)
		}

		var sfshowInEffect = function(content) {
			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {delayTime = 0;} 

			setTimeout(function(){
				content.show();
			}, delayTime)

			
		}

		var sfshowOutEffect = function(content) {
			var delayTime = modPop.opts.contentAnimationDelay;
			if (!delay) {delayTime = 0;} 

			setTimeout(function(){
				content.hide();
			}, delayTime)
		}

		this.defaultTransitionIn = sffadeInEffect;
		this.defaultTransitionOut = sffadeOutEffect;

		this.transitionsIn = {
			'fade': sffadeInEffect,
			'slideDown': sfslideDownEffect,
			'show': sfshowInEffect
		}
		this.transitionsOut = {
			'fade': sffadeOutEffect,
			'slideDown': sfslideUpEffect,
			'show': sfshowOutEffect
		}
	}


	$.fn[pluginName] = function(options){
		return this.each(function(){
			if ( !$.data(this, "plugin_" + pluginName )) {
				$.data( this, "plugin_" + pluginName,
				new Plugin( this, options ));
			}
		});
	}

	/*$.fn.setupStepModal = function(options){
		return this.each(function(){
			var modPop = new stepModal(options);
			modPop.eventObject = $(this);
			$(this).click(function(e) {
				modPop.showModal(this);
			})
		});
	}

	$.fn.showStepModal = function(options){
		var modPop = new stepModal(options);

		return this.each(function(){		
			modPop.showModal(this);
		});
	}


*/ 
	$.fn.showStepModal = function(options){

		return this.each(function(){		
			if ( !$.data(this, "plugin_" + pluginName )) {
				$.data( this, "plugin_" + pluginName,
				new Plugin( this, options, this ));
			}
			var plugin = $.data(this, "plugin_" + pluginName );
			plugin.showModal(this);
		});
	}


})( jQuery, window, document );
