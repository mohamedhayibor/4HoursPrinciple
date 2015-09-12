function main () {
    (function run() {
        window.requestAnimFrame = function () {
            return function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }();

        var canvas = document.getElementById('canvas'), context = canvas.getContext('2d');

        canvas.width = 750; canvas.height = 200;

        var particle_count = 4,
            clocks = [],
            radius = 90,
            marginHeight = radius,
            marginWidth = radius,
            iIncr = 0,
            colors = ["#1919FF", "#5C991F", "#F1C40F", "#e74c3c"];

        const fourHours = +new Date() + 14400000; // 14,400,000 => advancing the current time to 4hours

        function Clock(radius, x, y, numColor, timer, lineWidth, styleDessin) {
            this.radius = radius;
            this.x = x;
            this.y = y;
            this.color = colors[numColor];
            this.timer = timer;
            this.lineWidth = lineWidth;
            this.styleDessin = styleDessin;

            // Creating the clocks 0 = hours, 1 = minutes, 2= seconds, 3 = milliseconds
            this.move = function () {
                var dateDev = new Date(fourHours - (+new Date())); 
                if (this.timer === 0) {
                    var hourLeft = dateDev.getUTCHours(); // to get a consistent 4 hours timer (any time zones)
                    var unit = hourLeft + (dateDev.getMinutes() / 100) + (dateDev.getSeconds() / 10000);
                    var divisor = 6;
                    var number = hourLeft;

                } else if(this.timer === 1) {
                    var unit = dateDev.getMinutes() + (dateDev.getSeconds() / 100);
                    var divisor = 30;
                    var number = unit;
                } else if (this.timer === 2) {
                    var unit = dateDev.getSeconds() + (dateDev.getMilliseconds() / 1000);
                    var divisor = 30;
                    var number = unit;
                } else if (this.timer === 3) {
                    var unit = dateDev.getMilliseconds();
                    var divisor = 30;
                    var number = unit / 100;
                    var unit = unit / 16.65;
                }

                context.beginPath();
                context.globalCompositeOperation = 'source-over';
                context.font = this.radius + "px Arial";
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = 'white';
                context.fillText(Math.floor(number), this.x, this.y);
                context.globalCompositeOperation = 'destination-over';
                context.lineWidth = this.lineWidth;
                context.fill();
                context.fillStyle = this.color;
                context.strokeStyle = this.color;
                // Clock design
                context.arc(this.x, this.y, this.radius, (Math.PI * 1.5), (Math.PI) * (unit / divisor) + (Math.PI * 1.5), false);
                context.lineTo(this.x, this.y);
                context.fill();
                context.closePath();
            };
        };

        for (var i = 0; i < particle_count; i++) {
            var newClock = new Clock(75, marginWidth, marginHeight, iIncr, iIncr, 5, i);
            iIncr++;
            clocks.push(newClock);
            marginWidth = marginWidth + (radius * 2);
        }

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particle_count; i++) {
                clocks[i].move();
            }
            requestAnimFrame(animate);
        }

        animate();
    })();
    document.getElementById('startCounter').disabled = true;
}
