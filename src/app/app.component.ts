import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "./services/data.service";
import 'js-circle-progress';
import {SidebarComponent} from "./sections/sidebar/sidebar.component";
import {FooterSectionComponent} from "./sections/footer-section/footer-section.component";
import {MainContentComponent} from "./main-content/main-content.component";

gsap.registerPlugin(ScrollTrigger);

// import "./js/lenis.js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    FooterSectionComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("backgroundImgContainer", {read: ElementRef<HTMLDivElement>}) backgroundImageContainer: ElementRef<HTMLDivElement>;
  @ViewChild("progress_bar", {read: ElementRef}) progressBar: ElementRef;
  @ViewChild(SidebarComponent, {read: ElementRef}) sidebar: ElementRef;
  @ViewChild(MainContentComponent) mainContent: MainContentComponent;

  constructor(readonly dataService: DataService) {}

  ngAfterViewInit(): void {
    this.addProgressBarAnimation();
    this.addSidebarAnimation();
  }

  onBackgroundLoaded() {
    while (!this.backgroundImageContainer.nativeElement.lastChild) {}
    this.backgroundImageContainer.nativeElement.lastChild.remove();
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
      .to(this.backgroundImageContainer.nativeElement, {
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
