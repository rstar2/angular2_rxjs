import * as Rx from 'rxjs/Rx';

$(document).ready(() => {
         observableDom();
});

function observableDom() {
         const $btn = $("#btnClick");
         const btnClickStream$ = Rx.Observable.fromEvent($btn, 'click');
         btnClickStream$.subscribe(event => console.log('Clicked'));

         const $input = $("#input");
         const inputKeyStream$ = Rx.Observable.fromEvent($input, 'keyup');
         inputKeyStream$.subscribe((event: any) => {
                  console.log('value - ' + event.target.value);
         });
}