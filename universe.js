var universe = (function() {

    window.addEventListener('resize', windowResizeHandler, false);

    function createUniverse() {
        universeCan = canvaUni.getContext('2d');

        for (var i = 0; i < starCount; i++) {
            stars[i] = new Star();
            stars[i].reset();
        }

        draw();
    }

    function draw() {
        universeCan.clearRect(0, 0, width, height);

        var starsLength = stars.length;

        for (var i = 0; i < starsLength; i++) {
            var star = stars[i];
            star.move();
            star.fadeIn();
            star.fadeOut();
            star.draw();
        }

        window.requestAnimationFrame(draw);
    }

    function Star() {

        this.reset = function() {
            this.giant = getProbability(3);
            this.comet = this.giant || first ? false : getProbability(10);
            this.x = getRandInterval(0, width - 10);
            this.y = getRandInterval(0, height);
            this.r = getRandInterval(1.1, 2.6);
            this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
            this.dy = -getRandInterval(speedCoeff, 6 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
            this.fadingOut = null;
            this.fadingIn = true;
            this.opacity = 0;
            this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
            this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
        };

        this.fadeIn = function() {
            if (this.fadingIn) {
                this.fadingIn = this.opacity > this.opacityTresh ? false : true;
                this.opacity += this.do;
            }
        };

        this.fadeOut = function() {
            if (this.fadingOut) {
                this.fadingOut = this.opacity < 0 ? false : true;
                this.opacity -= this.do / 2;
                if (this.x > width || this.y < 0) {
                    this.fadingOut = false;
                    this.reset();
                }
            }
        };

        this.draw = function() {
            universeCan.beginPath();

            if (this.giant) {
                universeCan.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
                universeCan.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
            } else if (this.comet) {
                universeCan.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
                universeCan.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

                //comet tail
                for (var i = 0; i < 30; i++) {
                    universeCan.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
                    universeCan.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
                    universeCan.fill();
                }
            } else {
                universeCan.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
                universeCan.rect(this.x, this.y, this.r, this.r);
            }

            universeCan.closePath();
            universeCan.fill();
        };

        this.move = function() {
            this.x += this.dx;
            this.y += this.dy;
            if (this.fadingOut === false) {
                this.reset();
            }
            if (this.x > width - (width / 4) || this.y < 0) {
                this.fadingOut = true;
            }
        };

        (function() {
            setTimeout(function() {
                first = false;
            }, 50)
        })()
    }

}());