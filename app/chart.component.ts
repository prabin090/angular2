import { Component, EventEmitter, Renderer, ElementRef } from '@angular/core';
import * as d3  from 'd3';
import {ProgressPieChartService} from './progresspiechart.service';
import { Hero } from './hero';
import {HEROES} from  './mock-heros'
import { HeroService } from './hero.service';
import {DashboardComponent} from './dashboard.component'

@Component({
    selector: 'my-chart',
    templateUrl: 'app/chart.component.html',
    providers: [ProgressPieChartService, DashboardComponent]

})


export class ChartComponent {
    constructor(el: ElementRef, renderer: Renderer,
        private progressBar: ProgressPieChartService,
        private dashboardcomponent: DashboardComponent
    ) { };
    data: Hero;
    ngOnInit(hero: Hero): void {

        var donutDatanew = [
            { "name": 'Firm1', 'id': 185, 'total': 300 },
            { "name": 'Firm2', 'id': 70, 'total': 100 },
            { "name": 'Firm3', 'id': 174, 'total': 300 },
            { "name": 'Firm4', 'id': 5, 'total': 100 },
            { "name": 'Firm5', 'id': 26, 'total': 100 },
        ];

        var index = Math.floor(Math.random() * 10);
        // this.progressBar.CreatepieChartnew(<any>".progressChart", <any>HEROES[index]);

    }


}