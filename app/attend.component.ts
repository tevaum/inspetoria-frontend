import { Component, OnInit } from '@angular/core';

import { Attend } from './models/attend';
import { AttendDayComponent } from './attend-day.component';

import { Day, IPeriod } from './utils/day';

import { InspService } from './insp.service';

function shift2int(shift: string) {
    if (shift == 'Matutino') return 0;
    if (shift == 'Vespertino') return 1;
    return 2;
}

@Component({
    selector: 'attend',
    template: `
<h6>Atendimentos</h6>
<attend-day *ngFor="let day of period.retrieve()" [day]="day" [attends]="get_attends(day.isodate)" (day_selected)="add_attend($event)" (attend_selected)="edit_attend($event)" (delete_attend)="del_attend($event)"></attend-day>
<br clear="both"/>
<attend-form *ngIf="selected" [attend]="selected" (attend_added)="update_attends()" (onclose)="close_form()" ></attend-form>
`,
    providers: [InspService],
    directives: [AttendDayComponent]
})
export class AttendComponent {
    period: IPeriod = new Week();
    attends: Attend[] = [];
    selected: Attend;

    constructor(private insp_service: InspService) {}

    ngOnInit(): void {
	this.update_attends();
    }

    select(attend: Attend): void {
	this.selected = attend;
    }

    get_attends(day: string): Attend[] {
    	return this.attends.filter((attend) => {
    	    return attend.date == day;
    	}).sort(function(a, b) {
	    return shift2int(a.shift) - shift2int(b.shift);
	});
    }

    add_attend(day): void {
	this.selected = new Attend();
	this.selected.date = day.isodate;
    }

    edit_attend(attend: Attend): void {
	console.log('Received attend to edit:', attend);
	this.selected = attend;
    }

    del_attend(attend: Attend): void {
	this.insp_service.del_attend(attend).then(() => {
	    this.update_attends();
	});
    }

    update_attends(): void {
	this.insp_service.attends(this.period.since, this.period.until).then((attends) => {
	    this.attends = attends;
	});
    }

    close_form(): void {
	this.selected = null;
    }
}

class Week implements IPeriod {
    private _days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    private _months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
	      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    today = new Date();
    days: Date[] = [];

    constructor() {
	for (var i = 1; i < 6; i++) {
	    var date = new Date();
	    date.setDate(this.today.getDate() - this.today.getDay() + i);
	    this.days.push(date);
	}
    }

    format() {
	const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
	const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
			'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	return this.days.map((d: Date) => {
	    return days[d.getDay()] + ', ' + d.getDate() + ' de ' + months[d.getMonth()]; 
	});
    }

    name(date: Date): string {
	return this._days[date.getDay()] + ', ' + date.getDate() + ' de ' +
	    this._months[date.getMonth()]; 
    }

    range() {
	var ya = this.days[0].getFullYear().toString();
	var ma = (this.days[0].getMonth() + 1).toString();
	var da = this.days[0].getDate().toString();

	var yb = this.days[4].getFullYear().toString();
	var mb = (this.days[4].getMonth() + 1).toString();
	var db = this.days[4].getDate().toString();

	if (ma.length == 1) ma = '0' + ma;
	if (da.length == 1) da = '0' + da;

	if (mb.length == 1) mb = '0' + mb;
	if (db.length == 1) db = '0' + db;

	return [
	    [ya, ma, da].join('-'),
	    [yb, mb, db].join('-'),
	]
    }

    retrieve() {
	return this.days.map((d) => {
	    return new Day(d);
	});
    }

    get since(): string {
	var days = this.range();
	return days[0];
    }

    get until(): string {
	var days = this.range();
	return days[1];
    }
}
