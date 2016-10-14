import { Component, OnInit, Input } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
import {ProgressPieChartService} from './progresspiechart.service';
// declare globalhero:any
@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers: [ProgressPieChartService]
})

export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  // @Input() myvalue: Hero
  public myvalue:Hero=this.selectedHero
  constructor(private heroService: HeroService, private router: Router, private progresschart: ProgressPieChartService) { }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
    this.myvalue = this.selectedHero
    console.log( this.myvalue ,'hero')
    this.progresschart.CreatepieChartnew(".progressChart", this.selectedHero);
  }
}
// export var heronew: Hero
