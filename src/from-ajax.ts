import * as Rx from 'rxjs/Rx';

function getUser(name: string): Promise<any> {
         const jQueryPromise: JQueryPromise<any> = $.ajax({
                  method: 'GET',
                  url: 'https://api.github.com/users/' + name,
                  dataType: 'jsonp'
         }).promise();

         // convert the JQueryPromise to ES6 Promise object
         return Promise.resolve(jQueryPromise);
}

// create observable from it
Rx.Observable.fromPromise(getUser("rstar2")).
         subscribe(result => {
                  const userData = result.data;
                  console.log("User data: " + userData);
                  $("#report").html(`Url - ${userData.url}`);
         });

$(document).ready(() => {

         // this is better to be done with operators like switchMap (like in operator/switchMap.ts)
         // but just to show a possible usage

         Rx.Observable.fromEvent($("#input"), 'keyup').
                  subscribe((event: any) => {
                           Rx.Observable.fromPromise(getUser(event.target.value)).
                                    subscribe(result => {
                                             const userData = result.data
                                             console.log("User data: " + userData);
                                             $("#report").html(`Url - ${userData.url}`);
                                    });
                  });
});

