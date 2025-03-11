document.querySelectorAll('.scroller').forEach((scroller, index) => {
  let baseSpeed = index === 0 ? 1 : .5; // First scroller is slower
  let speed = baseSpeed;
  let position = 0;
  
  // Duplicate images for an infinite loop effect
  const images = Array.from(scroller.children);
  images.forEach(img => {
    const clone = img.cloneNode(true);
    scroller.appendChild(clone);
  });
  
  function animate() {
    position -= speed;
    
    // Reset position when scroller reaches halfway for seamless looping
    if (position <= -scroller.scrollWidth / 2) {
      position = 0;
    }
    
    gsap.set(scroller, { x: position });
    requestAnimationFrame(animate);
  }
  
  animate(); // Start scrolling immediately
  
  // Swipe gesture with Hammer.js
  const hammer = new Hammer(scroller);
  hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
  
  hammer.on('panmove', (event) => {
    speed = baseSpeed + event.velocityX * -5; // Adjust speed dynamically
  });
  
  hammer.on('panend', () => {
    gsap.to(scroller, {
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        speed += (baseSpeed - speed) * 0.1; // Gradually return to normal speed
      }
    });
  });
});


// GSAP Animation with Intersection Observer
document.addEventListener("DOMContentLoaded", function() {
  const fadein = document.querySelectorAll(".fadein");
  
  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        });
      } else {
        gsap.to(entry.target, {
          opacity: 0,
          scale: 0.75,
          duration: 1,
          ease: "power2.out"
        });
      }
    });
  }, { threshold: 0.5 });
  
  fadein.forEach(element => observer1.observe(element));
  
  
  const faderight = document.querySelectorAll(".faderight");
  
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          width: "80vw",
          /* Expands width */
          opacity: 1,
          duration: 1,
          delay: .5,
          ease: "power2.out"
        });
        
        gsap.to(entry.target, {
          borderBottomColor: "white",
          /* Border appears */
          duration: 1,
          delay: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(entry.target, {
          width: 0,
          /* Shrinks */
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(entry.target, {
          borderBottomColor: "transparent",
          /* Border disappears */
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  }, { threshold: 0.5 });
  
  faderight.forEach(element => observer2.observe(element));
  
  
  const fadeup = document.querySelectorAll(".fadeup");
  
  const observer3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const fullHeight = target.scrollHeight; // Get actual content height
        
        gsap.to(target, {
          height: '100px', // Animate to full height
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        });
        
      } else {
        gsap.to(entry.target, {
          height: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      }
    });
  }, { threshold: 0.5 });
  
  fadeup.forEach(element => observer3.observe(element));
  
  
  const growup = document.querySelectorAll(".growup");
  
  const observer4 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          y: 0,
          /* Moves up to original position */
          scale: 1,
          /* Grows to full size */
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
          clearProps: "transform"
        });
      } else {
        gsap.to(entry.target, {
          y: 100,
          /* Moves down */
          scale: 0.75,
          /* Shrinks */
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  }, { threshold: 0.5 });
  
  growup.forEach(element => observer4.observe(element));
});
var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});