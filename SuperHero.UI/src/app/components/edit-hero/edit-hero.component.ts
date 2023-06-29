import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuperHero } from 'src/app/models/super-hero';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent {
  public warning = {name: '', firstName: '', lastName: '', place: ''};
  @Input() hero?: SuperHero;
  @Output() createEmitter: EventEmitter<SuperHero> = new EventEmitter();
  @Output() editEmitter: EventEmitter<SuperHero> = new EventEmitter();

  public createHero = (hero: SuperHero) => {
    this.handleError(hero);
    this.createEmitter.emit(hero);
    this.emptyForm();
  }

  public editHero = (hero: SuperHero) => {
    this.handleError(hero);
    this.editEmitter.emit(hero);
    this.emptyForm();
  }

  private handleError = (hero: SuperHero): void => {
    this.warning.name = hero.name == '' ? 'Please fill the Name field!' : '';
    this.warning.firstName = hero.firstName == '' ? 'Please fill the First Name field!' : '';
    this.warning.lastName = hero.lastName == '' ? 'Please fill the Last Name field!' : '';
    this.warning.place = hero.place == '' ? 'Please fill the Place field!' : '';

    if(this.warning.name !== '' ||
    this.warning.firstName !== '' ||
    this.warning.lastName !== '' ||
    this.warning.place !== '')
    throw new Error('The fields should be filled!');
  }

  private emptyForm = (): void => {
    this.hero = undefined;
    this.warning = {name: '', firstName: '', lastName: '', place: ''};
  }
}
