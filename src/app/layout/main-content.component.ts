import {Component, ElementRef, HostListener, Renderer2, ViewChildren} from '@angular/core';
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

  @ViewChildren("letter", {read: ElementRef}) letters: ElementRef<HTMLSpanElement>[];

  alarmClockTimelines: gsap.core.Timeline[] = [];

  constructor(readonly dataService: DataService,
              readonly langService: LanguageService,
              readonly sidebarService: SidebarService,
              readonly route: ActivatedRoute,
              private renderer: Renderer2) {
    this.langService.langChange.subscribe(() => {
      this.fixAlarmClockAnimation();
      this.fixHeadingAfterLangChange();
    });
    this.langService.searchForURLLang(this.route.snapshot.paramMap.get("lang"));
  }

  /**
   * Used to fix a bug where the URL gets updated on popstate but the routing not.
   * Simply reloads page.
   */
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    location.reload();
  }

  ngAfterViewInit(): void {
    if (document.readyState === 'complete') {
      this.animateHeading();
    } else {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          this.animateHeading();
        }
      }
    }

    // @ts-ignore
    for (let el of document.getElementsByClassName("alarm-clock-animated")) {
      this.addAlarmClockAnimation(el);
    }
    setTimeout(() => this.sidebarService.addSelectedAnimation(), 1);
  }

  /**
   * Fix heading/subheading letters after lang change. Without this some letters have opacity 0 (due to the heading animation)
   * if (sub-)heading differs at different languages.
   */
  fixHeadingAfterLangChange() {
    this.letters.forEach(letter => {
      this.renderer.setStyle(letter.nativeElement, "opacity", 1);
    })
  }

  /**
   * Fixes alarm clock animation when language is changed.
   */
  fixAlarmClockAnimation() {
    this.alarmClockTimelines.forEach(tl => tl.kill());
    this.alarmClockTimelines = [];

    let objectsToAnimate = document.getElementsByClassName("alarm-clock-animated");
    // @ts-ignore
    for (let el of objectsToAnimate) {
      this.addAlarmClockAnimation(el);
    }
  }

  animateHeading() {
    gsap.timeline()
      .to(".heading-letter", {
        rotationY: 360,
        duration: 1.8,
        ease: "power3.inOut",
        stagger: 0.1
      }, "0.3")
      .to(".subheading-letter", {
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.04
      }, ">-20%")
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
