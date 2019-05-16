import React from "react";

/* MiradorViewer - embedded version of the Mirador IIIF viewer application,
 * which is a Javascript app loaded as an NPM module.
 */

import "./MiradorViewer.css";

import { Provider } from 'react-redux';
import MiradorApp from 'mirador/dist/es/src/containers/App';
import createStore from 'mirador/dist/es/src/state/createStore';
import settings from 'mirador/dist/es/src/config/settings';
import * as actions from 'mirador/dist/es/src/state/actions';

class MiradorViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const store = createStore();
    settings.id = 'mirador';
    //settings.layout=this.props.miradorLayout;
    settings.manifests=this.props.manifests;
    //settings.windows=this.props.windowObjects;
    settings.theme.palette.type = 'dark';
    settings.workspace.type = "mosaic";
    store.dispatch(actions.setConfig(settings));
    store.dispatch(actions.setWorkspaceAddVisibility(true));
    for (let manifestURL in this.props.manifests) {
      store.dispatch(actions.fetchManifest(manifestURL));
    }

    /*
    let layoutOrder = 1;
    for (let window of this.props.windowObjects) {
      console.log(window);
      let windowOptions = {
        manifestId: window.loadedManifest,
        canvasIndex: window.canvasIndex,
        collectionIndex: 0,
        sideBarOpen: false,
        view: "single",
        thumbnailNavigationPosition: "far-bottom",
        draggingEnabled: true,
        layoutOrder
      }
      store.dispatch(actions.addWindow(windowOptions));
      layoutOrder += 1;
    }
    */

    this.setState({ store: store });

  }

  render() {
    return (
      <Provider store={this.state.store}>
        <MiradorApp />
      </Provider>
    )
  }
}

export default MiradorViewer;
