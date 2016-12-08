import * as Rx from 'rxjs/Rx';


const promise = new Promise<string>((resolve, reject) => {
         setTimeout(() => {
                  resolve("Promise result");
         }, 2000);
});
// promise.then(result => console.log(result)).
//          catch(error => console.log("Promise error: " + error));

const stream$ = Rx.Observable.fromPromise(promise);
stream$.subscribe(result => console.log(result),
         error => console.log("Promise error: " + error)
);