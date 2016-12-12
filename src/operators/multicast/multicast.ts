import * as Rx from 'rxjs/Rx';

// multicast returns an Observable that looks like a normal Observable,
// but works like a Subject when it comes to subscribing.
// multicast returns a ConnectableObservable, which is simply an Observable with the connect() method.
// The connect() method is important to determine exactly when the shared Observable execution will start.
// Because connect() does source.subscribe(subject) under the hood, connect() returns a Subscription,
// which you can unsubscribe from in order to cancel the shared Observable execution.

const source = Rx.Observable.from([1, 2, 3]);
const subject = new Rx.Subject();
const multicasted = source.multicast(subject);

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();