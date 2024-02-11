import {Component} from '@angular/core';
import {AboutComponent} from "../sections/about/about.component";
import {BadgeModule} from "primeng/badge";
import {ContactComponent} from "../sections/contact/contact.component";
import {HeadingCardComponent} from "../components/heading-card/heading-card.component";
import {NgForOf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {SkillsCardComponent} from "../components/skills-card/skills-card.component";
import {TimelineCardComponent} from "../components/timeline-card/timeline-card.component";
import {TimelineModule} from "primeng/timeline";
import {DataService} from "../services/data.service";
import {LanguageService} from "../services/language.service";
import gsap from "gsap";
import {SidebarService} from "../services/sidebar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'main-content',
  standalone: true,
  imports: [
    AboutComponent,
    BadgeModule,
    ContactComponent,
    HeadingCardComponent,
    NgForOf,
    SharedModule,
    SkillsCardComponent,
    TimelineCardComponent,
    TimelineModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

  alarmClockTimelines: gsap.core.Timeline[] = [];

  constructor(readonly dataService: DataService,
              readonly langService: LanguageService,
              readonly sidebarService: SidebarService,
              readonly route: ActivatedRoute) {
    this.langService.langChange.subscribe(() => this.onLangChange());
    this.langService.searchForURLLang(this.route.snapshot.paramMap.get("lang"));
  }

  ngAfterViewInit(): void {
    this.addHeadingAnimation();
    // @ts-ignore
    for (let el of document.getElementsByClassName("alarm-clock-animated")) {
      this.addAlarmClockAnimation(el);
    }
    this.sidebarService.addSelectedAnimation();
  }

  onLangChange() {
    this.alarmClockTimelines.forEach(tl => tl.kill());
    this.alarmClockTimelines = [];

    let objectsToAnimate = document.getElementsByClassName("alarm-clock-animated");
    // @ts-ignore
    for (let el of objectsToAnimate) {
      this.addAlarmClockAnimation(el);
    }
  }

  addHeadingAnimation() {
    // gsap.from(".heading-letter", {
    //   y: "50vh",
    //   rotationY: 270,
    //   scale: 0,
    //   opacity: 0.4,
    //   duration: 1,
    //   ease: "power3.inOut",
    //   stagger: 0.05
    // })
    gsap.from(".heading-letter", {
      rotationY: 360 * 1 + 270,
      duration: 1.8,
      ease: "power3.inOut",
      stagger: 0.1
    })
    // gsap.from(".heading-letter", {
    //   keyframes: {
    //     "0%": {y: "-80vh"},
    //     "60%": {y: "5vh"},
    //     "100%": {y: "0"},
    //   },
    //   duration: 3,
    //   ease: "expo.in",
    //   stagger: 0.15
    // })
  }

  addAlarmClockAnimation(el: HTMLElement) {
    const bottomHalfTl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top bottom",
        trigger: el,
        end: "center center",
        // markers: true,
        scrub: true,
      },
      defaults: {
        ease: "power1.out"
      }
    });
    const upperHalfTl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "center center",
        trigger: el,
        end: "bottom top",
        // markers: true,
        scrub: true,
      },
      defaults: {
        ease: "power1.in"
      }
    });
    bottomHalfTl.fromTo(el, {
      scale: 0.9,
      // filter: "brightness(0.8)",
      rotationX: "-30deg",
      transformPerspective: "1400px",
    }, {
      scale: 1,
      // filter: "brightness(1)",
      rotationX: "0deg",
      transformPerspective: "1000px",
    });
    upperHalfTl.to(el, {
      scale: 0.9,
      // filter: "brightness(0.8)",
      rotationX: "30deg",
      transformPerspective: "1400px",
    })
    this.alarmClockTimelines.push(bottomHalfTl, upperHalfTl);
  }

}
