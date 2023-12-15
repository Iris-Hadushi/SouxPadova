import { app } from '../utils/store';
import { each } from 'lodash';

import gsap from 'gsap';
class Modal{
    create(component){
        app.footer = document.querySelector('footer[data-footer]');

        var modal = document.createElement('div'),
            button = document.createElement('button'),
            section = document.createElement('section'),
            title = document.createElement('span'),
            carousel = document.createElement('div'),
            wrapper = document.createElement('div'),
            player = document.createElement('video');

        this.modal = {
            container: modal,
            button: button,
            section: section,
            title: title,
            carousel: carousel,
            wrapper: wrapper,
            player: player
        }

        // Modal
        modal.id = component;
        modal.classList.add('d-flex');
        modal.setAttribute('data-modal','');

        // Button
        button.classList.add('btn-cta');
        button.classList.add('btn-close-modal');
        button.setAttribute('data-label','x');
        button.setAttribute('data-modal-close','');
        button.innerHTML = 'Close';

        if(component === 'variants'){
            // Section
            section.classList.add('my-auto');
            section.classList.add('py-5');
            section.classList.add('carousel');
            // Title
            title.classList.add('h1');
            title.classList.add('title--background');
            title.setAttribute('data-label', component);
            title.innerHTML = component;
            // Carousel & Wrapper
            carousel.classList.add('carousel');
            carousel.setAttribute('data-carousel', component);
            wrapper.classList.add('carousel--wrapper');

            carousel.append(wrapper);
            section.prepend(title);
            section.append(carousel);

        } else if (component === 'video'){
            modal.setAttribute('data-modal-video','');
            modal.classList.add('modal-video');
            section.classList.add('video-container');
            player.height = 1920;
            player.width = 1080;
            player.setAttribute('muted','');
            player.setAttribute('loop','');
            player.setAttribute('playsinline','');

            section.append(player);
        }

        modal.prepend(button);
        modal.append(section);

        app.footer.parentNode.insertBefore(modal, app.footer);
    }

    createVideo(id, src){
        this.modal.container.id = id;
        this.modal.player.id = 'player-' + id;
        this.modal.player.src = src;
    }

    toggle(entry){
        entry.onclick = (event) => {
            var data_modal = entry.getAttribute('data-modal-target'),
                modal = document.querySelector('[id="' + data_modal + '"]');

            if(modal.hasAttribute('data-modal-video')){ modal.querySelector('video').play() }
            modal.classList.add('active')

            document.body.classList.add('overflow-hidden')
            document.body.classList.add('modal-active')
            document.getElementById('main-menu').classList.remove('active')
            document.getElementById('menu-toggler').classList.remove('active')
        }
    }

    close(entry){
        entry.onclick = (event) => {
            var modal = entry.parentNode;

            if(modal.hasAttribute('data-modal-video')){
                modal.querySelector('video').pause();
                // modal.querySelector('video').volume = lerp(1, 0, .1)
            }

            modal.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
            document.body.classList.remove('modal-active')
        };
    }

    destroy(){
        this.modals = document.querySelectorAll('[data-modal]');
        each(this.modals, (modal) => {

            modal.classList.remove('active');
            document.body.classList.remove('overflow-hidden');

            gsap.to(modal,{
                delay: .5,
                onComplete: modal.remove()
            })
        });
    }
}

export const ModalManager = new Modal();