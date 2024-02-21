import {ApplicationConfig} from '@angular/core';
import {provideRouter} from "@angular/router";
import {MainContentComponent} from "./layout/main-content.component";
import {provideAnimations} from "@angular/platform-browser/animations";

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
      ],
    ),
    provideAnimations()
  ]
};
