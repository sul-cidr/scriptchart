import React, { Component } from "react";

/* MiradorViewer - embedded version of the Mirador IIIF viewer application,
 * which is a Javascript app loaded as an NPM module.
 */

import "./MiradorViewer.css";

import { Provider } from 'react-redux'
import MiradorApp from 'mirador/dist/es/src/containers/App'
import createStore from 'mirador/dist/es/src/state/createStore'
import settings from 'mirador/dist/es/src/config/settings'
import * as actions from 'mirador/dist/es/src/state/actions'

export default class MiradorViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const store = createStore()
    settings.id = 'my-mirador'
    settings.theme.palette.type = 'dark'
    store.dispatch(actions.setConfig(settings))
    store.dispatch(actions.setWorkspaceAddVisibility(true))
    this.setState({ store: store })
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <MiradorApp/>
      </Provider>
    )
  }
}
