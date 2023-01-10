# DASH: Digital Analysis of Syriac Handwriting

Based on [the Minimal React Webpack Babel Setup](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/) and our own webpack set up for the [Noh Theater Project](https://github.com/sul-cidr/noh)

## Install

- Run `bundle install`
- Run `yarn`
- Configure a `.env` file (see `.env_template` for details)

## Features

- React 16
- Webpack 4
- Babel 7
- Mirador 2

## Development

- `yarn dev` to start the development server
- visit `http://localhost:4000/scriptchart/`

## Production

- `yarn build` to build the application into the `_site` folder

## Deployment

- Deployment is done manually in conjunction with the `scriptchard-backend` application.

## Update Jan. 2023

Attempting to install dependencies and build the site in 2023 involves some pain points, as the versions of (esp.) Ruby and NodeJS that the code requires can be awkward to install on up-to-date systems.  For this reason, a docker configuration has been added to make things easier.  Docker (and Docker Compose for older docker versions) is required.

- To launch a live development server, just use `docker-compose up` from the repository folder
- To build the site to the `_site` folder, use `docker compose run app bash -c "cd /opt; bundle install --path vendor/bundle && yarn && yarn build"`

