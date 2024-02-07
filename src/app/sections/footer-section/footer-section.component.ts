import {Component, ElementRef} from '@angular/core';
import {appName, appVersion, githubURL} from "../../js/global.vars";
import {CustomButtonComponent} from "../../components/custom-button/custom-button.component";
import gsap from "gsap";

@Component({
  selector: 'footer-section',
  standalone: true,
  imports: [
    CustomButtonComponent
  ],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss'
})
export class FooterSectionComponent {

  protected readonly appVersion = appVersion;
  protected readonly githubURL = githubURL;
  protected readonly appName = appName;

  currentYear: string = '' + new Date().getFullYear();

  constructor(readonly host: ElementRef) {}

  ngAfterViewInit(): void {
    this.addAnimation();
  }

  addAnimation() {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "bottom 140%",
        trigger: "body",
        end: "bottom bottom",
        scrub: true
      }
    });
    tl
      .fromTo(this.host.nativeElement, {
        display: "none",
        opacity: "0"
      },{
        display: "block",
        opacity: 1,
      });
  }

}
