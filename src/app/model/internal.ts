import {IBackgroundSettings} from "./model";

export interface BackgroundImageOption {
  path: string;
  media: string;
}

export class BackgroundSettings implements IBackgroundSettings {
  backgroundImageFolder: string;
  widths: number[];
  defaultWidth: number;
  aspectRatio: number;
  fileExtension: string;
  preview?: string;

  /**************************
   *        Computed        *
   **************************/

  imageOptions: BackgroundImageOption[];
  defaultOption: BackgroundImageOption;

  constructor(settings: IBackgroundSettings) {
    Object.assign(this, settings);
    this.computeBackgroundImageOptions();
  }

  /**
   * Computes information for creating the <picture> element.
   * Media query results in images being shown only when the screen is either as high or as broad as the image.
   */
  computeBackgroundImageOptions(): void {
    this.imageOptions = this.widths
      .sort((width1, width2) => {
        return width2 - width1;
      })
      .map(width => {
        return {
          path: `${this.backgroundImageFolder}${width}${this.fileExtension}`,
          media: `(min-width: ${width}px), (min-height: ${Math.floor(width / this.aspectRatio)}px)`
        }
      });
    this.defaultOption = {
      path: `${this.backgroundImageFolder}${this.defaultWidth}${this.fileExtension}`,
      media: ""
    };
  }
}
