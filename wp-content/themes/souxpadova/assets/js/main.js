import { each } from 'lodash';

// Renderers
import Renderer from './renderers/renderer';

// UI Components/Modules
// import Preload from './modules/preload/preload';
import Menu from './modules/menu/menu';


import Detect from './utils/detect';

import {ModalManager} from './classes/Modal';


// App
import {app} from './utils/store';

// Init
app.detect = new Detect();
app.detect.init();

app.nav = new Menu();
app.nav.init();

// app.loader = new Preload();
// app.loader.init();

app.renderer = new Renderer();
app.renderer.init();


class App {
    constructor() {
        app.init = true;

        this.createContent();
        this.createModals();

    }

    // Create Modals
    createModals() {
        each(this.modal.togglers, (toggler) => ModalManager.toggle(toggler))
        each(this.modal.closers, (closer) => ModalManager.close(closer))
    }

    createContent(){
        //Async Load
        this.images = document.querySelectorAll('[data-src]')

        // Modals
        this.modal = {
            elements: document.querySelectorAll('[data-modal]'),
            togglers: document.querySelectorAll('[data-modal-target]'),
            closers: document.querySelectorAll('[data-modal-close]')
        }

    }


}
new App();