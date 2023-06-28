import { Component } from '@angular/core';
import { SuperHero } from './models/super-hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperHero.UI';
  public heroes: SuperHero[] = [];

  private getHeroes(): SuperHero[] {
    const hero1 = {
      name: 'Amazing Spider Man',
      firstName: 'Peter',
      lastName: 'Parker',
      place: 'New York City',
    };

    const hero2 = {
      name: 'Iron Man',
      firstName: 'Tony',
      lastName: 'Stark',
      place: 'Malibu',
    };
    
    this.heroes.push(hero1, hero2);
    return this.heroes;
  }

  ngOnInit(): void {
    this.getHeroes()
  }
}
