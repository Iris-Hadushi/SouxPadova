import Swiper from 'swiper/bundle';

export default class Carousels {
	constructor(){
		this.carousel = {
			multiple_items: document.querySelectorAll('.carousel[data-carousel="multiple-items"]'),
            grid_items: document.querySelectorAll('.carousel[data-carousel="grid-items"]'),
		};
	}

	init() {
		if(this.carousel.multiple_items) { this.multipleItems(); }
		if(this.carousel.grid_items) { this.gridItems(); }
	}

    multipleItems = () => {
        this.carousel.multiple_items.forEach(carousel => {
            var items = carousel.querySelectorAll('.item'),
                scrollbar = carousel.querySelector('.scrollbar');

            if(items) { items.forEach(slide => { slide.classList.add('swiper-slide')}); }

            if(scrollbar) { 
                scrollbar.classList.add('swiper-scrollbar');
                carousel.classList.add('pb-3');
            }

            carousel.parentNode.classList.add('overflow-hidden');

            var swiper = new Swiper(carousel, {
                slidesPerView: 1,
                spaceBetween: 4,
                createElements: true,
                setWrapperSize: true,
                wrapperClass: 'swiper-wrapper justify-content-end',
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
                // pagination: {
                //     el: carousel.querySelector('.pagination'),
                //     clickable: true,
                // },
                scrollbar: {
                    el: carousel.querySelector('.scrollbar'),
                    draggable: true,
                    // hide: true,
                },
                mousewheel: {
                    // invert: true,
                    forceToAxis: true,
                },
                breakpoints: {
                    // when window width is >= 480px
                    480: {
                      slidesPerView: 2,
                    },
                    // when window width is >= 640px
                    640: {
                      slidesPerView: carousel.getAttribute('data-items'),
                    }
                  }
            });
        })
    } 

    gridItems = () => {
        this.carousel.grid_items.forEach(carousel => {
            var items = carousel.querySelectorAll('.item');
            
            if(items) { items.forEach(slide => { slide.classList.add('swiper-slide')}); }
            
            
            var wrapper = '<div class="swiper-wrapper">' + carousel.innerHTML + '<div class="scrollbar"></div></div>';
            
            carousel.innerHTML = wrapper;
            carousel.parentNode.classList.add('overflow-hidden');
            
            var scrollbar = carousel.querySelector('.scrollbar');

            if(scrollbar) { 
                scrollbar.classList.add('swiper-scrollbar');
                carousel.append(scrollbar);
                carousel.querySelector('.scrollbar').remove();
                carousel.classList.add('pb-3');
            }

            var swiper = new Swiper(carousel, {
                slidesPerView: 1,
                grid: {
                    fill: 'row',
                    rows: 1,
                },
                spaceBetween: 4,
                scrollbar: {
                    el: carousel.querySelector('.scrollbar'),
                    draggable: true,
                    // hide: true,
                },
                mousewheel: {
                    // invert: true,
                    forceToAxis: true,
                },
                breakpoints: {
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: carousel.getAttribute('data-items'),
                        grid: {
                            fill: 'row',
                            rows: 2,
                        },
                    }
                  }
            });
        })
    } 
}
