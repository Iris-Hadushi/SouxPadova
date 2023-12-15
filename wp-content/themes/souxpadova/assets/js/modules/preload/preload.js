import imagesLoaded from 'imagesloaded';
export default class Preload {
    constructor() {

    }

    init() {
        this.preload();
    }

    preload() {
        const preloader = document.getElementById('app-loader');
        var imgLoad = imagesLoaded( 'body' );

        imgLoad.on( 'progress', function(instance, image){
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log( 'image is ' + result + ' for ' + image.img.src );
            preloader.addClass('active');
            setTimeout(function(){
                // preloader.remove();
            }, 1000);
        });
        imgLoad.on( 'done', function(){
            console.log('Tutte caricate!')
            preloader.addClass('active');
            setTimeout(function(){
                // preloader.remove();
            }, 1000);
        });
    }
}
