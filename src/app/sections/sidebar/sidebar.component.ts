import {
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NavbarDotComponent} from "../../components/navbar-dot/navbar-dot.component";
import {NgForOf} from "@angular/common";
import {SpeedDialModule} from "primeng/speeddial";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "../../services/data.service";
import {MenuItem} from "primeng/api";
import {LanguagePack} from "../../model/model";
import * as generalJson from "../../../../../input/data/general.json";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    NavbarDotComponent,
    NgForOf,
    SpeedDialModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  // @Output() hovered: boolean = false;

  @ViewChildren("navbar_dot", {read: NavbarDotComponent}) dots: QueryList<NavbarDotComponent>;

  sectionActive = 0;

  languagesMenuItems: MenuItem[] = [];

  constructor(readonly changeDetectorRef: ChangeDetectorRef, readonly dataService: DataService, readonly langService: LanguageService) {
    langService.langChange.subscribe(newLang => this.fillLanguageButton(newLang));
    this.fillLanguageButton(this.langService.lang);
  }

  ngAfterViewInit(): void {
    this.addSelectedAnimation();
  }

  // @HostListener("mouseleave")
  // onMouseleave() {
  //   this.hovered = false;
  // }

  fillLanguageButton(activeLang: string): void {
    this.languagesMenuItems = [];
    for (const lang of this.dataService.loadedLanguages) {
      // @ts-ignore
      const langPack: LanguagePack = generalJson[lang];
      let flagActive: string = "";
      if (lang === activeLang) {
        flagActive = " flag-active";
      }
      this.languagesMenuItems.push({
        id: langPack.id,
        icon: `fi fis fi-${langPack.isoAlpha2} flag-icon${flagActive}`,
        command: () => {
          this.langService.setLang(lang);
        }
      })
    }

    // put active language first
    this.languagesMenuItems.sort((a: MenuItem, b: MenuItem): number => {
      if (a.id === activeLang) {
        return -1;
      }
      return 1;
    })
  }

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
          this.changeDetectorRef.detectChanges();
        },
        onEnterBack: self => {
          // console.log("Active section is ", i-1, "onEnterBack");
          this.sectionActive = i-1;
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }
}
