import * as Rx from 'rxjs/Rx';

// import { Observable } from "rxjs/Observable";
// import { Subscription } from "rxjs/Subscription";

/////////////////
// Promises
/////////////////
let promise = new Promise<string>(resolve => {
         setTimeout(() => {
                  resolve("Promise result");
         }, 2000);
});
promise.then(result => console.log(result)).
         catch(error => console.log("Promise error: " + error));

//////////////////////////////////////////////////////////////////////////////////////////////


/////////////////
// Observables
/////////////////

let observable$ = new Rx.Observable<string>(observer => {
         let timeout = setTimeout(() => {
                  observer.next("Observable result");
                  observer.complete();
         }, 2000);

         // this is the unsubscribe/dispose/cancel method
         return () => {
                  clearTimeout(timeout);
         };
});


let destroy: Rx.Subscription = observable$.subscribe(
         result => console.log(result),
         error => console.log("Observable error: " + error),
         () => console.log("Observable completed"));

// destroy.unsubscribe();

$(document).ready(() => {
         console.log('Ready');

});

