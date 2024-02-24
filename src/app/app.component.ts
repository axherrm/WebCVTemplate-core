import {Component, HostListener} from '@angular/core';
import {NgIf} from "@angular/common";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    ToastModule,
    AppLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {

  protected readonly environment = environment;

  public windowWidth: number;

  constructor(readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    this.updateWindowWidth();
  }

  ngAfterViewInit() {
    if (this.windowWidth < 800) {
      this.showMobileNotSupportedToast();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateWindowWidth();
  }

  updateWindowWidth() {
    const oldWidth = this.windowWidth;
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 800 && oldWidth >= 800) {
      this.showMobileNotSupportedToast();
    }
  }

  showMobileNotSupportedToast() {
    this.messageService.add({
      styleClass: "mobile-not-supported-toast",
      severity: "info",
      summary: "Unsupported",
      life: 6000,
      detail: "This website does currently not support mobile devices. To see the website, please use a desktop device."
    });
  }

}
