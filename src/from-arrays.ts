import * as Rx from 'rxjs/Rx';

const numbers = [12, 44, 56, 32, 8];

const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
         number => {
                  console.log(number);
         },
         err => { },
         () => {
                  console.log("Completed");
         });