import Lenis from '@studio-freight/lenis';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from 'gsap';

if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  console.log("Lenis installed.")
} else {
  // See https://github.com/studio-freight/lenis/issues/103
  console.log("Safari detected, no Lenis installed")
}
