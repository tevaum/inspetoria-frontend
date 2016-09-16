import { Component } from '@angular/core';

//import { School } from './models/school';

//import { InspService } from './insp.service';

@Component({
    selector: 'insponline',
    template: `
<h5>{{title}}</h5>
<hr/>
<router-outlet></router-outlet>
`
})
export class AppComponent {
    title = 'Inspetoria Online'
}
