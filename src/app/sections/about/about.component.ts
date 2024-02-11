import {Component} from '@angular/core';
import {AboutCardComponent} from "../../components/about-card/about-card.component";
import {appName, appVersion, githubURL} from "../../js/global.vars";
import {BadgeModule} from "primeng/badge";
import {BadgeComponent} from "../../components/badge/badge.component";
import {NgForOf, NgIf} from "@angular/common";
import {CustomButtonComponent} from "../../components/custom-button/custom-button.component";
import {DataService} from "../../services/data.service";
import {AboutCard} from "../../model/model";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'about',
  standalone: true,
  imports: [
    AboutCardComponent,
    BadgeModule,
    BadgeComponent,
    NgForOf,
    CustomButtonComponent,
    NgIf
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  appVersion: string = appVersion;
  appName: string = appName;
  githubURL: string = githubURL;

  aboutWebsiteCardDe: AboutCard = {
    title: "Über diese Webseite",
    heading: appName,
    text: [
      " - Diese Webseite wurde von Anfang an als Template entworfen, mit dem Ziel, dass jeder selbst schnell und umkompliziert seine eigene Webseite erstellen kann. Innerhalb weniger Minuten sollte sich jeder damit eine moderne Lebenslauf-Webseite erstellen können. Der Code ist Open-Source und ich freue mich sehr über die Weiteverwendung oder Contributions! Durch die frühe Planung dessen im Design muss für das Verwenden des Templates kein Code angepasst werden. Deshalb ist keine Programmiererfahrung notwendig; alle Daten für die Webseite sind einfach in JSON Dateien konfigurierbar. In Zukunft ist ein simples Web-Tool geplant, mit dem das Template ausgefüllt werden können soll, um den Prozess noch einfacher zu gestalten. Nach Anpassung des Templates mit den eigenen Daten kann es einfach über GitHub Pages veröffentlicht werden. Die Beschriebung für all diese Schritte ist im GitHub Projekt enthalten.",
      "Folgende Technologien wurden für die Erstellung dieses Projekts verwendet:"
    ]
  }

  aboutWebsiteCardEn: AboutCard = {
    title: "About this Website",
    heading: appName,
    text: [
      " - This website was designed from the outset as a template with the aim of enabling anyone to create their own website quickly and easily. Anyone should be able to create a modern CV website within a few minutes. The code is open source and I am very happy about further use or contributions! Due to the early planning of this in the design, no code needs to be adapted to use the template. Therefore no programming experience is necessary; all data for the website is easily configurable in JSON files. In the future, a simple web tool is planned with which the template can be filled out to make the process even easier. After customizing the template with your own data, it can be easily published via GitHub Pages. The description for all these steps is included in the GitHub project." +
      "The following technologies were used to create this project:"
    ]
  }

  constructor(readonly dataService: DataService, readonly langService: LanguageService) {}

}
