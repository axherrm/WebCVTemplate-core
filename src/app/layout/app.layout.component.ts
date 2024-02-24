import {Component, ElementRef, ViewChild} from '@angular/core';
import {FooterSectionComponent} from "../sections/footer-section/footer-section.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sections/sidebar/sidebar.component";
import {MainContentComponent} from "./main-content.component";
import {DataService} from "../services/data.service";
import 'js-circle-progress';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {NgForOf, NgIf} from "@angular/common";
import {environment} from "../../environments/environment";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FooterSectionComponent,
    RouterOutlet,
    SidebarComponent,
    NgForOf,
    NgIf,
    MainContentComponent
  ],
  templateUrl: './app.layout.component.html',
  styleUrl: './app.layout.component.scss'
})
export class AppLayoutComponent {

  protected readonly environment = environment;

  backgroundLoaded: boolean = false;

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
    if (!this.backgroundLoaded) {
      while (!this.backgroundImageContainer.nativeElement.lastChild) {}
      this.backgroundImageContainer.nativeElement.lastChild.remove();
      this.backgroundLoaded = true;
    }
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
