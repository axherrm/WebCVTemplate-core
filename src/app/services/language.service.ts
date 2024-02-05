import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang: string;

  /**
   * Emitted when the user switches language
   */
  langChange: EventEmitter<string> = new EventEmitter<string>(true);

  constructor(private dataService: DataService) {
    this.determineLanguage();
  }

  /**
   * Called on startup of page. Determines the language to use by the following priority:
   *  1. local storage
   *  2. default language of browser
   *  3. default language configured in general.json
   */
  determineLanguage(): void {
    let lang = localStorage.getItem("lang");
    if (lang) {
      this.setLang(lang);
      return;
    }
    lang = navigator.language;
    if (lang) {
      lang = lang.trim().split("-")[0];
      if (this.dataService.loadedLanguages.includes(lang)) {
        this.setLang(lang);
        return;
      }
    }
    this.setLang(this.dataService.defaultLang);
  }

  /**
   * Sets new active language, writes it to local storage and (re-)loads data for language
   * @param newLang
   */
  setLang(newLang: string): void {
    this.lang = newLang;
    localStorage.setItem("lang", this.lang);
    this.dataService.loadData(this.lang);
    this.langChange.emit(newLang);
  }

}
