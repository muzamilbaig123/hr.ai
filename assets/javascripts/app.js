const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
const body = document.body

function smoothMoves(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  gsap.to(circle, { duration: 0.5, attr: { cx: mouseX, cy: mouseY } });
}

function expandHero() {
  tl.to(circle, {
    duration: 1,
    attr: {
      r: "2000"
    },
    ease: "power2.inOut"
  })
    .to(
      hero,
      {
        duration: 1,
        scale: 1,
        borderRadius: 0,
        ease: "power2.inOut"
      },
      "-=1"
    )
    .to(body, {
      overflow: "auto"
    });
}

document.addEventListener("mousemove", smoothMoves);
hero.addEventListener("click", expandHero);



        // Add shadow to header on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 0) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });


        // Pricing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const prices = document.querySelectorAll('.price');
    const originalPrices = {
        basic: 20,
        professional: 100
    };

    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Calculate prices based on billing period
            const isAnnual = this.dataset.billing === 'annual';
            prices.forEach(price => {
                const value = parseInt(price.textContent);
                if (value > 0) { // Skip free tier
                    price.textContent = isAnnual ? 
                        Math.round(value * 0.75) : // 25% discount for annual
                        (value === 15 ? 20 : 100); // Reset to original monthly price
                }
            });
        });
    });
});

// faqs
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
});
