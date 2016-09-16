export interface IPeriod {
    retrieve(): Day[];
    //get description(): string;
    since: string;
    until: string;
}

export class Day implements IPeriod {
    private _days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    private _months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
	      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    constructor(private _date: Date) {}

    get name(): string {
	return this._days[this._date.getDay()] + ', ' + this._date.getDate() + ' de ' +
	    this._months[this._date.getMonth()]; 
    }

    get date(): Date {
	return this._date;
    }

    get isodate(): string {
	var year = this._date.getFullYear();
	var month: any = this._date.getMonth() + 1;
	var day:any = this._date.getDate();

	month = month.toString().length == 1 ? '0' + month.toString() : month.toString();
	day = day.toString().length == 1 ? '0' + day.toString() : day.toString();

	return [year, month, day].join('-');
    }

    retrieve(): Day[] {
	return [new Day(this._date)];
    }

    get since(): string {
	return this.isodate + ' 00:00:00';
    }

    get until(): string {
	return this.isodate + ' 23:59:59';
    }
}
