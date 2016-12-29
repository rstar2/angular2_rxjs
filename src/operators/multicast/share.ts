import * as Rx from 'rxjs/Rx';

// Returns a new Observable that multicasts (shares) the original Observable.
// As long as there is at least one Subscriber this Observable will be subscribed and emitting data.
// When all subscribers have unsubscribed it will unsubscribe from the source Observable.
// Because the Observable is multicasting it makes the stream hot.
// This is an alias for .publish().refCount().

// COLD.share() = HOT
// COLD - new produced created for each subscription
// HOT  - a single producer is created on the first subscription

// ------------------------------------------------------------------------------------
// Cold vs Hot Observables - http://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html

// 1. COLD observable - new produced created for each subscription
let obsCold = Rx.Observable.create(observer => observer.next(Date.now()));

obsCold.subscribe(v => console.log('1st subscriber: ' + v));
obsCold.subscribe(v => console.log('2nd subscriber: ' + v));

// 1st subscriber: 1465990942935
// 2nd subscriber: 1465990942936

// ------------------------------------------------------------------------------------

// 2. WARM obsrvable - only one new producer created when 'connect' is called
let obsWarm = Rx.Observable.create(observer => observer.next(Date.now()))
         .publish();

obsWarm.subscribe(v => console.log('1st subscriber: ' + v));
obsWarm.subscribe(v => console.log('2nd subscriber: ' + v));

// we have to call 'connect' in order the producer to start producing values and so subscribers to get them
obsWarm.connect();

// 1st subscriber: 1465994477014
// 2nd subscriber: 1465994477014

// ------------------------------------------------------------------------------------

// 3. TOO HOT observable (single produced value)
let obsTooHotSingle = Rx.Observable.create(observer => observer.next(Date.now()))
         .publish();
obsTooHotSingle.connect(); // start producing now even there're no subscriptions

obsTooHotSingle.subscribe(v => console.log('1st subscriber: ' + v));
obsTooHotSingle.subscribe(v => console.log('2nd subscriber: ' + v));

// nothing will output as when connect is called and producer is created there are no subscribers

// ------------------------------------------------------------------------------------

// 4. TOO HOT observable (infinite produced values)
let obsTooHotInfinite = Rx.Observable.interval(1000)
         .publish();
obsTooHotInfinite.connect(); // start producing now even there're no subscriptions

// setTimeout(() => {
//          obsTooHotInfinite.subscribe(v => console.log('1st subscriber:' + v));
//          setTimeout(() =>
//                   obsTooHotInfinite.subscribe(v => console.log('2nd subscriber:' + v)), 1000);
// }, 2000);

// 1st subscriber:2
// 1st subscriber:3
// 2nd subscriber:3
// 1st subscriber:4
// 2nd subscriber:4
// 1st subscriber:5
// 2nd subscriber:5
// ....

// ------------------------------------------------------------------------------------

// 5. HOT observable (infinite produced values) - 
let obsTooHot = Rx.Observable.interval(1000)
         .publish().refCount();   // .publish().refCount() is same as .share()
// refCount() will connect() the 'warm' observable when the first subcription comes 

setTimeout(() => {
         obsTooHot.subscribe(v => console.log('1st subscriber:' + v));
         setTimeout(() =>
                  obsTooHot.subscribe(v => console.log('2nd subscriber:' + v)), 1000);
}, 2000);

// 1st subscriber:0
// 1st subscriber:1
// 2nd subscriber:1
// 1st subscriber:2
// 2nd subscriber:2
// ....

// 6. Useful - .publishLast()
