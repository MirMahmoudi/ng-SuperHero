import { Component } from '@angular/core';

import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperHero.UI';
  public heroes: SuperHero[] = [];
  public heroToEdit?: SuperHero;

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit(): void {
    this.superHeroService.getHeroes()
        .subscribe( (heroes: SuperHero[]) => this.heroes = heroes);
  }

  public onInitNewHero = (): void => {
    this.heroToEdit = new SuperHero();
  }

  public onEdit = (hero: SuperHero): void => {
    this.heroToEdit = hero;
  }
  
  public  onCreateNewHero = (newHero: SuperHero): void => {
    this.superHeroService.createNewHero(newHero)
      .subscribe( (hero: SuperHero) => this.heroes.push(hero) );
  }

  public onUpdateHero = (hero: SuperHero): void => {
    this.superHeroService.updateHero(hero)
      .subscribe();
  }

  public onDeleteHero = (hero: SuperHero): void => {
    this.superHeroService.deleteHero(hero)
      .subscribe( () => this.heroes = this.heroes.filter(sh => sh.id !== hero.id) );
  }
}
