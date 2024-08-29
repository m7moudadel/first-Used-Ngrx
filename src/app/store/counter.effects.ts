import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';

import { decrement, increment, init, set } from './counter.actions';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  loadCounter= createEffect(
()=>
      this.actions$.pipe(
        ofType(init),
        switchMap(()=>{
          const counter =localStorage.getItem('count')
          if (counter) {

            return of(set({value:+counter}) )
          }
          return of(set({value:0}) )
        }
      )
      )

  )
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action,counter]) => {
          console.log(action);
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions , private store:Store<{counter:number}>) {}
}
