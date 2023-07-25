# Full Stack Application with Express (Typescript) in the BE, ReactJS in the FE and CDK
This app is conformed by 3 yarn workspaces:
- `server`: the BE server written with Typescript and Express following the Clean Architecture Design.
- `client`: the basic FE client written with ReactJS.
- `infra`: the CDK packages that are used to deploy the server into AWS.

# Available Scripts
In the root directory, you can run multiple scripts, some of them for a specific workspace and some for the project as a whole.

## Server scripts
### `yarn server:build`
Builds the BE server.

### `yarn server:start`
Starts the BE server.

### `yarn server:start:dev`
Starts the BE server for development.

## Client scripts
### `yarn client:build`
Builds the FE client.

### `yarn client:start`
Starts the FE client.

## Infra scripts
### `yarn infra:build`
Builds the CDK code.

### `yarn infra:synth`
Synthetizes the CDK files.

### `yarn infra:bootstrap`
Bootstrap the CDK stacks.

### `yarn infra:deploy`
Deploy the CDK stacks.

## Project scripts
### `yarn clean`
Removes all files from build process from every workspace.

### `yarn build`
Builds every workspace.

### `yarn merge`
Builds the `server` and the `client`, and then copies the client build files into the server path, so that the server can serve these files when running.

### `yarn docker`
Dockerizes the `server` with the `client`.

### `yarn start`
Merges the `server` and `client` and then starts running it.

### `yarn test`
Runs tests in every workspace
