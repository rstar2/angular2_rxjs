import * as Rx from 'rxjs/Rx';


// merge - merges 2 or more observables

Rx.Observable.of('Hello').
         merge(Rx.Observable.of('Everyone')).
         subscribe(x => {
                  console.log(x);
                  console.log(' ');
         });

const streamOne$ = Rx.Observable.interval(2000).take(5).map(x => "Stream One " + x);                            
const streamTwo$ = Rx.Observable.interval(500).take(10).map(x => "Stream Two " + x);                            

// const stream$ = Rx.Observable.merge(streamOne$, streamTwo$);
// this the same
const stream$ = streamOne$.merge(streamTwo$);

stream$.subscribe(x => console.log(x));