import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { app } from '../../utils/store';

export default class Forms {
    constructor() {
        this.input = {
            all: document.querySelectorAll('input:not([type="checkbox"]), textarea'),
            file: document.querySelectorAll('input[type="file"]'),
            container: document.querySelectorAll('.input-container input:not([type="checkbox"]), .input-container textarea'),
        };

        this.form = {
            login_short: document.getElementById('loginform'),
            checkout: document.querySelector('form.checkout'),
            edit_address: document.querySelector('form.edit-address'),
            rating: document.querySelector('.form-rating'),
            cf7: document.querySelectorAll('.wpcf7-form'),
        }

        this.modal = {
            slides: document.getElementById('slides-modal'),
            streaming: document.getElementById('streaming-modal'),
            video: document.getElementById('video-modal'),
            file: document.querySelectorAll('[id*="file-modal-"]'),
        }

        this.fields = document.querySelector('form .fields');
        this.topics = document.getElementById('select-topics');

        this.header = document.querySelector('header');
        this.body = document.querySelector('body');
    }

    init() {
        this.validation();

        if(this.form.cf7[0] || this.form.register || this.form.checkout || this.form.edit_account || this.form.edit_address || this.form.login_short){
            this.manipulate();
        }

        if(!Sniff.features.mobile && this.input.container[0]){
            // this.set();
            // this.animation();
        }

        // // Newsletter Form
        // if(this.form.newsletter){
        //     this.newsletter();
        // }
    }

    validation = () => {
        this.input.file.forEach((input) => {
            input.addEventListener('change', () => {
                var file = input.value;
                if (!file) {
                    input.classList.remove('valid');
                } else {
                    input.classList.add('valid');
                }
            });
        });
    }

    cf7Events = () => {
        
    }

