import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Header {
    constructor(){
        this.header = {
            el: document.querySelector('header'),
            content: document.querySelectorAll('header nav'),
        };

        this.footer = document.querySelector('footer');

        this.company = document.getElementById('company');
    }

    init(){
        if(Sniff.features.mobile){
            // this.set();
            // this.animation();
        }
    }

    set = () => {
        // Set using GSAP
    }

    animation = () => {
        // Animate using GSAP
    }
}
