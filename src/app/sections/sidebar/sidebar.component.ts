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
import {SidebarService} from "../../services/sidebar.service";

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

  languagesMenuItems: MenuItem[] = [];

  constructor(readonly sidebarService: SidebarService,
              readonly dataService: DataService,
              readonly langService: LanguageService,
              readonly changeDetectorRef: ChangeDetectorRef) {
    langService.langChange.subscribe(newLang => this.fillLanguageButton(newLang));
    this.fillLanguageButton(this.langService.lang);
    this.sidebarService.sectionUpdate.subscribe(() => changeDetectorRef.detectChanges())
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
          this.langService.setLang(lang, true);
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

}
