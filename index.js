let clickHoverNote = document.getElementById('clickHoverNote');
// let fullScreenNote = document.getElementById("fullScreenNote");

// fullScreenNote.addEventListener('click', () => {
//     fullScreenNote.remove();
// });

clickHoverNote.addEventListener('click', () => {
    clickHoverNote.remove();
});

const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
let $navbar = document.getElementById("navbarBasicExample");
let navbarMenu = document.getElementById("navbarBasicExample");

// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {
    navbarMenu.style.backgroundColor = "rgba(0, 0, 0, 0.527) !important";
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {



            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

            // console.log(el);

        });
    });
}

let menuBurger = document.getElementById("menuBurger");
let homePage = document.getElementById("homeBody");
let aboutBody = document.getElementById("aboutBody");
let visionBody = document.getElementById("visionBody");

let homeNav = document.getElementById("homeNav");
let aboutMeNav = document.getElementById("aboutMeNav");
let visionNav = document.getElementById("visionNav");

let cursorDot = document.getElementById("cursorDot")
let cursorOutline = document.getElementById("cursorOutline")

function changePage() {
    const target = menuBurger.dataset.target;
    const $target = document.getElementById(target);
    menuBurger.classList.toggle('is-active');
    $target.classList.toggle('is-active');
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';

            if (self.endY > vh && self.endY < 2 * vh) {
                cursorDot.style.backgroundColor = "black";
                cursorOutline.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            } else {
                cursorDot.style.backgroundColor = "rgb(251, 255, 0)";
                cursorOutline.style.backgroundColor = "rgba(251, 255, 0, 0.5)";
            }
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();


(function ($) {

    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height() - $w.height()*0.25,
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);

var win = $(window);
var allMods = $(".module");

allMods.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
        el.addClass("already-visible");
    }
});

win.scroll(function (event) {

    allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in-upward");
        }
    });

});


// (function ($) {

//     $.fn.visible = function (partial) {

//         var $t = $(this),
//             $w = $(window),
//             viewTop = $w.scrollTop(),
//             viewBottom = (viewTop + $w.height()) - $w.height()*0.25,

//             _top = $t.offset().top,
//             _bottom = _top + $t.height(),
//             compareTop = partial === true ? _bottom : _top,
//             compareBottom = partial === true ? _top : _bottom;

//         return ((compareBottom <= viewBottom ) && (compareTop >= viewTop));

//     };

//     $.fn.outofBounds = function (partial) {

//         var $t = $(this),
//             $w = $(window),
//             viewTop = $w.scrollTop() + $w.height()*0.10,
//             viewBottom = (viewTop + $w.height()) - $w.height()*0.25,

//             _top = $t.offset().top,
//             _bottom = _top + $t.height(),
//             compareTop = partial === true ? _top : _bottom,
//             compareBottom = partial === true ? _bottom : _top;

//         return ((compareBottom <= viewBottom ) && (compareTop <= viewTop));

//     };

// })(jQuery);

// var win = $(window);
// var allMods = $(".module");

// allMods.each(function (i, el) {
//     var el = $(el);
//     if (el.visible(true)) {
//         el.addClass("already-visible");
//     }
// });

// var lastScrollTop = 0;

// win.scroll(function (event) {

//     var st = $(this).scrollTop();
//     if (st > lastScrollTop){
//         // downscroll code
//         allMods.each(function (i, el) {
//             var el = $(el);
//             if (((el.hasClass("come-out-upward") || el.hasClass("come-out-downward")) ||
//                 (!el.hasClass("come-out-upward") && !el.hasClass("come-out-downward"))) &&
//                  el.visible(true) ) {
//                 el.removeClass("come-in-downward");
//                 el.removeClass("come-out-downward");
//                 // el.removeClass("come-out-upward");

//                 el.addClass("come-in-upward");
//             }
            
//             if ( (el.hasClass("come-in-upward") || el.hasClass("come-in-downward") ) && el.outofBounds(true)) {
//                 el.removeClass("come-in-downward");
//                 el.removeClass("come-out-downward");
//                 // el.removeClass("come-in-upward");

//                 el.addClass("come-out-upward");
//             }
//         });
//     } else {
//         // upwardscroll
//         allMods.each(function (i, el) {
//             var el = $(el);
//             if ( (el.hasClass("come-in-upward") || el.hasClass("come-in-downward") ) && el.visible(true) ) {
//                 // el.removeClass("come-in-downward");
//                 el.removeClass("come-out-upward");
//                 el.removeClass("come-in-upward");

//                 el.addClass("come-out-downward");
//             }
            
//             if ( (el.hasClass("come-out-upward") || el.hasClass("come-out-downward") ) && el.outofBounds(true)) {
//                 // el.removeClass("come-out-downward");
//                 el.removeClass("come-out-upward");
//                 el.removeClass("come-in-upward");

//                 el.addClass("come-in-downward");
//             }
//         });
//     }
//     lastScrollTop = st;

// });