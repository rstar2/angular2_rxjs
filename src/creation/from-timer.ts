import * as Rx from 'rxjs/Rx';

// very similar to interval
const stream$ = Rx.Observable.timer(5000, 100). //  start emit after timout 15000000 ms
         take(5);                               // take 5 times

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