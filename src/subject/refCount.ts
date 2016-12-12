import * as Rx from 'rxjs/Rx';

// refCount makes the multicasted Observable automatically start executing
// when the first subscriber arrives, and stop executing when the last subscriber leaves.
// The refCount() method only exists on ConnectableObservable,
// and it returns an Observable, not another ConnectableObservable.


const source = Rx.Observable.interval(500);
const subject = new Rx.Subject();
const refCounted = source.multicast(subject).refCount();
let subscription1, subscription2;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);


// this is the same as the below - with manually keeping track of subscriptions and
// connecting after the first 'subscribe' is called 

// var source = Rx.Observable.interval(500);
// var subject = new Rx.Subject();
// var multicasted = source.multicast(subject);
// var subscription1, subscription2, subscriptionConnect;

// subscription1 = multicasted.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// // We should call `connect()` here, because the first
// // subscriber to `multicasted` is interested in consuming values
// subscriptionConnect = multicasted.connect();

// setTimeout(() => {
//   subscription2 = multicasted.subscribe({
//     next: (v) => console.log('observerB: ' + v)
//   });
// }, 600);

// setTimeout(() => {
//   subscription1.unsubscribe();
// }, 1200);

// // We should unsubscribe the shared Observable execution here,
// // because `multicasted` would have no more subscribers after this
// setTimeout(() => {
//   subscription2.unsubscribe();
//   subscriptionConnect.unsubscribe(); // for the shared Observable execution
// }, 2000);

