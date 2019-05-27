import React from "react";

/* MiradorViewer - embedded version of the Mirador IIIF viewer application,
 * which is a Javascript app loaded as an NPM module.
 */

import "./MiradorViewer.css";

import PluginProvider from 'mirador/dist/es/src/extend/PluginProvider';
import MiradorApp from 'mirador/dist/es/src/containers/App';
import createRootReducer from 'mirador/dist/es/src/state/reducers/rootReducer';

class MiradorViewer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillReceiveProps() {
    console.log("MiradorViewer receiving props");
  }

  componentWillUpdate() {
    console.log("mirador viewer updating");
  }

  componentWillUnmount() {

    console.log("unmounting MiradorViewer");

    /*
    var store = this.state.store;
    console.log(store.getState());
    settings.workspace.type = "elastic";
    store.dispatch(actions.setConfig(settings));

    /*
    for (let windowKey in store.getState().windows) {
      console.log("removing window " + windowKey);
      store.dispatch(actions.focusWindow(windowKey));
      store.dispatch(actions.removeWindow(windowKey));
      console.log(Object.keys(store.getState().windows));
    }

    store.dispatch(actions.setWorkspaceAddVisibility(true));
    //console.log("set add workspace visibility to true");

   this.setState({ store: store });
*/
  }

  render() {
    console.log("rendering MiradorViewer");
    return (
      <PluginProvider plugins={[]} createRootReducer={createRootReducer}>
        <MiradorApp />
      </PluginProvider>
    )
  }
}

export default MiradorViewer;
