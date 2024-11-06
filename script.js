const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

        .to(".boundingelem", {
            y: '0',
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: .2
        })

        .from("#herofooter", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

var timeout;

function circleMouseSkew() {
    // define default scale values
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mouseover", function(dets) {
        clearTimeout;
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        
        circleMouseFollower(xscale, yscale);

        setTimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100)
    })
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: .5,
        });
    });

    elem.addEventListener("mousemove", function(details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot* .4),
        });
    });
});

circleMouseFollower();
firstPageAnim();
circleMouseSkew();