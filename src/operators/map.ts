import * as Rx from 'rxjs/Rx';

// Applies a given project function to each value emitted by the source Observable,
// and emits the resulting values as an Observable.

// Like Array.prototype.map(), it passes each source value through
// a transformation function to get corresponding output values.

const stream$ = Rx.Observable.interval(100). // emit every 100 ms
         take(5).                            // take 5 times
         map(v => 2*v);                      // double it

stream$.subscribe(
         x => {
                  console.log(x);
         },
         err => {
                  console.log(err);
         },
         () => {
                  console.log("Completed");
         }
);