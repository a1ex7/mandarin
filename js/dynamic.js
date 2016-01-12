﻿function projSettings() {
	var max = 0;
	$('.projects-m td div').each(function() {
		var w = $(this).width(); 
		max = w > max ? w : max;
	});
	var td = $('.projects-m td:nth-child(2)').width();
	var diff = td-max;
	if ( diff < 0 ) {
		diff = 0;
	}
	$('.projects-m td .settings').css({
		'right': diff+'px'
	});
}
function zoom() {
	if ( $(window).width() < $('.wrapper').width() ) {
		var ratio = $(window).width()/$('.wrapper').width();
		if ( $('.menu-open').is(':hidden') ) {
			$('.wrapper').css({
				'margin-bottom': -(($('.wrapper').height()-($('.wrapper').height()*ratio))+$('.clear').height()*ratio)+'px'
			});
		}
		else {
			$('.wrapper').css({
				'margin-bottom': -($('.wrapper').height()-($('.wrapper').height()*ratio))+'px'
			});
		}
		$('.wrapper, footer').css({
			'-webkit-transform': 'scale('+ratio+')',
			'-moz-transform': 'scale('+ratio+')',
			'transform': 'scale('+ratio+')'
		});
	}
	else {
		var ratio = 1;
		$('.wrapper, footer').css({
			'-webkit-transform': 'scale(1)',
			'-moz-transform': 'scale(1)',
			'transform': 'scale(1)'
		});
		$('.wrapper').css({
			'margin-bottom': '0'
		});
	}
	if ( $('.menu-open').is(':hidden') ) {
		var nav = $('nav').detach();
		$('.content').prepend(nav);
		$('nav').css({
			'-webkit-transform': 'scale(1)',
			'-moz-transform': 'scale(1)',
			'transform': 'scale(1)'
		});
		$('.core').css({
			'padding-bottom': '0'
		});
	}
	else {
		var nav = $('nav').detach();
		$('body').prepend(nav);
		$('.core').css({
			'padding-bottom': $('nav').height()+'px'
		});
		$('nav').css({
			'-webkit-transform': 'scale('+$(window).width()/504+')',
			'-moz-transform': 'scale('+$(window).width()/504+')',
			'transform': 'scale('+$(window).width()/504+')'
		});
		$('.core').css({
			'padding-bottom': $(window).width()/504*100/ratio+'px'
		});
	}
}
function servUL() {
	if ( $('.menu-open').is(':hidden') ) {
		$('.serv-ul li').css({
			'width': ($('.core').outerWidth()-80)/3+'px'
		});
		var aside = $('aside').detach();
		$('.content').append(aside);
	}
	else {
		$('.serv-ul li').css({
			'width': '100%'
		});
		var aside = $('aside').detach();
		$('.content').prepend(aside);
	}
}
$(document).ready(function() {
	if ( $('.card-l .progress-l').length > 0 ) {
		$('.card-l .progress-l').each(function() {
			$(this).prepend('<p class="val-l">'+$(this).attr('data-l')+' <em>С</em></p>');
			if ( $(this).hasClass('invest') ) {
				$(this).prepend('<p class="val-r">'+$(this).attr('data-r')+'%</p>');
			}
			if ( $(this).hasClass('limit') ) {
				$(this).prepend('<p class="val-r">'+$(this).attr('data-r')+' <em>С</em></p>');
			}
			$(this).find('div').append('<em style="width:'+$(this).attr('data-p')+'%"></em>');
		});
	}
	$('.card-l > li > ul > li').hover(
		function() {
			$(this).append('<p class="bubble">'+$(this).attr('data-tip')+'</p>');
			$('p.bubble').css({
				/*'left': $(this).offset().left+$(this).width()/2+'px',
				'top': $(this).offset().top+'px',*/
				'margin-left': -$('p.bubble').outerWidth()/2+'px',
				'opacity': '1'
			});
		},
		function() {
			$('p.bubble').remove();
		}
	);
	if ( $('.serv-ul').length > 0 ) {
		servUL();
	}
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	zoom();
	$('.projects-s ul li a').bind('click', function(e) {
		e.preventDefault();
		$('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	if ( $('input.switch[type="checkbox"]').length > 0 ) {
		$('input.switch[type="checkbox"]').onoff();
		$('input.switch[type="checkbox"]').each(function() {
			if ( $(this).prop('checked') == true ) {
				$(this).parent().addClass('enabled');
			}
		});
		$('input.switch[type="checkbox"]').change(function() {
			if ( $(this).prop('checked') == true ) {
				$(this).parent().addClass('enabled');
			}
			else {
				$(this).parent().removeClass('enabled');
			}
		});
		$('.switch-c').each(function() {
			var t = $(this);
			if ( t.find('input[type="text"]').val().length > 0 ) {
				t.find('input[type="checkbox"]').prop('checked', true);
				t.find('.switch').addClass('enabled');
			}
			else {
				t.find('input[type="checkbox"]').prop('checked', false);
				t.find('.switch').removeClass('enabled');
			}
		});
		$('.switch-c input[type="text"]').bind('change keyup', function() {
			var t = $(this).parents('.switch-c');
			if ( $(this).val().length > 0 ) {
				t.find('input[type="checkbox"]').prop('checked', true);
				t.find('.switch').addClass('enabled');
			}
			else {
				t.find('input[type="checkbox"]').prop('checked', false);
				t.find('.switch').removeClass('enabled');
			}
		});
		$('input.switch[type="checkbox"]').change(function() {
			var e = $(this);
			var t = $(this).parents('.switch-c').find('input[type="text"]');
			setTimeout(function() {
				if ( e.prop('checked') == true ) {
					t.focus();
				}
				else {
					t.val('');
				}
			}, 200);
		});
	}
	if ( $('.projects-m td div').length > 0 ) {
		projSettings();
	}
	$('.user-s ul li a').bind('click', function(e) {
		e.preventDefault();
		if ( $(this).attr('href') == 1 ) {
			$('.form-progress').addClass('active');
		} else {
			$('.form-progress').removeClass('active');
		}
		$('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	$('.user-s .form h4.toggle').bind('click', function(e) {
		e.preventDefault();
		var t = $(this).next('.group');
		if ( t.is(':hidden') ) {
			t.stop().slideDown(200);
			$(this).removeClass('hidden');
		} else {
			t.stop().slideUp(200);
			$(this).addClass('hidden');
		}
	});
	$('.user-s .form h4 span.add').bind('click', function(e) {
		e.stopPropagation();
		alert('Алерт на создание дубликата группы');
	});
	$('.form-progress .switch-element em').bind('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass();
		var t = $('.user-s .user-type[data-usertype="'+$(this).attr('data-type')+'"]');
		t.stop().show().siblings().hide();
	}).filter(':first').click();
	$('.choice .switch-element').each(function() {
		if ( $(this).find('input[type="checkbox"]').prop('checked') == true ) {
			$(this).find('[data-val="1"]').addClass('active').siblings().removeClass('active');
		} else {
			$(this).find('[data-val="0"]').addClass('active').siblings().removeClass('active');
		}
	});
	$('.choice .switch-element em').bind('click', function() {
		if ( $(this).attr('data-val') == 1 ) {
			$(this).siblings('input[type="checkbox"]').prop('checked', true);
		} else {
			$(this).siblings('input[type="checkbox"]').prop('checked', false);
		}
		$(this).addClass('active').siblings().removeClass('active');
	});
});
$(window).resize(function() {
	zoom();
	if ( $('.serv-ul').length > 0 ) {
		servUL();
	}
	if ( $('.projects-m td div').length > 0 ) {
		projSettings();
	}
});