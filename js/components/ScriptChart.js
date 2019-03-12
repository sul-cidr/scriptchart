import React from "react";

import { cloneDeep } from "lodash";

// Remove this soon -- this data will come from DashTabs
// (the parent component) instead
import { manuscripts } from "./ManuscriptsLoader";

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";
import * as Sticky from 'reactabular-sticky';

import SyriacLetter, { letters } from "./SyriacLetter";

import LetterImage from "./LetterImage";

import ColumnControls from "./ColumnControls";

import eastern_alap from "./images/Syriac_Eastern_alap.png";
import eastern_bet from "./images/Syriac_Eastern_bet.png";
import eastern_gamal from "./images/Syriac_Eastern_gamal.png";
import eastern_dalat from "./images/Syriac_Eastern_dalat.png";
import eastern_he from "./images/Syriac_Eastern_he.png";
import eastern_waw from "./images/Syriac_Eastern_waw.png";
import estrangela_alap from "./images/Syriac_Estrangela_alap.png";
import estrangela_bet from "./images/Syriac_Estrangela_bet.png";
import estrangela_gamal from "./images/Syriac_Estrangela_gamal.png";
import estrangela_dalat from "./images/Syriac_Estrangela_dalat.png";
import estrangela_he from "./images/Syriac_Estrangela_he.png";
import estrangela_waw from "./images/Syriac_Estrangela_waw.png";
import serta_alap from "./images/Syriac_Serta_alap.png";
import serta_bet from "./images/Syriac_Serta_bet.png";
import serta_gamal from "./images/Syriac_Serta_gamal.png";
import serta_dalat from "./images/Syriac_Serta_dalat.png";
import serta_he from "./images/Syriac_Serta_he.png";
import serta_waw from "./images/Syriac_Serta_waw.png";

import "./ScriptChart.css";

const sampleLetters = [
  eastern_alap,
  eastern_bet,
  eastern_gamal,
  eastern_dalat,
  eastern_he,
  eastern_waw,
  estrangela_alap,
  estrangela_bet,
  estrangela_gamal,
  estrangela_dalat,
  estrangela_he,
  estrangela_waw,
  serta_alap,
  serta_bet,
  serta_gamal,
  serta_dalat,
  serta_he,
  serta_waw
];

class ScriptChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /*columns: [],
      rows: []*/
      columns: this.getColumns(),
      rows: this.getRows()
    };

    console.log("TABLE MANUSCRIPTS: " + Object.keys(this.props.tableData));
    console.log("TABLE LETTERS: " + Object.keys(this.props.tableData['3']));
    console.log("TABLE PAGES: " + Object.keys(this.props.tableData['3']['2']));

    this.getRows = this.getRows.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMoveColumn = this.onMoveColumn.bind(this);
    //this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
    this.onHideColumn = this.onHideColumn.bind(this);
    this.onHideRow = this.onHideRow.bind(this);
    this.viewManifest = this.viewManifest.bind(this);
  }

  /* Table data should be stored as a two-dimensional array.
   * First key: letter ID (row)
   * Second key: manuscript ID (column)
   * Value: an Object containing the data necessary to render
   * 1-3 image letter excerpts (binarized or not). This includes
   * the link to the page URL and the coordinates of each letter.
   */

  viewManifest(manifestURL, manifestActivator) {
    console.log("viewManifest called with URL " + manifestURL);
    manifestActivator(manifestURL);
  }

  onHideColumn( manuscriptID, columnHider ) {
    columnHider(manuscriptID);
  }

  getRows() {

    console.log("Running getRows");
    if (this.state && (this.state.rows.length > 0)) {
      // Need to update cells with new letter instances that have come in from the API
      // queries (which happen asynchronously)

      console.log("Scanning existing rows for needed updates");
      let rowsCopy = [...this.state.rows];

      let changesMade = false;

      for (let msID of Object.keys(this.props.tableData)) {
        for (let ltID of Object.keys(this.props.tableData[msID])) {
          if (this.props.tableData[msID][ltID].length > 0) {
            console.log("Finding current state of msID " + msID + ", ltID " + ltID + " which has data length " + this.props.tableData[msID][ltID].length);
            // Find the row in this.state.rows
            let rowIndex = rowsCopy.findIndex(rw => rw["ltid"] == ltID);
            console.log("Letter " + ltID + " is at row index " + rowIndex);
            let row = rowsCopy[rowIndex];
            for (let c=0, len=manuscripts.length; c<len; c++) {
              let cellIndex = "manuscript" + (c + 1);
              let cell = row[cellIndex];
              console.log("checking cell " + Object.keys(cell.props.children));
              if (cell.props['msid'] == msID) {
                console.log("Manuscript " + msID + " is at col index " + cellIndex + " which has children length " + cell.props["children"].length);
                if (cell.props["children"].length < this.props.tableData[msID][ltID].length) {
                  console.log("Updating contents of cell");
                  let cellContents = this.props.tableData[msID][ltID].map(coords => {return <LetterImage key={coords.id} coords={coords}/>});
                  rowsCopy[rowIndex][cellIndex] = <div msid={msID}>{cellContents}</div>;
                  changesMade = true;
                }
              }
            }
          }
        }
      }
      if (changesMade) {
        console.log("returning changed rows");
        return rowsCopy;
      } else {
        console.log("returning unchanged rows");
        return this.state.rows;
      }      
    }

    let rows = [];
  
    let colControls = { id: 0, letter: "", visible: true };

    /* Add dates row */
    let datesRow = { id: 1, letter: "Date", ltid: "Date", visible: (!this.props.hiddenLetters.includes("Date")) };

    for (let i=0, len=manuscripts.length; i<len; i++) {
      colControls["manuscript" + (i + 1)] = <ColumnControls
                                                msid={manuscripts[i]['id']}
                                                manifestURL={manuscripts[i]['manifest']}
                                                displayManifest={this.viewManifest}
                                                onHideColumn={this.onHideColumn}
                                                onHiddenChange={this.props.onHiddenChange}
                                                onManifestSelected={this.props.onManifestSelected}
                                            />;
      datesRow["manuscript" + (i + 1)] = manuscripts[i]['date'];
    }
    rows.push(colControls);
    rows.push(datesRow);
  
    /* Load the letters data into the rows array */
    for (let i = 0; i < letters.length; i++) {
      let ltID = letters[i]['id'];
      let row = { id: i + 3, ltid: ltID,
                  letter: <SyriacLetter id={ltID} />,
                  visible: (!this.props.hiddenLetters.includes(ltID)) };
      console.log(row['visible']);
  
      /* This is where the actual letter instances from the manuscript
       * pages are added */
      for (let j=0, len=manuscripts.length; j < len; j++) {
        let msID = manuscripts[j]['id'];
        
        //let cellContents = this.props.tableData[msID][ltID].map(coords => {return coords['id']}).join("<br>");
        let cellContents = this.props.tableData[msID][ltID].map(coords => {return <LetterImage key={coords.id} coords={coords}/>});
        row["manuscript" + (j + 1)] = <div msid={msID}>{cellContents}</div>;

        /*
        sampleLetterCount++;
        let sampleLetterIndex = sampleLetterCount % sampleLetters.length;
        row["manuscript" + (j + 1)] = (
          <img
            src={sampleLetters[sampleLetterIndex]}
            alt={"letter " + sampleLetterIndex}
          />
        );
        */
      }
  
      rows.push(row);
    }
    return rows;
  }

  getColumns() {

    console.log("Running getColumns");
    if (this.state && (this.state.columns.length > 0)) {
      // Only rows need to be updated in place as new letter
      // instances are added (I think)
      return this.state.columns;
    }

    let cols = [
      {
        property: "letter",
        header: {
          label: "Date",
          props: {
            label: "Date"
          }
        },
        visible: true,
        props: {
          style: { width: 80 }
        }
      }
    ];
    let rowRemoverColumn = {
      property: "row_remover",
      header: {
        label: "X",
        props: {
          label: "X"
        }
      },
      props: {
        style: { width: 45 },
      },
      cell: {
        formatters: [
          (value, { rowData }) => (rowData.id > 0) ?
            <span
              className="remove"
              onClick={() => this.onHideRow(rowData.ltid)} style={{ cursor: 'pointer' }}
            >
              &#10007;
            </span>
          : <span></span>
        ]
      },
      visible: true
    }
    cols.push(rowRemoverColumn);
    /* Iteratively populate the columns */
    for (let i=0, len=manuscripts.length; i < len; i++) {
      let column = {
        property: "manuscript" + (i + 1),
        header: {
          label: manuscripts[i]['shelfmark'],
          props: {
            label: manuscripts[i]['shelfmark'],
            onMove: o => this.onMoveColumn(o)
          }
        },
        visible: (!this.props.hiddenManuscripts.includes(manuscripts[i]['id'])),
        props: {
          msid: manuscripts[i]['id'],
          style: {width: 200}
        }
      };
      cols.push(column);
    }
    return cols;
  }

  onRow(row) {
    return {
      rowId: row.id,
      onMove: this.onMoveRow
    };
  }

  onMoveRow({ sourceRowId, targetRowId }) {
    console.log("Row move detected");
    const rows = dnd.moveRows({
      sourceRowId,
      targetRowId
    })(this.state.rows);
    console.log("after move, rows is " + rows);

    if (rows) {
      console.log("updating rows: " + Object.keys(rows));
      this.setState({ rows });
    }
  }

  onMoveColumn(labels) {

    console.log("Column move detected");
    const movedColumns = dnd.moveLabels(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.source;
      const target = movedColumns.target;
      const sourceWidth = source.props.style && source.props.style.width;
      const targetWidth = target.props.style && target.props.style.width;

      source.props.style = {
        ...source.props.style,
        width: targetWidth
      };
      target.props.style = {
        ...target.props.style,
        width: sourceWidth
      };

      this.setState({
        columns: movedColumns.columns
      });
    }
  }

  /*
  onMoveChildColumn(labels) {
    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    console.log("Column child move detected");

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }*/

  onHideRow(letterID) {
    this.props.onHiddenChange("hide", "row", letterID);
  }

  componentDidMount() {
    // We have refs now. Force update to get those to Header/Body.
    // XXX Is this necessary?
    /*this.setState({ columns: this.getColumns(),
                    rows: this.getRows() });*/
    this.forceUpdate();
  }

  componentDidUpdate() {
    /*
    this.setState({ columns: this.getColumns(),
                    rows: this.getRows() });*/
  }

  render() {
    console.log("Rendering ScriptChart");
    if (this.props.tableData['3']['2'].length > 0) {
      console.log("tableData[3][2][0] is " + Object.keys(this.props.tableData['3']['2'][0]));
    }
    const renderers = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };
    //const { columns, rows } = this.state;
    const columns = this.getColumns();
    const rows = this.getRows();

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          style={{ overflowX: "auto" }}
          renderers={renderers}
          columns={columns.filter(column => !this.props.hiddenManuscripts.includes(column.props.msid))}
        >
          <Sticky.Header
            style={{
              maxWidth: 800
            }}
            ref={tableHeader => {
              this.tableHeader = tableHeader && tableHeader.getRef();
            }}
            tableBody={this.tableBody}
          />
          <Sticky.Body
            rows={rows.filter(row => !this.props.hiddenLetters.includes(row.ltid))}
            rowKey="id"
            onRow={this.onRow} 
            style={{
              maxWidth: 800,
              maxHeight: 800
            }}
            ref={tableBody => {
              this.tableBody = tableBody && tableBody.getRef();
            }}
            tableHeader={this.tableHeader}
            />
        </Table.Provider>
      </div>
    );
  }
}

export default ScriptChart;
