import React from "react";

/* ManuscriptsLoader - Renders the list of available manuscripts in the
 * ManuscriptsMenu form component, and passes their selection/deselection
 * events up the form component chain.
 * It doesn't actually load the manuscripts list from an external source;
 * this data has already been queried via the REST API by the App component.
 */

class ManuscriptsLoader extends React.Component {

  render() {
    let manuscriptSelectors = <option>Finding manuscripts...</option>;

    if ((this.props.manuscripts !== null) && (this.props.manuscripts.length > 0)) {
      manuscriptSelectors = this.props.manuscripts.map(ms => {
        return (
          <option key={ms.id} value={ms.shelfmark}>
            {ms.shelfmark} ({ms.date ? ms.date : 'NA'})
          </option>
        );
      });
    }
    
    return (
      <select multiple size="8"
        type="string"
        name="selectedShelfmarks"
        value={this.props.selectedShelfmarks}
        onChange={this.props.handleSelect}
        multiple={true}
      >
        {manuscriptSelectors}
      </select>
    );
  }
}

export default ManuscriptsLoader;
