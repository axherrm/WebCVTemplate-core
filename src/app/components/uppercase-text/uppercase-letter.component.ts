import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'uppercase-letter',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  template: "{{ uppercase }}"
})
export class UppercaseLetterComponent {

  @Input({required: true})
  letter: string;

  isAlreadyUppercase: boolean;
  uppercase: string;

  @HostBinding("style.fontSize") fontSize: string;

  ngOnInit() {
    this.uppercase = this.letter.toUpperCase();
    this.isAlreadyUppercase = this.uppercase === this.letter;
    this.fontSize = this.isAlreadyUppercase ?"1em" : "0.8em";
  }


}
