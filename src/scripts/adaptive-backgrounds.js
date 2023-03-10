// None of this is my code. This is an "adaptive background" script made by benhowdle89 on GitHub
// https://github.com/benhowdle89/Adaptive-Backgrounds

// !(function(d) {

    function AdaptiveBackgrounds() {
        'use strict';
        // console.warn('Ran ABG');
        
        if (!window.addEventListener) {
            // If we don't have addEventListener, we don't have any of the other
            // fancy stuff. Bail, so nothing breaks (oh, hello IE7/8)
            console.warn('Exiting ABG')
            return;
        }

        if (!this) {
            // console.warn('Returning new ABG');
            return new AdaptiveBackgrounds();
        }

        this.images = getImages();

        if(!this.images.length){
            return;
        }

        this.init();
        this.process();

        // window.addEventListener('load', function() {
        //     this.init();
        //     this.process();
        // }.bind(this));
    }

    AdaptiveBackgrounds.prototype.init = function(){
        // Include RGBaster - https://github.com/briangonzalez/rgbaster.js
        (function(n,t){var a=function(){return document.createElement("canvas").getContext("2d")};var e=function(n,t){var e=new Image;e.crossOrigin="Anonymous";e.src=n.src;e.onload=function(){var r=a();r.drawImage(e,0,0);var o=r.getImageData(0,0,n.width,n.height);t&&t(o.data)}};var r=function(n){return["rgb(",n,")"].join("")};var o=function(n){return n.map(function(n){return r(n.name)})};var i=5;var u=10;
        // // // The following modification is from ChatGPT
        var c={};
        c.colors=function(n,t,a){
        e(n,function(n){
            var e=n.length,c={},m="",f=[],l={dominant:{name:"",count:0},palette:Array.apply(null,Array(a||u)).map(Boolean).map(function(n){return{name:"0,0,0",count:0}})};
            var v=0;
            while(v<e){
            f[0]=n[v];
            f[1]=n[v+1];
            f[2]=n[v+2];
            m=f.join(",");
            if(m in c){
                c[m]=c[m]+1;
            }else{
                c[m]=1;
            }
            // Calculate brightness value (based on HSL)
            var brightness = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
            if(m !== "0,0,0" && brightness < 210 && brightness > 50){  // Only count the color if it's not black (0,0,0) and its brightness is below 190
                var d=c[m];
                if(d>l.dominant.count){
                l.dominant.name=m;
                l.dominant.count=d;
                }else{
                l.palette.some(function(n){
                    if(d>n.count){
                    n.name=m;
                    n.count=d;
                    return true;
                    }
                });
                }
            }
            v+=i*4;
            }
            t&&t({dominant:r(l.dominant.name),palette:o(l.palette)});
        });
        };
        // // This is where ChatGPT's modifcation ends
        n.RGBaster=n.RGBaster||c})(window);
    };

    AdaptiveBackgrounds.prototype.process = function(){
        for (var i = this.images.length - 1; i >= 0; i--) {
            (function(image) {
                RGBaster.colors(image, function(colors) {
                    document.body.style.backgroundColor = colors.dominant;
                }, 20);
            })(this.images[i]);
        }
    };

    AdaptiveBackgrounds.prototype.refresh = function(){
        this.images = getImages();
    };

    function getImages(){
        return document.querySelectorAll('[data-adaptive-background]');
    }

    window.AdaptiveBackgrounds = AdaptiveBackgrounds;
// })(document);

export { AdaptiveBackgrounds };