import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Footer {
    constructor(){
        this.footer = {
            el: document.querySelector('footer'),
            content: document.querySelectorAll('footer h6'),
        };

        this.section = {
            last: document.querySelector('section:last-of-type'),
        };
    }

    init(){
        this.set();
        this.animation();
    }

    set = () => {
        // Set using GSAP
    }

    animation = () => {
        // Animate using GSAP
    }
}
