var helper = (function() {

    function getProbability(percents) {
        return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
    }

    function getRandInterval(min, max) {
        return (Math.random() * (max - min) + min);
    }

    function windowResizeHandler() {
        width = window.innerWidth;
        height = window.innerHeight;
        starCount = width * starDensity;
        circleRadius = (width > height ? height / 2 : width / 2);
        circleCenter = {
            x: width / 2,
            y: height / 2
        }

        canva.setAttribute('width', width);
        canva.setAttribute('height', height);
    }

    function random() {
        return Math.round(Math.random() * 9);
    };

    function select() {
        return Math.round(Math.random() * $randomnbr.length + 1);
    };
    
}());