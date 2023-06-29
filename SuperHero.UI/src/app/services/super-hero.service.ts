import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Environment } from '../environment/environment';
import { SuperHero } from '../models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  private url: string = 'SuperHero';

  constructor(private http: HttpClient) { }

  public getHeroes = (): Observable<SuperHero[]> =>
    this.http.get<SuperHero[]>(`${Environment.apiUrl}/${this.url}`);

  public getHeroById = (id: number): Observable<SuperHero> =>
    this.http.get<SuperHero>(`${Environment.apiUrl}/${this.url}/${id}`);

  public createNewHero = (newHero: SuperHero): Observable<SuperHero> =>
    this.http.post<SuperHero>(`${Environment.apiUrl}/${this.url}/Add`, newHero, this.getOption());

  public updateHero = (hero: SuperHero): Observable<SuperHero> =>
    this.http.put<SuperHero>(`${Environment.apiUrl}/${this.url}/Update/${hero.id}`, hero, this.getOption());

  public deleteHero = (hero: SuperHero): Observable<SuperHero> =>
    this.http.delete<SuperHero>(`${Environment.apiUrl}/${this.url}/Remove/${hero.id}`);

  private getOption = (): {headers: HttpHeaders} => ({
    headers: new HttpHeaders ({'Content-Type': 'application/json'}) });
}
