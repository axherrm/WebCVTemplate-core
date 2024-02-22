import {Injectable} from '@angular/core';
import {
  AboutCard,
  ContactMessages,
  EducationItem,
  ExperienceItem,
  LanguagePack,
  MailSettings,
  Skill,
  SkillCategory, SocialMediaItem
} from "../model/model";
import * as educationJson from '../../../../input/data/education.json';
import * as generalJson from '../../../../input/data/general.json';
import * as experienceJson from '../../../../input/data/experience.json';
import * as skillsJson from '../../../../input/data/skills.json';
import * as aboutJson from '../../../../input/data/about.json';
import * as contactJson from '../../../../input/data/contact.json';
import * as backgroundJson from '../../../../input/data/settings/background.json';
import {BackgroundSettings} from "../model/internal";

/**
 * Service that imports all the customizable JSON data and stores them.
 * Access user data through this service.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  defaultLang: string = generalJson.defaultLanguage;
  loadedLanguages: string[] = generalJson.languages;
  showAboutWebsite: boolean = generalJson.showAboutWebsite;
  mailSettings: MailSettings = contactJson["mail-settings"];
  backgroundSettings: BackgroundSettings = new BackgroundSettings(backgroundJson);
  socialMedia: SocialMediaItem[] = contactJson["social-media"];

  /**
   * Language specific data
   */
  languagePack: LanguagePack;
  education: EducationItem[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  about: AboutCard[];
  contact: ContactMessages;

  loadData(lang: string): void {
    // @ts-ignore
    this.languagePack = new LanguagePack(generalJson[lang]);
    // @ts-ignore
    this.education = educationJson[lang];
    // @ts-ignore
    this.experience = experienceJson[lang];
    // @ts-ignore
    this.skillCategories = skillsJson[lang];
    this.skills = [];
    for (let skillCategory of this.skillCategories) {
      this.skills = this.skills.concat(skillCategory.skills);
    }
    // @ts-ignore
    this.about = aboutJson[lang];
    // @ts-ignore
    this.contact = contactJson[lang];
    console.log("Loaded data for lang", lang);
  }
}
