import {EventEmitter, Injectable} from '@angular/core';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sectionActive = 0;
  sectionUpdate: EventEmitter<void> = new EventEmitter<void>();

  constructor(readonly dataService: DataService) {}

  addSelectedAnimation() {
    for (let i = 0; i < this.dataService.languagePack.sections.length; i++) {
      const section = this.dataService.languagePack.sections[i];
      ScrollTrigger.create({
        start: "top 50%",
        trigger: `#${section.id}`,
        end: "+=1",
        // markers: true,
        onEnter: self => {
          // console.log("Active section is ", i, "onEnter");
          this.sectionActive = i;
          this.sectionUpdate.emit();
        },
        onEnterBack: self => {
          // console.log("Active section is ", i-1, "onEnterBack");
          this.sectionActive = i-1;
          this.sectionUpdate.emit();
        }
      });
    }
  }

}
