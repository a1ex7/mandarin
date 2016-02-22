function projSettings() {
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
	}
	else {
		$('.serv-ul li').css({
			'width': '100%'
		});
	}
}
function aside() {
	if ( $('.menu-open').is(':hidden') ) {
		var aside = $('aside').detach();
		$('.content').append(aside);
	}
	else {
		var aside = $('aside').detach();
		$('.content').prepend(aside);
	}
}
function walletList() {
	$('.wallet-b .list li').css({
		'margin-right': ($('.wallet-b .list').width()-$('.wallet-b .list li').width()*4)/3-3+'px'
	});
	$('.wallet-b .list li:nth-child(4n)').css({
		'margin-right': '-20px'
	});
}
function walletFavorite() {
	if ( $('.menu-open').is(':hidden') ) {
		$('.wallet-b .favorite li').css({
			'margin-right': ($('.wallet-b .favorite').width()-$('.wallet-b .favorite li').outerWidth()*6)/5-3+'px'
		});
		$('.wallet-b .favorite li:nth-child(6n)').css({
			'margin-right': '-20px'
		});
	} else {
		$('.wallet-b .favorite li').css({
			'margin-right': ($('.wallet-b .favorite').width()-$('.wallet-b .favorite li').outerWidth()*3)/2-3+'px'
		});
		$('.wallet-b .favorite li:nth-child(3n)').css({
			'margin-right': '-20px'
		});
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
			$(this).parent('.choice').siblings('input').show();
		} else {
			$(this).find('[data-val="0"]').addClass('active').siblings().removeClass('active');
			$(this).parent('.choice').siblings('input').hide();
		}
	});
	$('.choice .switch-element em').bind('click', function() {
		if ( $(this).attr('data-val') == 1 ) {
			$(this).siblings('input[type="checkbox"]').prop('checked', true);
			$(this).parents('.choice').siblings('input').show();
		} else {
			$(this).siblings('input[type="checkbox"]').prop('checked', false);
			$(this).parents('.choice').siblings('input').hide();
		}
		$(this).addClass('active').siblings().removeClass('active');
	});
	if ( $('.user-s > .tab-sel').is(':visible') ) {
		$('.form[data-tab="'+$('.user-s > .tab-sel select').val()+'"]').show().siblings('.form').hide();
	}
	if ( $('.user-s > .tab-sel').length > 0 ) {
		$('select').change(function() {
			$('.form[data-tab="'+$(this).val()+'"]').show().siblings('.form').hide();
		});
	}
	if ( $('aside').length > 0 ) {
		aside();
	}
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile-v');
	}
	$('.mobile-v .form-progress h4').bind('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('opened');
	});
	if ( $('.wallet-b .list').length > 0 ) {
		walletList();
	}
	if ( $('.wallet-b .favorite').length > 0 ) {
		walletFavorite();
		//$('.wallet-b .favorite').sortable();
	}
	if ( $('.transfer-b h1 span').length > 0 ) {
		$('.transfer-b h1 span img').each(function() {
			$(this).css({
				'margin-top': ($(this).parent().height()-$(this).attr('height'))/2+'px',
				'opacity': '1'
			});
		});
	}
	$('.card-l h2').bind('click', function(e) {
		e.preventDefault();
		if ( $(this).hasClass('hide') ) {
			$(this).removeClass('hide');
			$(this).siblings('ul').stop().hide();
		} else {
			$(this).addClass('hide');
			$(this).siblings('ul').stop().show();
		}
	});
	if ( $('.input.num').length > 0 ) {
		$('.transfer-b .form p input.num').number(true, 2, '.', '');
	}
	$('.calc-b .slide > div').each(function() {
		var t = $(this);
		t.slider({
			min: eval(t.attr('data-min')),
			max: eval(t.attr('data-max')),
			step: eval(t.attr('data-step')),
			value: eval(t.attr('data-default')),
			range: 'min',
			slide: function(event, ui) {
				if ( t.siblings('span.sum').length > 0 ) {
					var v = ui.value.toString();
					t.siblings('span.sum').html(v.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+'<em>С</em>');
				}
				if ( t.siblings('span.per').length > 0 ) {
					if ( ui.value == 1 ) {
						a = 'месяц'
					} else if ( ui.value >=5 ) {
						a = 'месяцев'
					} else {
						a = 'месяца'
					}
					t.siblings('span.per').html(ui.value+' '+a);
				}
				t.siblings('span').attr('data-val', ui.value);
				if ( $('.finance-t').length > 0 ) {
					$('.finance-t h4 span').html(Math.floor($('.slide span.sum').attr('data-val')/$('.slide span.per').attr('data-val')).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+'<em>С</em>');
				}
			}
		});
		if ( t.siblings('span.sum').length > 0 ) {
			t.siblings('span.sum').html(t.attr('data-default').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+'<em>С</em>');
		}
		if ( t.siblings('span.per').length > 0 ) {
			if ( eval(t.attr('data-default')) == 1 ) {
				a = 'месяц'
			} else if ( eval(t.attr('data-default')) >=5 ) {
				a = 'месяцев'
			} else {
				a = 'месяца'
			}
			t.siblings('span.per').html(t.attr('data-default')+' '+a);
		}
		t.siblings('span').attr('data-val', eval(t.attr('data-default')));
		if ( $('.finance-t').length > 0 ) {
			$('.finance-t h4 span').html(Math.floor($('.slide span.sum').attr('data-val')/$('.slide span.per').attr('data-val')).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+'<em>С</em>');
		}
		t.siblings('input').focusin(function() {
			var s = $(this).siblings('.val');
			s.css({
				'color': 'transparent'
			});
			$(this).attr('data-val', s.attr('data-val')).css({
				'color': '#333333'
			}).val(s.attr('data-val').toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		});
		t.siblings('input').focusout(function() {
			var s = $(this).siblings('.val');
			s.css({
				'color': '#333333'
			});
			$(this).css({
				'color': 'transparent'
			});
		});
		t.siblings('input').keyup(function() {
			$(this).attr('data-val', $(this).val().replace(/\s/g, ''));
			$(this).val($(this).attr('data-val').toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			$(this).siblings('.val').attr('data-val', $(this).attr('data-val'));
			$(this).siblings('.val').html($(this).attr('data-val').toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+'<em>С</em>');
			t.slider('value', $(this).attr('data-val'));
		});
	});
	if ( $('.finance-t').length > 0 ) {
		$('.wallet-b').css({
			'margin-bottom': '23px'
		});
	}
	if ( $('.invest-t').length > 0 ) {
		$('.wallet-b').css({
			'margin-bottom': '53px'
		});
	}
	$('.calc-b .invest-t .category ul li').bind('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass();
	}).filter(':first').click();
});
$(window).resize(function() {
	zoom();
	if ( $('.serv-ul').length > 0 ) {
		servUL();
	}
	if ( $('.projects-m td div').length > 0 ) {
		projSettings();
	}
	if ( $('aside').length > 0 ) {
		aside();
	}
	if ( $('.wallet-b .list').length > 0 ) {
		walletList();
	}
	if ( $('.wallet-b .favorite').length > 0 ) {
		walletFavorite();
	}
});