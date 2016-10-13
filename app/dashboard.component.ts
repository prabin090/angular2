import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import {ProgressPieChartService} from './progresspiechart.service';


@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css'],
    providers: [ProgressPieChartService]
})

export class DashboardComponent extends ProgressPieChartService {

    heroes: Hero[] = [];

    constructor(private heroService: HeroService, private router: Router) { super() }


    ngOnInit(hero: Hero): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
        this.CreatepieChartnew(".progressChart", hero);
    }



}
