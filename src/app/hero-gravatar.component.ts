import {Component, Input, DoCheck} from '@angular/core';
import {Hero} from './hero';
import * as md5 from 'blueimp-md5';

const getGravatarUrl = email => `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=80&d=monsterid&r=r`;

@Component({
  selector: 'my-hero-gravatar',
  template: `
    <img src="{{gravatarImageUrl}}" *ngIf="hero" />
  `
})
export class HeroGravatarComponent implements DoCheck {

  @Input() hero: Hero;
  gravatarImageUrl = '';

  ngDoCheck(): void {
    if (this.hero && this.hero.email) {
      this.gravatarImageUrl = getGravatarUrl(this.hero.email);
    }
  }

}
