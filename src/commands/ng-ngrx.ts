import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

function actionRender(name: string) {
  const className = name
  const classNameUpper = className.toUpperCase()
  const classNameFirstLower = className[0].toLocaleLowerCase() + className.slice(1)
  return `
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum ${className}ActionTypes {
  LOAD_${classNameUpper}S = '[${className}] Load ${className}s',
  ADD_${classNameUpper} = '[${className}] Add ${className}',
  UPSERT_${classNameUpper} = '[${className}] Upsert ${className}',
  ADD_${classNameUpper}S = '[${className}] Add ${className}s',
  UPSERT_${classNameUpper}S = '[${className}] Upsert ${className}s',
  UPDATE_${classNameUpper} = '[${className}] Update ${className}',
  UPDATE_${classNameUpper}S = '[${className}] Update ${className}s',
  DELETE_${classNameUpper} = '[${className}] Delete ${className}',
  DELETE_${classNameUpper}S = '[${className}] Delete ${className}s',
  CLEAR_${classNameUpper}S = '[${className}] Clear ${className}s',
  // BE
  ADD_${classNameUpper}_BE = '[${className}] Add ${className} BE',
  UPDATE_${classNameUpper}_BE = '[${className}] Update ${className} BE',
  DELETE_${classNameUpper}_BE = '[${className}] Delete ${className} BE',
  LOAD_${classNameUpper}S_BE = '[${className}] Load ${className}s BE',
}

export class Load${className}s implements Action {
  readonly type = ${className}ActionTypes.LOAD_${classNameUpper}S;

  constructor(public payload: { ${classNameFirstLower}s: I${className}Get[] }) { }
}

export class Add${className} implements Action {
  readonly type = ${className}ActionTypes.ADD_${classNameUpper};

  constructor(public payload: { ${classNameFirstLower}: I${className}Get }) { }
}

export class Upsert${className} implements Action {
  readonly type = ${className}ActionTypes.UPSERT_${classNameUpper};

  constructor(public payload: { ${classNameFirstLower}: I${className}Get }) { }
}

export class Add${className}s implements Action {
  readonly type = ${className}ActionTypes.ADD_${classNameUpper}S;

  constructor(public payload: { ${classNameFirstLower}s: I${className}Get[] }) { }
}

export class Upsert${className}s implements Action {
  readonly type = ${className}ActionTypes.UPSERT_${classNameUpper}S;

  constructor(public payload: { ${classNameFirstLower}s: I${className}Get[] }) { }
}

export class Update${className} implements Action {
  readonly type = ${className}ActionTypes.UPDATE_${classNameUpper};

  constructor(public payload: { ${classNameFirstLower}: Update<I${className}Get> }) { }
}

export class Update${className}s implements Action {
  readonly type = ${className}ActionTypes.UPDATE_${classNameUpper}S;

  constructor(public payload: { ${classNameFirstLower}s: Update<I${className}Get>[] }) { }
}

export class Delete${className} implements Action {
  readonly type = ${className}ActionTypes.DELETE_${classNameUpper};

  constructor(public payload: { id: string }) { }
}

export class Delete${className}s implements Action {
  readonly type = ${className}ActionTypes.DELETE_${classNameUpper}S;

  constructor(public payload: { ids: string[] }) { }
}

export class Clear${className}s implements Action {
  readonly type = ${className}ActionTypes.CLEAR_${classNameUpper}S;
}

export class Add${className}BE implements Action {
  readonly type = ${className}ActionTypes.ADD_${classNameUpper}_BE;

  constructor(public payload: { ${classNameFirstLower}: I${className}Create }) { }
}

export class Update${className}BE implements Action {
  readonly type = ${className}ActionTypes.UPDATE_${classNameUpper}_BE;

  constructor(public payload: { ${classNameFirstLower}: I${className}Update }) { }
}

export class Delete${className}BE implements Action {
  readonly type = ${className}ActionTypes.DELETE_${classNameUpper}_BE;

  constructor(public payload: { id: number }) { }
}

export class Load${className}sBE implements Action {
  readonly type = ${className}ActionTypes.LOAD_${classNameUpper}S_BE;

  constructor(public payload: { query: I${className}Query }) { }
}

export type ${className}ActionsUnion =
  | Load${className}s
  | Add${className}
  | Upsert${className}
  | Add${className}s
  | Upsert${className}s
  | Update${className}
  | Update${className}s
  | Delete${className}
  | Delete${className}s
  | Clear${className}s
  | Add${className}BE
  | Update${className}BE
  | Delete${className}BE
  | Load${className}sBE;
`
}
function reducerRender(name: string) {
  const className = name
  const classNameUpper = className.toUpperCase()
  const classNameFirstLower = className[0].toLocaleLowerCase() + className.slice(1)
  return `
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';

export const adapter: EntityAdapter<I${className}Get> = createEntityAdapter<I${className}Get>({
  selectId: (${classNameFirstLower}Get: I${className}Get) => ${classNameFirstLower}Get.id
});

export const initialState: EntityState<I${className}Get> = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: ${className}Action.${className}ActionsUnion
): EntityState<I${className}Get> {
  switch (action.type) {
    case ${className}Action.${className}ActionTypes.ADD_${classNameUpper}:
      return adapter.addOne(action.payload.${classNameFirstLower}, state);
    case ${className}Action.${className}ActionTypes.UPSERT_${classNameUpper}:
      return adapter.upsertOne(action.payload.${classNameFirstLower}, state);
    case ${className}Action.${className}ActionTypes.ADD_${classNameUpper}S:
      return adapter.addMany(action.payload.${classNameFirstLower}s, state);
    case ${className}Action.${className}ActionTypes.UPSERT_${classNameUpper}S:
      return adapter.upsertMany(action.payload.${classNameFirstLower}s, state);
    case ${className}Action.${className}ActionTypes.UPDATE_${classNameUpper}:
      return adapter.updateOne(action.payload.${classNameFirstLower}, state);
    case ${className}Action.${className}ActionTypes.UPDATE_${classNameUpper}S:
      return adapter.updateMany(action.payload.${classNameFirstLower}s, state);
    case ${className}Action.${className}ActionTypes.DELETE_${classNameUpper}:
      return adapter.removeOne(action.payload.id, state);
    case ${className}Action.${className}ActionTypes.DELETE_${classNameUpper}S:
      return adapter.removeMany(action.payload.ids, state);
    case ${className}Action.${className}ActionTypes.LOAD_${classNameUpper}S:
      return adapter.addAll(action.payload.${classNameFirstLower}s, state);
    case ${className}Action.${className}ActionTypes.CLEAR_${classNameUpper}S:
      return adapter.removeAll(state);
    default:
      return state;
  }
}
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const select${className}Ids = createSelector(
  selectIds
);
export const select${className}Entities = createSelector(
  selectEntities
);
export const selectAll${className}s = createSelector(
  selectAll
);
export const select${className}Total = createSelector(
  selectTotal
);
`
}
function effectRender(name: string) {
  const className = name
  const classNameUpper = className.toUpperCase()
  const classNameFirstLower = className[0].toLocaleLowerCase() + className.slice(1)
  return `
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ${className}Effects {

  @Effect()
  add${className}BE$: Observable<Action> = this.actions$.pipe(
    ofType<${className}Action.Add${className}BE>(${className}Action.${className}ActionTypes.ADD_${classNameUpper}_BE),
    switchMap(action => {
      return this.${classNameFirstLower}Service.create(action.payload.${classNameFirstLower});
    }),
    map((${classNameFirstLower}Get) => {
      return new ${className}Action.Add${className}({
        ${classNameFirstLower}: ${classNameFirstLower}Get
      });
    }),
  );

  @Effect()
  update${className}BE$: Observable<Action> = this.actions$.pipe(
    ofType<${className}Action.Update${className}BE>(${className}Action.${className}ActionTypes.UPDATE_${classNameUpper}_BE),
    switchMap(action => {
      return this.${classNameFirstLower}Service.update(action.payload.${classNameFirstLower});
    }),
    map((${classNameFirstLower}Get) => {
      return new ${className}Action.Update${className}({
        ${classNameFirstLower}: {
          id: ${classNameFirstLower}Get.id,
          changes: ${classNameFirstLower}Get
        }
      });
    }),
  );

  @Effect()
  delete${className}BE$: Observable<Action> = this.actions$.pipe(
    ofType<${className}Action.Delete${className}BE>(${className}Action.${className}ActionTypes.DELETE_${classNameUpper}_BE),
    switchMap(action => {
      return this.${classNameFirstLower}Service.remove(action.payload.id);
    }),
    map((${classNameFirstLower}Get) => {
      return new ${className}Action.Delete${className}(${classNameFirstLower}Get);
    }),
  );

  constructor(
    private actions$: Actions,
    private ${classNameFirstLower}Service: ${className}Service,
  ) {
  }
}
  `
}

export default class NgNgrx extends Command {
  static description = 'gen ngrx file'

  static examples = [
    `$ ng-gen ng-ngrx -n=User -d=tmp/user
success write to tmp/user/User.service.ts
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'service name'}),
    dir: flags.string({char: 'd', description: 'dir name'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(NgNgrx)

    if (flags.dir) {
      try {
        fs.readdirSync(flags.dir)
      } catch {
        mkdirp.sync(flags.dir)
      }
    }
    if (!flags.name) {
      throw new Error('need name')
    }
    const actionFileName = `${flags.dir}/${flags.name}.action.ts`
    const reducerFileName = `${flags.dir}/${flags.name}.reducer.ts`
    const effectFileName = `${flags.dir}/${flags.name}.effect.ts`
    fs.writeFileSync(actionFileName, actionRender(flags.name))
    this.log(`success write to ${actionFileName}`)
    fs.writeFileSync(reducerFileName, reducerRender(flags.name))
    this.log(`success write to ${reducerFileName}`)
    fs.writeFileSync(effectFileName, effectRender(flags.name))
    this.log(`success write to ${effectFileName}`)
  }
}
