import {ApplicationConfig} from '@angular/core';
import {provideRouter} from "@angular/router";
import {MainContentComponent} from "./main-content/main-content.component";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: ":lang",
        component: MainContentComponent,
      },
      {
        path: "",
        component: MainContentComponent
      },
    ])
  ]
};
