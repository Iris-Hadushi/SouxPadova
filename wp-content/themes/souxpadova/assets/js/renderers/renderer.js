import Sniffer from 'snifferjs';

// store
import { app } from '../utils/store';

import Carousel from '../modules/carousel/carousel';
import Filters from '../modules/filters/filters';
import Forms from '../modules/forms/forms';
import Footer from '../modules/footer/footer';
// import Gallery from '../modules/gallery/gallery';
import Header from '../modules/header/header';
import Maps from '../modules/maps/maps';
import Scroll from '../modules/scroll/scroll'; // Alert : Uses jQuery
// import Video from '../modules/video/video';
export default class Components {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.filters = document.getElementById('filters');
        this.footer = document.querySelector('footer');
        this.gallery = document.getElementById('gallery');
        this.header = document.querySelector('header');
        this.map = document.getElementById('map');
        this.menu = document.getElementById('main-menu');
        this.video = document.querySelector('video');
        this.modal = document.querySelector('.contact-modal');
        this.page = {
            test: document.querySelector('.page-test'),
        }

        this.post = {
            test: document.querySelector('.page-test-article'),
        }
    }

    init(){
        app.scroll = new Scroll();
        app.scroll.init();

        if(this.header){
            this.header = new Header();
            this.header.init();
        }

        if(this.footer){
            this.footer = new Footer();
            this.footer.init();
        }

        if(this.carousel){
            this.carousel = new Carousel();
            this.carousel.init();
        }

        if(this.filters){
            this.filters = new Filters();
            this.filters.init();
        }
        
        if(this.form){
            this.form = new Forms();
            this.form.init();
        }

        if(this.map){
            this.map = new Maps();
            this.map.init();
        }

        if(this.modal){
            this.modal = new Modal();
            this.modal.init();
        }
    }

    destroy = () => {
        console.log('Destroy Components')
        // Destroy Components using JS
    }
}
