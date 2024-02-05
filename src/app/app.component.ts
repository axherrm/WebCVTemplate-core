import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {BadgeModule} from "primeng/badge";
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "./services/data.service";
import {SpeedDialModule} from "primeng/speeddial";
import {OverlayPanelModule} from "primeng/overlaypanel";
import 'js-circle-progress';
import {TimelineCardComponent} from "./components/timeline-card/timeline-card.component";
import {HeadingCardComponent} from "./components/heading-card/heading-card.component";
import {SkillsCardComponent} from "./components/skills-card/skills-card.component";
import {NavbarDotComponent} from "./components/navbar-dot/navbar-dot.component";
import {SidebarComponent} from "./sections/sidebar/sidebar.component";
import {AboutCardComponent} from "./components/about-card/about-card.component";
import {AboutComponent} from "./sections/about/about.component";
import {ContactComponent} from "./sections/contact/contact.component";
import {FooterSectionComponent} from "./sections/footer-section/footer-section.component";
import {MainContentComponent} from "./main-content/main-content.component";
import {Title} from "@angular/platform-browser";

gsap.registerPlugin(ScrollTrigger);

import "./js/lenis.js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TimelineModule,
    BadgeModule,
    SpeedDialModule,
    OverlayPanelModule,
    // Custom
    TimelineCardComponent,
    HeadingCardComponent,
    SkillsCardComponent,
    NavbarDotComponent,
    SidebarComponent,
    AboutCardComponent,
    AboutComponent,
    ContactComponent,
    FooterSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("backgroundImg", {read: ElementRef}) backgroundImage: ElementRef;
  @ViewChild("progress_bar", {read: ElementRef}) progressBar: ElementRef;
  @ViewChild(SidebarComponent, {read: ElementRef}) sidebar: ElementRef;
  @ViewChild(MainContentComponent) mainContent: MainContentComponent;

  constructor(readonly dataService: DataService, readonly titleService: Title) {}

  ngAfterViewInit(): void {
    this.setTitle();
    this.addProgressBarAnimation();
    this.addSidebarAnimation();
  }

  /**
   * Sets title of website, visible in browser tab. Static index.html title could differ,
   * e.g. to use a different title for Google.
   */
  setTitle() {
    this.titleService.setTitle(`CV - ${this.dataService.languagePack.heading}`);
  }

  addProgressBarAnimation() {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top top",
        trigger: "body",
        end: "bottom bottom",
        scrub: true,
      }
    });
    tl.fromTo(this.progressBar.nativeElement, {
      transform: "scaleX(0)"
    }, {
      transform: "scaleX(1)"
    })
  }

  addSidebarAnimation() {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top -50%",
        trigger: "body",
        end: "top -100%",
        scrub: true,
      }
    });
    tl
      .to(this.backgroundImage.nativeElement, {
        filter: "blur(2px)"
      })
      .fromTo(this.sidebar.nativeElement, {
        opacity: 0,
        ease: "power1.in",
        display: "none"
      }, {
        display: "var(--display-side-elements-flex)",
        opacity: 1,
      }, "<");
  }

}
