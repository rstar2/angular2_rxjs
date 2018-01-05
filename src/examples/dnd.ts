import * as $ from 'jquery';
import * as Rx from 'rxjs/Rx';

$(document).ready(() => {
    $('body').append(`
        <button id="btnClick">Click</button>
        <hr/>

        <input id="input" type="text"/>

        <hr/>

        <div id="report"></div>
        `);

    const $btn = $('#btnClick');
    const btnClickStream$ = Rx.Observable.fromEvent($btn, 'click');
    btnClickStream$.subscribe(event => console.log('Clicked'));

    const $input = $('#input');
    const inputKeyStream$ = Rx.Observable.fromEvent($input, 'keyup');
    inputKeyStream$.subscribe((event: any) => {
        console.log('value - ' + event.target.value);
    });
});