import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

function render(name: string) {
  const nameFirstLower = name[0].toLocaleLowerCase() + name.slice(1)
  return `
import { Injectable, ErrorHandler } from '@angular/core';
import { Anyres, AnyresCRUD } from '@anyres/core';
import { AngularHttpClientAdapter } from '@anyres/ng-anyres';
import { HttpClient } from '@angular/common/http';

export interface I${name} {
  id: number;
}

export interface I${name}Query {
  limit?: number;
  offset?: number;
  fields?: string;
  is_delete?: boolean;
  ordering?: string;
}

export interface I${name}QueryResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: I${name}Get[];
}

export interface I${name}Create {

}

export interface I${name}Get {
  id?: number;
}

export interface I${name}Update {
  id: number;
}

@Injectable()
@Anyres({
  path: '/${nameFirstLower}',
  forbiddenMethods: []
})
export class ${name}Service extends AnyresCRUD<
I${name}Query,
I${name}QueryResults,
I${name}Get,
I${name}Create,
I${name}Update
> {
  constructor(
    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandler,
  ) {
    super(new AngularHttpClientAdapter(httpClient), (e) => {
      errorHandlerService.handleError(e);
    });
  }
}
  `
}
export default class NgService extends Command {
  static description = 'gen angular service file'

  static examples = [
    `$ ng-gen ng-service -n=User -d=tmp/user
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
    const {flags} = this.parse(NgService)

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
    const fileName = `${flags.dir}/${flags.name}.service.ts`
    fs.writeFileSync(fileName, render(flags.name))
    this.log(`success write to ${fileName}`)
  }
}
