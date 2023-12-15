import $ from "jquery";
import { app } from '../../utils/store';

export default class Filters {
    constructor() {
        this.tease = {
            article: document.querySelectorAll('article.tease'),
            hidden: document.querySelectorAll('article.tease.d-none.selected'),
        }

        this.filter = {
            main: document.getElementById('filters'),
        };

        this.disclaimer = document.getElementById('disclaimer');

        this.loadmore = document.getElementById('loadmore');

        app.overlay = document.querySelector('.app-overlay');
    }

    init() {
        this.disclaimer.classList.add('d-none');

        // ⚠️ ALL TEMPORARY in jQuery
        this.tease.article.forEach((tease)=>{
            tease.classList.add('d-none');
            tease.classList.add('selected');
        })
        
        // ⚠️ Mobile ONLY
        this.toggle();

        this.filters();
        this.loadMore();

        //Fix Constructor
        var that = this;
        this.loadmore.addEventListener('click',() => {
            that.loadMore();
        });
    }

    // ⚠️ Mobile ONLY
    toggle = () =>{
        $('button.filters-toggler').on('click', function(){
            $('#filters').toggleClass('active');
            $(this).toggleClass('active');
            $('section.results .posts').toggleClass('disabled');
            $('body').toggleClass('overflow-hidden');
        });
    }

    result = () => {
        var slugs = [];

        $('input.active').not('#filter-all').each(function(){
            slugs.push($(this).data('terms'));
        });
        
        console.log(slugs);
        
        var count = 0;

        $('article.tease').each(function(){
            var terms = $(this).data('terms');
            var element = $(this);

            element.removeClass('selected');
            element.addClass('d-none');

            if(slugs.length == 0){
                element.addClass('selected');
                count++;
            }

            slugs.forEach(function(item){
                if(terms.includes(item)){
                    element.addClass('selected');
                    count++;
                }
            })
        });

        if(count == 0){
            $('#loadmore').addClass('d-none');
            // $('#results .posts').addClass('d-none');
            $('#disclaimer').removeClass('d-none');
        } else {
            // $('#results .posts').removeClass('d-none');
            $('#disclaimer').addClass('d-none');
        }

        $('#results-length').html(count);
        this.loadMore();
    }

    filters = () => {
        var that = this;
        
        var filterCount = 0;

        // CHECK If there are active inputs
        $('#filters input').on('click', function(){
        
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).prop("checked", false);
            } else {
                $('#filters input').prop("checked", false);
                $('#filters input').removeClass('active');
                $(this).prop("checked", true);
                $(this).addClass('active');
            }

            if($('input.active').length != 0){
                $('#filter-all').parent().removeClass('disabled');
                $('#filter-all').prop("checked", false);
            } else {
                $('#filter-all').parent().addClass('disabled');
                $('#filter-all').prop("checked", true);
            }
            that.result()

            // ⚠️ Mobile ONLY
            $('#filters').removeClass('active');
            $(this).removeClass('active');
            $('section.results .posts').removeClass('disabled');
            $('body').removeClass('overflow-hidden');
        });

        // CLEAR FILTERS
        $('#filter-all').on('click',(e) => {
            filterCount = 0;

            if($('#filter-all').prop("checked") == true){
                $('#filters input').prop("checked", false);
            } else {
                $('#filters input').prop("checked", false);
                $('#filter-all').parent().addClass('disabled');
                $('#filter-all').prop("checked", true);
            }
            $('#filters input').removeClass('active');
            that.result();
        });
    }

    loadMore = () => {
        this.loadmore.classList.add('d-none');

        var hidden = $("article.tease.d-none.selected");
        var tease = 0;

        hidden.each(function(){
            if(tease < 12) {
                $(this).removeClass("d-none");
            }
            tease++;
        });

        if(tease > 12){
            this.loadmore.classList.remove('d-none');
        }
    }
}
