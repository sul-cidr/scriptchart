import React from "react";

class ManuscriptsLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { manuscripts: [] };
  }
  componentDidMount() {
    fetch('http://localhost:8000/api/manuscripts?format=json')
    .then(results => {
      return results.json();
    })
    .then(data => {
      let ms = data.map((manuscript) => {
        return (
          <option key={manuscript.id}>{manuscript.shelfmark}</option>
        )
      })
      this.setState({ manuscripts: ms });
    })
  }
  render() {
    return ( <select multiple>
               { this.state.manuscripts } 
              </select>
           )
  }
}

class ManuscriptMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={"field"}>
        <label className={"control"}>Select Manuscripts:</label>
        <div className={"control"}>
          <div className={"select is-multiple"}>
            <ManuscriptsLoader />
          </div>
        </div>
        <div className={"control sort-option"}>
          <p>Order manuscripts by:</p>
          <label className={"radio"}>
          Shelfmark:
          <input type={"radio"} name={"Shelfmark"} defaultChecked />
          </label>
          <label className={"radio"}>
          Date:
          <input type={"radio"} name={"Date"} />
          </label>
        </div>
      </div>
    )
  }
}

export default ManuscriptMenu;