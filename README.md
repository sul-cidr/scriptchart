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

- `yarn deploy` updates the remotely hosted version of the site with the contents of the `_site` folder. At present, the remote site is accessed by visiting this Github Pages URL: `https://sul-cidr.github.io/scriptchart/`
