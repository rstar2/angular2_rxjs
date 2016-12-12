import * as Rx from 'rxjs/Rx';

const users = [
         { name: "Will", age: 45 },
         { name: "Rumen", age: 39 },
         { name: "Ivan", age: 43 }
];

const users$ = Rx.Observable.from(users).
         pluck('name');             // shortcut to map(v => v['name'])

users$.subscribe(
         name => {
                  console.log(name);
         });