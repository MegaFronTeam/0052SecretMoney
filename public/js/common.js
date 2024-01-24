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
			customSelect.querySelector('.custom-select__head').addEventListener('click', () => {
				customSelect.classList.toggle('active');
				
			});
			customSelect.querySelectorAll('.custom-select__dropdown-item').forEach((item) => {
				item.addEventListener('click', () => {
					if(customSelect.querySelector('span').classList.contains('placholder')) {
						let placeholder = customSelect.querySelector('.placholder').innerHTML;
						customSelect.querySelector('.custom-select__head').innerHTML = `
							<span class="placholder">${placeholder}</span>
							<p>${item.innerHTML}</p>
						`;
					} else {
						customSelect.querySelector('.custom-select__head').innerHTML = item.innerHTML;
					}
        });
			});
			let selectSearch = customSelect.querySelector('.custom-select__search');
			if(selectSearch) {
				customSelect.addEventListener('keyup', () => {
					var filter, ul, li, a, i;
					filter = selectSearch.querySelector('input').value.toUpperCase();
					let div = customSelect.querySelector(".custom-select__dropdown");
					a = div.querySelectorAll(".custom-select__dropdown-item");
					for (i = 0; i < a.length; i++) {
						let txtValue = a[i].textContent || a[i].innerText;
						if (txtValue.toUpperCase().indexOf(filter) > -1) {
							a[i].style.display = "";
						} else {
							a[i].style.display = "none";
						}
					}
				});
			}
		})

		document.addEventListener('click', (event) => {
			let customSelectTarget = event.target.closest('.custom-select--js');
			let customSelectSearchTarget = event.target.closest('.custom-select--js .custom-select__search');
			let customSelectItemTarget = event.target.closest('.custom-select--js .custom-select__dropdown-item');
	
			if(!customSelectTarget && !customSelectSearchTarget || customSelectItemTarget) {
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
			window.addEventListener('resize', () => {
				if (window.matchMedia('(min-width: 992px)').matches) {
					mobileFilter.classList.remove('active');
					document.body.classList.remove('fixed-filter');
				};
			},
				{ passive: true },
			);
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
		chartDoughnutJsArr.forEach((chartDoughnutJs, index) => {
			
			const getOrCreateLegendList = (chart, id) => {
				const legendContainer = chartDoughnutJs.parentElement.nextElementSibling;
				let listContainer = legendContainer.querySelector('ul');
			
				if (!listContainer) {
					listContainer = document.createElement('ul');
			
					legendContainer.appendChild(listContainer);
				}
			
				return listContainer;
			};
			
			const htmlLegendPlugin = {
				id: 'htmlLegend',
				afterUpdate(chart, args, options) {
					
					const ul = getOrCreateLegendList(chart, options.containerID);
					// Remove old legend items
					while (ul.firstChild) {
						ul.firstChild.remove();
					}
			
					// Reuse the built-in legendItems generator
					const items = chart.options.plugins.legend.labels.generateLabels(chart);

					const itemsNums = chart.legend.chart.config._config.data.datasets[0].data;
					let itemsSum = 0;
					itemsNums.forEach((item) => itemsSum += item);

					items.forEach((item, index) => {
						const li = document.createElement('li');
			
						li.onclick = () => {
							const {type} = chart.config;
							if (type === 'pie' || type === 'doughnut') {
								chart.toggleDataVisibility(item.index);
							} else {
								chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
							}
							chart.update();
						};
			
						// Color box
						const boxSpan = document.createElement('span');
						boxSpan.style.background = item.fillStyle;
						boxSpan.style.borderColor = item.strokeStyle;
						boxSpan.style.borderWidth = item.lineWidth + 'px';
			
						// Text
						const textContainer = document.createElement('p');
						textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

						// Precent
						const precentContainer = document.createElement('span');
						precentContainer.innerHTML = ` ${(itemsNums[index] / itemsSum * 100).toFixed(2)} %`;
						
						const text = document.createTextNode(item.text);
						textContainer.appendChild(text);
						textContainer.appendChild(precentContainer);
						
						li.appendChild(boxSpan);
						li.appendChild(textContainer);
						ul.appendChild(li);
					});
				}
			};

			const dataObj = [
				{
					labels: [
						'Whoosh',
						'ИранНефть',
						'Ростелеком',
						'Белуга',
						'Компания',
						'МТС',
						'Газпромбанк'
					],
					datasets: [{
						// label: 'My First Dataset',
						data: [10, 20, 15, 5, 50, 100, 123],
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
				},
				{
					labels: [
						'Металургия',
						'Телеком',
						'Финансы',
						'Общественное питание'
					],
					datasets: [{
						// label: 'My First Dataset',
						data: [10, 20, 15, 5],
						backgroundColor: [
							'#A2E48A',
							'#72AAFF',
							'#F43ECC',
							'#7DF9BD',
						],
						hoverOffset: 4,
					}],
				}
			];
			
			new Chart(chartDoughnutJs, {
				type: 'doughnut',
				data: dataObj[index],
				options: {
					aspectRatio: 1,
					responsive: true,
					borderWidth: 0,
					radius: '101',
					cutout: '85%',
					plugins: {
						htmlLegend: {
							containerID: 'legend-container',
						},
						legend: {
							display: false,
						}
					},
				},
				plugins: [htmlLegendPlugin],
			});

		})
	}
		
	let passCode = document.querySelectorAll('.passcode-js');

	if (passCode.length > 0) {
		passCode.forEach((item, index) => {
			item.addEventListener('input', (e) => {
				if (index < passCode.length - 1) {
					if(!e.data == '') {
						passCode[index + 1].focus();
					}
				}
			})
		})
	}

	let dataPickers = document.querySelectorAll('.data-picker-wrap');
	if (dataPickers.length > 0) {
		let position = 'bottom left';
		if (window.matchMedia('(max-width: 1200px)').matches) {
			position = 'top left';
		}
		for (let dataPickerEll of dataPickers) {
			let dataPicker = dataPickerEll.querySelector('.data-picker--js');

			new AirDatepicker(dataPicker, {
				range: true,
				multipleDatesSeparator: ' - ',
				autoClose: false,
				// inline: true,
				container: dataPickerEll,
				position: position,
				navTitles: {
					days: 'yyyy <i>MMMM</i>',
				},
			});
		}
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