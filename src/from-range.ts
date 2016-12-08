import * as Rx from 'rxjs/Rx';

const stream$ = Rx.Observable.range(5, 60);                               // take 5 times

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