export default class Menu {
    constructor() {
        this.menu = {
            toggler: document.getElementById('menu-toggler'),
            main: document.getElementById('main-menu'),
            link: document.querySelectorAll('#main-menu .nav-link'),
        }

        this.lang = {
            toggler: document.querySelector('#select-language .dropdown-toggler'),
            menu: document.querySelector('#select-language .dropdown-menu'),
        }
    }

    init() {
        this.toggle();
        if(this.lang.toggler){ this.language(); }
    }

    toggle = () => {
        this.menu.toggler.addEventListener('click', () => {
            this.menu.main.classList.toggle('active');
            this.menu.toggler.classList.toggle('active');
            
            if(this.lang.toggler){
                this.lang.menu.classList.remove('show');
            }
        });
        
        this.menu.link.forEach(element => {
            element.addEventListener('click', () =>{
                if (this.menu.main.classList.contains("active")) {
                    this.menu.main.classList.remove('active');
                    this.menu.toggler.classList.remove('active');
                }
            })
        })
    }

    language = () => {
        this.lang.toggler.addEventListener('click', () => {
            this.lang.menu.classList.toggle('show');
        });
    }
}
