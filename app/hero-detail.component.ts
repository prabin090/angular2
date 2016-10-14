import {Hero} from './hero';
import { Component, Input, OnInit, Directive} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';
import {ModalModule} from "ng2-modal";
import { PushNotificationsService, SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import {HeroesComponent} from './heroes.component';
import {ProgressPieChartService} from './progresspiechart.service'


@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css'],
    providers: [HeroesComponent, ProgressPieChartService]
})

export class HeroDetailComponent implements OnInit {
    @Input()
    hero: Hero;
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location,
        private _pushNotifications: PushNotificationsService,
        private _notificationsService: NotificationsService,
        private _service: SimpleNotificationsModule,
        private herocomponent: HeroesComponent,
        private progresspie: ProgressPieChartService

    ) { }

    ngOnInit(): void {
console.log(this.herocomponent.myvalue)
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });

        this._pushNotifications.requestPermission();
        this._pushNotifications.create('HEROES', {
            body: 'something',
            icon: 'app/pokemon.png',
            dir: 'rtl', noscreen: true
        }).subscribe(
            // (res: any) => console.log(res),
            // (err: any) => console.log(err)
            )

    }

    goBack(): void {
        this.location.back();
    }
    public options = {
        position: ["left"],
        timeOut: 5000,
        lastOnBottom: true

    }


}

