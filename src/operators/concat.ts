import * as Rx from 'rxjs/Rx';


// concat - concatentes 2 or more observables,
// e.g. wait for the previous to complete and then start the next 

Rx.Observable.of('Hello').
         merge(Rx.Observable.of('Everyone')).
         subscribe(x => {
                  console.log(x);
                  console.log(' ');
         });

const streamOne$ = Rx.Observable.interval(2000).take(5).
         map(x => "Stream One " + x);
const streamTwo$ = Rx.Observable.interval(500).take(10).
         map(x => "Stream Two " + x);
         
const stream$ = Rx.Observable.concat(streamOne$, streamTwo$);

stream$.subscribe(x => console.log(x));