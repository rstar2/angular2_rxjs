import * as Rx from 'rxjs/Rx';

let observable$ = new Rx.Observable<string>(observer => {
         console.log("Observable created");

         observer.next("Observable value 1");
         observer.next("Observable value 2");

         let timeout = setTimeout(() => {
                  observer.next("Observable value 3");
                  observer.next("Observable value 4");

                  observer.error(new Error("Oopps..."));

                  // needed if we want the stream to complete
                  observer.complete();
         }, 2000);

         // this is the unsubscribe/dispose/cancel method
         return () => {
                  clearTimeout(timeout);
         };
});


let destroy: Rx.Subscription = observable$.
         // this line will allow the stream to complete event after error has been raised
         catch(err => Rx.Observable.of(err)).

         subscribe(
         result => console.log(result),
         error => console.log("Observable error: " + error),
         () => console.log("Observable completed"));

// destroy.unsubscribe();