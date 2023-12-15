import Sniffer from 'snifferjs';

export default class Detect {
    constructor(){
        this.scroll = document.querySelector('.app-scroll');
        this.footer = document.querySelector('footer');
    }

    init(){
        var Sniff = Sniffer(navigator.userAgent),
            htmlNode = document.getElementsByTagName('html')[0],
            classNameArr = [htmlNode.className];

        Sniff.browser.name && classNameArr.push(Sniff.browser.name);
        Sniff.browser.engine && classNameArr.push(Sniff.browser.engine);
        Sniff.os.name && classNameArr.push(Sniff.os.name);

        for (var prop in Sniff.features) {
            if (Sniff.features[prop]) classNameArr.push(prop);
        }

        htmlNode.className = classNameArr.join(' ');

        if (typeof(module) != 'undefined' && module.exports) {
            module.exports = Sniff;
        }
        else {
            global.Sniff = Sniff;
        }
    }
}
