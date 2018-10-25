@anyres/gen
===========

anyres gen files tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@anyres/gen.svg)](https://npmjs.org/package/@anyres/gen)
[![Downloads/week](https://img.shields.io/npm/dw/@anyres/gen.svg)](https://npmjs.org/package/@anyres/gen)
[![License](https://img.shields.io/npm/l/@anyres/gen.svg)](https://github.com/anyres/gen/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @anyres/gen
$ gen COMMAND
running command...
$ gen (-v|--version|version)
@anyres/gen/0.0.0 win32-x64 node-v8.11.3
$ gen --help [COMMAND]
USAGE
  $ gen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gen help [COMMAND]`](#gen-help-command)
* [`gen ng-ngrx`](#gen-ng-ngrx)
* [`gen ng-service`](#gen-ng-service)

## `gen help [COMMAND]`

display help for gen

```
USAGE
  $ gen help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src\commands\help.ts)_

## `gen ng-ngrx`

gen ngrx file

```
USAGE
  $ gen ng-ngrx

OPTIONS
  -d, --dir=dir    dir name
  -h, --help       show CLI help
  -n, --name=name  service name

EXAMPLE
  $ ng-gen ng-ngrx -n=User -d=tmp/user
  success write to tmp/user/User.service.ts
```

_See code: [src\commands\ng-ngrx.ts](https://github.com/anyres/gen/blob/v0.0.0/src\commands\ng-ngrx.ts)_

## `gen ng-service`

gen angular service file

```
USAGE
  $ gen ng-service

OPTIONS
  -d, --dir=dir    dir name
  -h, --help       show CLI help
  -n, --name=name  service name

EXAMPLE
  $ ng-gen ng-service -n=User -d=tmp/user
  success write to tmp/user/User.service.ts
```

_See code: [src\commands\ng-service.ts](https://github.com/anyres/gen/blob/v0.0.0/src\commands\ng-service.ts)_
<!-- commandsstop -->
