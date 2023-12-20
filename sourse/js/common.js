"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	let uploadavatarArr = document.querySelectorAll('.avatar-js');
	if (uploadavatarArr.length > 0){
		uploadavatarArr.forEach((uploadavatar) => {
			let inputFile = uploadavatar.querySelector('.input-upload');
			let img = uploadavatar.querySelector('img');
			inputFile.addEventListener('change', () => {
				var reader = new FileReader();
				reader.onload = function(){ img.src = reader.result;}
				reader.readAsDataURL(event.target.files[0]);
			});
		})
	}

	let customSelects = document.querySelectorAll('.custom-select--js');

	if (customSelects.length > 0) {
		customSelects.forEach((customSelect) => {
			customSelect.addEventListener('click', () => {
				customSelect.classList.toggle('active');
			})
		})

		document.addEventListener('click', (event) => {
			let customSelectTarget = event.target.closest('.custom-select--js');
	
			if(!customSelectTarget) {
				customSelects.forEach((customSelect) => {
					customSelect.classList.remove('active');
				})
			}
		})
	}

	let mobileFilter = document.querySelector('.sDeal__filter-mobile');
	if(mobileFilter) {
		document.addEventListener('click', (event) => {
			let mobileFilterBtnTarget = event.target.closest('.sDeal__filter-btn');
			let mobileFilterTarget = event.target.closest('.sDeal__filter-mobile');
			let mobileFilterCloseTarget = event.target.closest('.sDeal__filter-mobile .close');
			let mobileFilterInnerBtnTarget = event.target.closest('.sDeal__filter-mobile .btn');
	
			if(!mobileFilterTarget || mobileFilterCloseTarget || mobileFilterInnerBtnTarget) {
				mobileFilter.classList.remove('active');
				document.body.classList.remove('fixed-filter');
			}
			if(mobileFilterBtnTarget) {
				mobileFilter.classList.add('active');
				document.body.classList.add('fixed-filter');
			}
		});
	}

	new hcSticky('.sDeal__deal-sticky--js', {
    stickTo: '.sDeal',
		mobileFirst: true,
		top: 16,
		responsive: {
			998: {
				disable: true
			}
		}
  });

	let chartDoughnutJsArr = document.querySelectorAll('.chart-doughnut-js');

	if (chartDoughnutJsArr.length > 0) {
		chartDoughnutJsArr.forEach((chartDoughnutJs) => {
			const data = {
				labels: [
					'Whoosh',
					'ИранНефть',
					'Ростелеком',
					'Белуга',
					'Компания',
					'МТС',
					'Газпромбанк'
				],
				// labels: chartDoughnutJs.dataset.labels,
				datasets: [{
					// label: 'My First Dataset',
					data: [300, 200, 50, 20, 30, 100, 150],
					backgroundColor: [
						'#A2E48A',
						'#72AAFF',
						'#F43ECC',
						'#7DF9BD',
						'#0D6CA1',
						'#7DF9BD',
						'#F97D7D'
					],
					hoverOffset: 4,
				}],
				options: {
					borderWidth: '12px',
				}
			};
			
			new Chart(chartDoughnutJs, {
				type: 'doughnut',
				data: data,
				options: {
					responsive: true,
					borderWidth: 0,
					radius: '202',
					plugins: {
						legend: {
							position: 'right',
						},
					}
				},
			});
		})
	}
		
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }