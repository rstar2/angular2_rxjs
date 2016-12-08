import * as Rx from 'rxjs/Rx';


// this is not good
Rx.Observable.of('Hello').
         subscribe(x => {
                  Rx.Observable.of(x + ' Everyone').
                           subscribe(x => console.log(x));
         });

// better to use mergeMap - !!! in the mapping function we return a new Observable
Rx.Observable.of('Hello').mergeMap(x => Rx.Observable.of(x + ' Everyone')).
         subscribe(x => console.log(x));