    manipulate = () => {
        // Moving the label inside the control <span class="wpcf7-form-control-wrap">
        if (this.form.cf7[0]){
            this.form.cf7.forEach((form)=>{
                form.querySelectorAll('.input-container label').forEach((label)=>{
                    label.parentNode.querySelector('.wpcf7-form-control-wrap').append(label);
                });
            });
        }

        if(this.form.login_short){
            let fields = ['.login-username','.login-password'];
            this.form.login_short.querySelectorAll(fields).forEach((field)=>{
                field.classList.add('input-container');

                var label = field.querySelector('label');
                // console.log(label)
                label.parentNode.append(label);

                field.querySelector('input').placeholder = field.querySelector('label').innerHTML;
            });

            // UI Fixes to Remeber me
            var content = document.createElement('span');
            content.classList.add('label');
            
            var small = document.createElement('small');
            small.innerHTML = 'Ricordami';
            content.append(small);
            
            this.form.login_short.querySelector('.login-remember label').innerHTML = this.form.login_short.querySelector('.login-remember input').outerHTML;
            this.form.login_short.querySelector('.login-remember label').append(content);
        }

        if(this.form.register){
            
            this.form.register.querySelectorAll('form.register .afreg_half_field').forEach((field)=>{
                field.classList.remove('form-row');
                field.classList.add('col-12');
                field.classList.add('col-sm-6');
                field.classList.add('input-container');
                
                var label = field.querySelector('label');
                // console.log(label.parentNode)
                label.parentNode.append(label);
            });
            
            this.form.register.querySelectorAll('form.register .afreg_full_field').forEach((field)=>{
                field.classList.remove('form-row');
                field.classList.add('col-12');
                field.classList.add('input-container');
                
                var label = field.querySelector('label');
                console.log(label.parentNode)
                label.parentNode.append(label);
            });
            
            this.form.register.querySelectorAll('form.register .afreg_extra_fields').forEach((fields)=>{
                fields.classList.add('row');
                fields.querySelectorAll('p.newr').forEach((field)=>{
                    field.classList.remove('form-row');
                    field.classList.add('col-12');
                    
                    // UI Fixes to Display Checkboxes correct
                    var label = field.querySelector('label');
                    var span = label.querySelector('span.required');
                    
                    span.innerHTML = span.parentNode.innerHTML;
                    span.querySelector('span').remove();
                    span.classList.remove('required');
                    span.classList.add('label');
                    
                    var content = document.createElement('label');
                    field.append(content);
                    content.innerHTML = span.outerHTML;

                    var input = field.querySelector('input[type="checkbox"]');
                    content.prepend(input);

                    field.querySelector('label[for]').remove();
                });
            });
        }

        if(this.form.edit_account){
            this.form.edit_account.querySelectorAll('.afreg_extra_fields')[0].remove();
            this.form.edit_account.querySelector('#afreg_nonce_field').remove();
        }

        if(this.form.edit_address){
            this.form.edit_address.querySelectorAll('.fields-container p').forEach((field)=>{
                field.classList.remove('form-row');
                field.classList.remove('form-row-first');
                field.classList.remove('form-row-last');
                field.classList.remove('form-row-wide');
                field.classList.add('col-12');
                field.classList.add('col-sm-6');
                field.classList.add('input-container');

                field.querySelector('span').outerHTML = field.querySelector('span').innerHTML;                

                if(field.id == 'shipping_company_field' || field.id == 'billing_company_field'){
                    field.querySelector('span').outerHTML = field.querySelector('span').innerHTML; 
                }
                if(field.id == 'shipping_address_2_field' || field.id == 'billing_address_2_field'){
                    field.querySelector('span').outerHTML = field.querySelector('span').innerHTML; 
                    field.querySelector('label').classList.remove('screen-reader-text');
                }

                var label = field.querySelector('label');
                // console.log(label.parentNode)
                label.parentNode.append(label);
            });
            
            this.form.edit_address.querySelectorAll('.fields-container p select').forEach((select)=>{
                select.parentNode.querySelector('label').remove();
            });
            
            this.form.edit_address.querySelectorAll('input[placeholder]').forEach((input)=>{
                var label = input.parentNode.querySelector('label');
                if(label){

                    input.placeholder = label.innerHTML;
                    // console.log(input + ' ' + input.getAttribute('placeholder'));
                    console.log(input.placeholder)
                }
            });
        }

        if(this.form.checkout){
            // Billing Form
            this.form.checkout.querySelector('.woocommerce-billing-fields__field-wrapper').classList.add('row');

            this.form.checkout.querySelectorAll('.woocommerce-billing-fields__field-wrapper p').forEach((field)=>{
                field.classList.remove('form-row');
                field.classList.remove('form-row-first');
                field.classList.remove('form-row-last');
                field.classList.remove('form-row-wide');
                field.classList.add('col-12');
                field.classList.add('col-sm-6');
                field.classList.add('input-container');

                field.querySelector('span').outerHTML = field.querySelector('span').innerHTML;                

                if(field.id == 'billing_company_field'){
                    field.querySelector('span').outerHTML = field.querySelector('span').innerHTML; 
                }

                var label = field.querySelector('label');
                // console.log(label.parentNode)
                label.parentNode.append(label);
            });

            this.form.checkout.querySelectorAll('.woocommerce-billing-fields__field-wrapper p select').forEach((select)=>{
                select.parentNode.querySelector('label').remove();
            });

            this.form.checkout.querySelectorAll('.woocommerce-billing-fields__field-wrapper input[placeholder]').forEach((input)=>{
                var label = input.parentNode.querySelector('label');
                label.innerHTML = input.placeholder;
            });

            // Shipping Form
            if(this.form.checkout.querySelector('.woocommerce-shipping-fields__field-wrapper')){
                var form_shipping = this.form.checkout.querySelector('.woocommerce-shipping-fields__field-wrapper');

                form_shipping.classList.add('row');

                form_shipping.querySelectorAll('p').forEach((field)=>{
                    field.classList.remove('form-row');
                    field.classList.remove('form-row-first');
                    field.classList.remove('form-row-last');
                    field.classList.remove('form-row-wide');
                    field.classList.add('col-12');
                    field.classList.add('col-sm-6');
                    field.classList.add('input-container');

                    field.querySelector('span').outerHTML = field.querySelector('span').innerHTML;                

                    if(field.id == 'shipping_company_field'){
                        field.querySelector('span').outerHTML = field.querySelector('span').innerHTML; 
                    }
                    if(field.id == 'shipping_address_2_field'){
                        field.querySelector('span').outerHTML = field.querySelector('span').innerHTML; 
                    }

                    var label = field.querySelector('label');
                    // console.log(label.parentNode)
                    label.parentNode.append(label);
                });

                form_shipping.querySelectorAll('.woocommerce-shipping-fields__field-wrapper p select').forEach((select)=>{
                    select.parentNode.querySelector('label').remove();
                });

                form_shipping.querySelectorAll('input[placeholder]').forEach((input)=>{
                    var label = input.parentNode.querySelector('label');
                    console.log(input)
                    label.innerHTML = input.placeholder;
                    // console.log(input + ' ' + input.getAttribute('placeholder'));
                    console.log(input.placeholder)
                });
            }
        }
    }

    set = () => {
        this.input.container.forEach((input) => {
            gsap.set(input, {
                y: 100,
                autoAlpha: 0,
            })
        });
        
    }

    animation = () => {
        this.input.container.forEach((input) => {
            gsap.to(input, {
                // duration: 2,
                y: 0,
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: input,
                    start: 'top bottom-=100',
                    // end: 'bottom top',
                    scrub: false,
                }
            })
        });
    }
}