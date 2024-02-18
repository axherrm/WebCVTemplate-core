import {EventEmitter, HostListener, Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {ActivatedRoute, OnSameUrlNavigation, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang: string;

  /**
   * Emitted when the user switches language
   */
  langChange: EventEmitter<string> = new EventEmitter<string>(true);

  constructor(private dataService: DataService, readonly router: Router, readonly activatedRoute: ActivatedRoute) {
    this.determineLanguageOnStartup();
  }

  /**
   * Called on startup of page. Determines the language to use by the following priority:
   *  1. local storage
   *  2. default language of browser
   *  3. default language configured in general.json
   */
  determineLanguageOnStartup(): void {
    let lang = localStorage.getItem("lang");
    if (lang) {
      this.setLang(lang, false);
      return;
    }
    lang = navigator.language;
    if (lang) {
      lang = lang.trim().split("-")[0];
      if (this.dataService.loadedLanguages.includes(lang)) {
        this.setLang(lang, false);
        return;
      }
    }
    this.setLang(this.dataService.defaultLang, false);
  }

  /**
   * As {@link determineLanguageOnStartup} is executed before URL langParam is available,
   * this method checks if such a param is present and if it differs from previous selected language.
   * @param langParam
   */
  searchForURLLang(langParam: string | null) {
    if (langParam) {
      const lang = langParam.trim();
      if (this.dataService.loadedLanguages.includes(lang)) {
        if (this.lang !== lang) {
          this.setLang(lang, true);
          return;
        }
      }
    }
    this.writeToURL(this.lang, true);
  }

  checkIfURLLangChanged(lang: string) {
    console.log("checkIfURLLangChanged", lang, this.lang)
    console.log(location.pathname)
    if (this.lang !== lang) {
      console.log("if")
      this.setLang(lang, false);
    }
  }

  /**
   * Sets new active language, writes it to local storage and (re-)loads data for language
   * @param newLang
   * @param writeToURL
   */
  setLang(newLang: string, writeToURL: boolean): void {
    this.lang = newLang;
    localStorage.setItem("lang", this.lang);
    this.dataService.loadData(this.lang);
    this.langChange.emit(newLang);
    if (writeToURL) {
      this.writeToURL(this.lang);
    }
  }

  writeToURL(lang: string, replaceUrl: boolean = false, onSameUrlNavigation: OnSameUrlNavigation = "ignore") {
    document.documentElement.lang = lang;
    this.router.navigate(
      [lang],
      {
        replaceUrl: replaceUrl,
        onSameUrlNavigation: onSameUrlNavigation
      }
    );
  }

}
