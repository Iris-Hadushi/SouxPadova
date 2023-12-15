import "lightgallery.js";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { app } from '../../utils/store';

gsap.registerPlugin(ScrollTrigger);

export default class Gallery{
    constructor(){
        this.header = document.querySelector('header');

        this.gallery = {
            container: document.getElementById('gallery'),
            image: document.querySelectorAll('#gallery img'),
        };

        this.lightbox = {
            container: document.getElementById('lightbox'),
            toggler: document.querySelectorAll('#lightbox li'),
        };
    }

    init() {
        if(this.gallery.container){
            this.toggle();
        }
    }

    toggle = () => {
        document.querySelector('body').classList.add('lg-casestudy');

        lightGallery(this.lightbox.container, {
            mode: 'lg-fade',
            startClass: 'lg-start-fade',
            keypress: true,
            controls: true,
            download: false,
            counter: false,
            enableDrag: false,
            enableTouch: false,
            enableSwipe: true,
            useLeft: true,
            hideControlOnEnd: true,
        });


        this.gallery.image.forEach((toggler) => {
            toggler.addEventListener('click', (e) => {
                var target = e.target.getAttribute('src');
                this.lightbox.container.querySelector('[data-src="' + target + '"').click();
            });
        });

        this.lightbox.container.addEventListener('onBeforeOpen', () => {
            this.header.classList.add('lg-active');
            document.querySelector('body').classList.toggle('overflow-hidden');
        });

        this.lightbox.container.addEventListener('onBeforeClose', () => {
            this.header.classList.remove('lg-active');
            document.querySelector('body').classList.toggle('overflow-hidden');
        });
    }

    animation = () => {
        // Animate using GSAP
    }
}
