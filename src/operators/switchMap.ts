import * as Rx from 'rxjs/Rx';

function getUserObservable(name: string): Rx.Observable<any> {
         return new Rx.Observable(observer => {
                  const jqXHR: JQueryXHR = $.ajax({
                           method: 'GET',
                           url: 'https://api.github.com/users/' + name,
                           dataType: 'jsonp'
                  });

                  jqXHR.done(v =>
                           observer.next(v)).
                           fail(err =>
                                    observer.error(err)).
                           always(() =>
                                    observer.complete());

                  // this is the unsubscribe/dispose/cancel method
                  return () => {

                           // NOTE - JSONP requests cannot be aborted, so this will have no efect

                           jqXHR.abort("Cancel");
                  };
         });
}

$(document).ready(() => {
         // same example as in from-ajax.ts but with switchMap

         Rx.Observable.fromEvent($("#input"), 'keyup').
                  map((event: any) => event.target.value).
                  switchMap(name => getUserObservable(name)).
                  subscribe(result => {
                           const userData = result.data;
                           console.log("User data: " + userData);
                           $("#report").html(`Url - ${userData.url}`);
                  });
});

