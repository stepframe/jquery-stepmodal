/**
 *  jQuery.steframeModal (Version: 1.0)
 *
 *  https://github.com/stepframe/jquery-stepframemodal
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

*/

(function($){
	var stepframeModal = function(options) {
		var modPop = this;
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

		this.opts = {
			id: 'popMod',
			debug: false,
			transition: 'fade',
			transitionIn: 'fade',
			transitionOut: 'fade',
			closeSelector: ".modal-close",
			modalClassSelect: 'sfModalClass',
			transitionInTime: 'slow',
			transitionOutTime: 'fast',
			dataAttribute: 'modaltarget',
			modal: true
		}
		
		if (options) {
			if (options.transition && !options.transitionIn) {options.transitionIn = options.transition;}
			if (options.transition && !options.transitionOut) {options.transitionOut = options.transition;}
			if (options.transitionIn && !options.transitionOut) {options.transitionOut = options.transitionIn;}
			for (var op in options) {
				modPop.opts[op] = options[op];
			}
		}


		if (this.opts.transitionIn && typeof(this.opts.transitionIn) == "function") {
			this.transitionIn = this.opts.transitionIn;
		} else {
			this.transitionIn = this.transitionsIn[this.opts.transitionIn];	
		}
		if (this.transitionIn == undefined) {this.transitionIn = fadeInEffect;}

		if (this.opts.transitionOut && typeof(this.opts.transitionOut) == "function") {
			this.transitionOut = this.opts.transitionOut;
		} else {
			this.transitionOut = this.transitionsOut[this.opts.transitionOut];
		}
		if (this.transitionOut == undefined) {this.transitionOut = fadeOutEffect;}

		this.hideModal = function() {
			if (modPop.opts.debug) {window.console && console.log('hide modal')}
			var content = $('.' + modPop.opts.modalClassSelect);
			if (content && modPop.transitionOut) {
				modPop.transitionOut(modPop, content)
			}
		}

		this.ModalContent = function(element) {
			var jElement = $(element);
			if (modPop.opts.dataAttribute) {
				var targ = jElement.data(modPop.opts.dataAttribute);
				if (targ && targ.length> 0) {
					if ($(targ).length > 0) {
						return $(targ);
					} else if (targ.substring(0,1) != '#' && $('#' + targ).length > 0) {
						return $('#' + targ);
					}
				}				
			}

			var href = jElement.attr('href');
			if (href && href.length> 0) {
				if ($(href).length > 0) {
					return $(href);
				} else if (href.substring(0,1) != '#' && $('#' + href).length > 0) {
					return $('#' + href);
				}
			}	
		}

		this.showModal = function(element) {
			var content = this.ModalContent(element);
			if (content) {
				$('.' + modPop.opts.modalClassSelect).removeClass(modPop.opts.modalClassSelect); //So only the active modal has the class.  This helps with closing/animating the correct element.
				content.addClass(modPop.opts.modalClassSelect);

				if (!modPop.opts.modal) {
					content.click(function(e) {
						modPop.hideModal(this);
					})
				}
				if (modPop.opts.debug) {window.console && console.log('show modal')}

				if (modPop.transitionIn) {
					modPop.transitionIn(modPop, content)
				}

				$(content).find(this.opts.closeSelector).each(function(index, ele) {
					if (!$(this).data('clickDefined')) {
						$(this).data('clickDefined', true);
						$(this).click(function(e) {
							modPop.hideModal();
						})
					}
					

				})


			}
		}
	}
 
	$.fn.setupModal = function(options){
		var modPop = new stepframeModal(options);

		return this.each(function(){
			$(this).click(function(e) {
				modPop.showModal(this);
			})
		});
	}
 
	$.fn.showModal = function(options){
		var modPop = new stepframeModal(options);

		return this.each(function(){		
			modPop.showModal(this);
		});
	}

	var sffadeInEffect = function(modPop, content) {
		content.fadeIn(modPop.opts.transitionInTime);
	}

	var sfslideDownEffect = function(modPop, content) {
		content.css('top', -1 * content.height() + 'px').show();
		content.animate({'top': 0}, modPop.opts.transitionInTime);
	}
 
	var sffadeOutEffect = function(modPop, content) {
		content.fadeOut(modPop.opts.transitionOutTime);
	}

	var sfslideUpEffect = function(modPop, content) {
		content.animate({'top': -1.5 * content.height()}, modPop.opts.transitionOutTime);
	}

	var sfshowInEffect = function(modPop, content) {
		content.show();
	}

	var sfshowOutEffect = function(modPop, content) {
		content.hide();
	}

})(jQuery);
