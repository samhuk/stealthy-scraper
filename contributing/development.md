# Development

This document describes the process for setting up and running this package on your local computer.

## Prerequisites

This package is for Node.js.

You can install Node.js [here](https://nodejs.org/en/), or if you are using Chocolatey run `choco install nodejs`.

It runs on MacOS, Windows, and Linux environments.

It runs on many versions of Node.js, tested back to version 12.x.

## Linting

ESLint is used for Typescript linting. To lint the Typescript code, run `npm run lint`. To only lint for errors (excluding warnings), run `npm run lint-errors-only`.

## Building

To build all of the Typescript code, run `npm run build-ts`.

To build the Typescript code that is published to npm, run `npm run build-ts-dist`.

## Testing

### Unit Tests

Jest is used for unit testing. To build and run the unit tests, run `npm run unit-tests`.

The unit tests can be debugged with Visual Studio Code by running the **Run Unit Tests** debug task.

### Integration Tests

Integration tests connect to a real PostgreSQL server and use ts-pg-orm as a user would.

The database connectivity configuration is at `.env-cmdrc.json`.

To run the integration tests, run `npm run integration-tests`.

The integration tests can be debugged with Visual Studio Code by running the **Run Integration Tests** debug task.

## Miscellaneous Scripts

`npm run check` - Useful to run before committing to check the full validity of a change. This runs linting, Typescript build, unit tests and integration tests.

## Pull Requests

Pull requests automatically run a CI pipeline that checks various criteria:

* Linting
* Typescript build
* Unit tests
* Integration tests

These must pass for a pull request to be approved and merged.

## NPM Publishing

Run `npm run check` to check local validity of code.

Run `npm run build-ts-dist` to build the Typescript code to produce the Javascript code that is published to npm.

Run `npm publish` to publish to npm.