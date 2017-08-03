(function ($, window, document, undefined) {

  'use strict';

  var menuAPI;

  
  $(function () {

	  // Скролл страницы по главам
	  function scrollPage() {
	  	// if ($('#mobile-detect').is(':visible')) {
	  	// 	return;
	  	// }

	  	$('#fullpage').fullpage({
				scrollOverflow: true,
				navigation: true,
				navigationPosition: 'right',
				navigationTooltips: [
					'Intro',
					'За кулисами истории 1', 
					'За кулисами истории 2', 
					'За кулисами истории 3', 
					'За кулисами истории 4', 
					'За кулисами истории 5', 
					'За кулисами истории 6',
					'За кулисами истории 7'],
				afterRender: function() {
					$('#fp-nav').delay(300).fadeIn(300);
					
					$('#fp-nav ul li').each(function() {
						var span = $(this).find('a span');
						span.text($(this).index());
					})
				},
				afterLoad: function(anchorLink, index) {
					if(index != 1) {
						$('.header').removeClass('hide');
					} else {
						if(!$('.header').hasClass('hide')) {
							$('.header').addClass('hide');
						}
					}
				},
				onLeave: function(index, nextIndex, direction){
					if(direction == 'up') {
						if(nextIndex == 1) {
							if(!$('.header').hasClass('hide')) {
								$('.header').addClass('hide');
							}
						}
					}
					$('.section').removeClass('next');
					if(direction == 'down') {
						$('.section').eq(nextIndex).addClass('next');
					} else {
						if(nextIndex != 1) {
							$('.section').eq(nextIndex).addClass('next');
						}
					}
				}
			});
	  }


	  // Установка свойств списка статей
	  function articleProperty() {
	  	$('.articles__list').each(function() {
				var itemCount = $(this).find('.articles__item').length,
						delta = itemCount % 4;
				$(this).find('.articles__item').each(function() {
					if($(this).index() >= itemCount - delta) {
						$(this).addClass('last-row');
					}
				})
			});
	  }
		

		// Настройка шрифтов
		function fontSettings() {
			$('.font-plus').on('click', function(e) {
				e.preventDefault();
				var fontSize = parseInt($('.article__right').css('font-size').replace('px', ''));
				if(fontSize < 72)
					fontSize += 1;
				$('.article__right').css('font-size', fontSize + 'px');
			})

			$('.font-minus').on('click', function(e) {
				e.preventDefault();
				var fontSize = parseInt($('.article__right').css('font-size').replace('px', ''));
				if(fontSize > 7)
					fontSize -= 1;
				$('.article__right').css('font-size', fontSize + 'px');
			})

			$('.font-normal').on('click', function(e) {
				e.preventDefault();
				$('.article__right').css('font-size', '15px');
			})
		}

		// Меню
		function menu() {
			$(".menu").mmenu({
				onClick: {
		      close: false
		    },
		    navbar: {
			    title: "Оглавление"
			  },
			  slidingSubmenus: false
			});
			$('#mm-blocker').remove();

			menuAPI = $(".menu").data( "mmenu" );
			$('.menu-button').on('click', function(e) {
				e.preventDefault();
				if($(this).hasClass('open')) {
					menuAPI.close();
					$('#fp-nav').removeClass('beyond');
				} else {
					menuAPI.open();
					$('#fp-nav').addClass('beyond');
				}
				if($(this).hasClass('open')) {
					$('.menu-button').removeClass('open');
				} else {
					$('.menu-button').addClass('open');
				}
			})

			$('.menu__caption').on('click', function(e) {
				e.preventDefault();
				var menu = $(this).closest('.menu__item');

				$('.menu__item.mm-vertical').each(function() {
					if($(this).index() != menu.index()) {
					}
				})

				if(menu.hasClass('mm-opened')) {
					menu.find('.mm-vertical').slideToggle(500);
					setTimeout(function() {
						menu.removeClass('mm-opened');
					}, 500)
				}
				else {
					menu.addClass('mm-opened');
					menu.find('.mm-vertical').hide().removeClass('mm-hidden');
					setTimeout(function() {
						menu.find('.mm-vertical').slideToggle(500);
					}, 100)
				}		
			})
		}

		// Галерея изображений
		function accordion() {
			$('.article__gallery-list').AccordionImageMenu({
				'position': 'vertical',
				'width':346,
				'openItem':0,
				// 'effect': 'easeOutQuint',
				'duration': 100,
				'openDim': 232,
				'closeDim': 123
			});
		}

		// Модальные окна
		function popups() {
			$('a[href="#popup-article"]').magnificPopup({
				type: 'inline',
				// fixedContentPos: true,
				// fixedBgPos: true,
				// overflowY: 'auto',
				closeBtnInside: true,
				preloader: false,			
				midClick: true,
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in',
				closeMarkup: '<button title="Закрыть (Esc)" type="button" class="mfp-close"></button>',
				callbacks: {
					open: function() {
					},
					close: function() {
			    }
				}
			});
		}

		// Минимальное разрешение
		function minWidth() {
			 if ($('#mobile-detect').is(':visible')) {
				var scale = '0.65';
				$('meta[name="viewport"]').attr('content','width=400; initial-scale='+ scale +'; maximum-scale=1.0; minimum-scale='+ scale +'; user-scalable=on; target-densityDpi=device-dpi');
		  }
		}

		$(".loader_Inner, .loader").show(); 
		$(".loader_Inner").fadeOut(); 
		$(".loader").delay(300).fadeOut("slow");

		popups();
		fontSettings();
		menu();
		accordion();
		scrollPage();
		minWidth();

		$(document).on('click', '.article__gallery-link',  function(e) {
			e.preventDefault();
		})

		$('.section__caption').on('click', function() {
			var index = $(this).closest('.section').index(),
					curIndex = $('.section.active').index();
			if (index == curIndex)
				return;
			if(index > curIndex) {
				$.fn.fullpage.moveSectionDown();
			} else {
				$.fn.fullpage.moveSectionUp();
			}
		})

		$('.article-item__desc').equalHeights();
		$('.section__top').equalHeights();

  });

})(jQuery, window, document);