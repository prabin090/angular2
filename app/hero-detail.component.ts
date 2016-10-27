import {Hero} from './hero';
import { Component, Input, OnInit, Directive} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';
import {ModalModule} from "ng2-modal";
import { PushNotificationsService, SimpleNotificationsModule, NotificationsService, Options } from 'angular2-notifications';
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
        // private _notificationsService: NotificationsService,
        // private _service: SimpleNotificationsModule,
        private herocomponent: HeroesComponent,
        private progresspie: ProgressPieChartService,
        private _service: NotificationsService,
        private _push: PushNotificationsService

    ) { }

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public deleteId: string;

    public temp: boolean[] = [true, false];
    ngOnInit(): void {

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
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        rtl: false,
        animate: 'scale',
        position: ['right', 'bottom']
    };
    create() {
        switch (this.type) {
            case 'success':
                let a = this._service.success(this.title, this.content, { id: 123 });
                break;
            case 'alert':
                this._service.alert(this.title, this.content);
                break;
            case 'error':
                this._service.error(this.title, this.content);
                break;
            case 'info':
                this._service.info(this.title, this.content);
                break;
            case 'bare':
                this._service.bare(this.title, this.content);
                break;
        }
    }

    onCreate(event: any) {
        console.log(event);
    }

    onDestroy(event: any) {
        console.log(event);
    }

}

