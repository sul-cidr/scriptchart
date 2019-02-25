import React from "react";

/* Mock data to use in development when local API backend is not available */
const fallbackManuscripts = [
  { id: 20, shelfmark: "BL. Add. 12146", date: "1007 " },
  { id: 21, shelfmark: "BL. Or. 8732", date: "770" },
  { id: 22, shelfmark: "BL. Or. 8606", date: "723" },
  { id: 23, shelfmark: "BL. Add. 17102", date: "598-599" },
  { id: 24, shelfmark: "BL. Add. 17107", date: "540-541" },
  { id: 25, shelfmark: "BL. Add. 12175", date: "533-534 " },
  { id: 26, shelfmark: "BL. Add. 17109", date: "873 - 874" }
];

class ManuscriptsLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { manuscripts: [] };
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/manuscripts?format=json")
      .then(response => {
        return response.json();
      })
      /* In production, it's likely preferable for the menu to display
       * a blank list when the backend API is down, rather than
       * displaying mock data that does not reflect the database state.
       */
      .catch(function(error) {
        return fallbackManuscripts;
      })
      .then(data => {
        let ms = data.map(manuscript => {
          return <option key={manuscript.id}>{manuscript.shelfmark}</option>;
        });
        this.setState({ manuscripts: ms });
      });
  }
  render() {
    return <select multiple>{this.state.manuscripts}</select>;
  }
}

export default ManuscriptsLoader;
