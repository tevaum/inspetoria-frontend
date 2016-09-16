import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { School } from './models/school';
import { User } from './models/user';
import { Attend } from './models/attend';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InspService {
    constructor(private http: Http) { }

    private api_error (err: any): Promise<any> {
	console.error('[API Client] Error:', err);
	return Promise.reject(err.message || err);
    }

    schools(): Promise<School[]> {
	return this.http
	    .get('/api/escolas')
	    .toPromise()
	    .then(response => response.json() as School[])
	    .catch(this.api_error);
    }

    add_school(school: School): Promise<void> {
	var data = JSON.stringify(school);
	var headers = new Headers({'Content-Type': 'application/json'});
	var opts = new RequestOptions({headers: headers});
	return this.http
	    .post('/api/escolas', data, opts)
	    .toPromise()
	    .then(response => {return;})
	    .catch(this.api_error);
    }

    users(): Promise<User[]> {
	return this.http
	    .get('/api/usuarios')
	    .toPromise()
	    .then(response => response.json() as User[])
	    .catch(this.api_error);
    }

    add_user(user: User): Promise<void> {
	var data = JSON.stringify(user);
	var headers = new Headers({'Content-Type': 'application/json'});
	var opts = new RequestOptions({headers: headers});
	return this.http
	    .post('/api/usuarios', data, opts)
	    .toPromise()
	    .then(response => {return;})
	    .catch(this.api_error);
    }

    attends(since: string, until: string): Promise<Attend[]> {
	var uri = '/api/atendimentos/periodo/' + since + '/' + until;
	console.log('requesting api:', uri);

	return this.http
	    .get(uri)
	    .toPromise()
	    .then(response => response.json() as Attend[])
	    .catch(this.api_error);
    }

    attends_for(date: string): Promise<Attend[]> {
	return this.http
	    .get('/api/atendimentos/' + date)
	    .toPromise()
	    .then(response => response.json() as Attend[])
	    .catch(this.api_error);
    }

    add_attend(attend: Attend): Promise<void> {
	var data = JSON.stringify(attend);
	var headers = new Headers({'Content-Type': 'application/json'});
	var opts = new RequestOptions({headers: headers});
	return this.http
	    .post('/api/atendimentos', data, opts)
	    .toPromise()
	    .then(response => {return;})
	    .catch(this.api_error);
    }

    del_attend(attend: Attend): Promise<void> {
	var data = JSON.stringify(attend);
	return this.http
	    .delete('/api/atendimentos/' + attend.id)
	    .toPromise()
	    .then(response => {return;})
	    .catch(this.api_error);
    }
}
