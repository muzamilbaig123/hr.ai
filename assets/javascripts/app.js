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
