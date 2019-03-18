import React from "react";

// Only needed if we have child header cells
//import { cloneDeep } from "lodash";

// Remove this soon -- this data will come from DashTabs
// (the parent component) instead

import * as dnd from "reactabular-dnd";

import DragTable from "./DragTable";

import SyriacLetter from "./SyriacLetter";

import LetterImage from "./LetterImage";

import ColumnControls from "./ColumnControls";

import "./ScriptChart.css";

class ScriptChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //columns: [],
      //rows: []
      //tableData: {}
    };

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
   
    console.log("REBUILDING ROWS FROM SCRATCH");
    console.log("Length of this.props.rowLetters is " + this.props.rowLetters.length);
    console.log(this.props.rowLetters);

    let rows = [];
  
    let colControls = { id: 0, ltid: "", letter: "", visible: true };

    /* Add dates row */
    let datesRow = { id: 1, ltid: "Date", letter: "Date", ltid: "Date", visible: (!this.props.hiddenLetters.includes("Date")) };

    for (let i=0, len=this.props.columnManuscripts.length; i<len; i++) {
      colControls["manuscript" + (i + 1)] = <ColumnControls
                                                msid={this.props.columnManuscripts[i]['id']}
                                                shelfmark={this.props.columnManuscripts[i]['shelfmark']}
                                                manifestURL={this.props.columnManuscripts[i]['manifest']}
                                                displayManifest={this.viewManifest}
                                                onHideColumn={this.onHideColumn}
                                                onHiddenChange={this.props.onHiddenChange}
                                                onManifestSelected={this.props.onManifestSelected}
                                            />;
      datesRow["manuscript" + (i + 1)] = this.props.columnManuscripts[i]['date'];
    }
    rows.push(colControls);
    rows.push(datesRow);
  
    /* Load the letters data into the rows array */
    for (let i=0, len=this.props.rowLetters.length; i < len; i++) {

      let thisLetter = this.props.rowLetters[i];

      /* Syriac row labels will only drag-and-drop correctly when
       * instantiated manually here -- wrapping them in a
       * <SyriacLetter> component doesn't seem to work (though
       * it's fine for the buttons). */
      let trailing = "";
      let leading = "";
      let thisFont = "sans-serif";

      let display = thisLetter.display;
      let script = thisLetter.script;
      if (script == "serto") {
        thisFont = "SertoJerusalem";
      } else if (script == "estrangela") {
        thisFont = "EstrangeloEdessa";
      } 

      if (thisLetter.hasOwnProperty("trailing_letter")) {
        trailing = <span style={{ color: 'transparent' }}>{thisLetter.trailing_letter}</span>;
      }
      if (thisLetter.hasOwnProperty("leading_letter")) {
        leading = <span style={{ color: 'transparent' }}>{thisLetter.leading_letter}</span>;
      }
      if (thisLetter.hasOwnProperty("display")) {
        display = thisLetter.display;
      }
      else if (thisLetter.hasOwnProperty("letter")) {
        display = thisLetter.letter;
      } else {
        display = thisLetter.id;
      }

      let ltID = this.props.rowLetters[i]['id'];
      let row = { id: i + 2, ltid: ltID,
                  //letter: <SyriacLetter id={ltID} />,
                  //letter: <p>{ltID}</p>,
                  letter: <span style={{direction: "rtl", fontSize: "2em", fontFamily: thisFont}}>{trailing}{display}{leading}</span>,
                  visible: (!this.props.hiddenLetters.includes(ltID)) };
 
      /* This is where the actual letter instances from the manuscript
       * pages are added */
      for (let j=0, len=this.props.columnManuscripts.length; j < len; j++) {
        let msID = this.props.columnManuscripts[j]['id'];

        if ((!(msID in this.props.tableData)) || (!(ltID in this.props.tableData[msID]))) {
          console.log("adding blank cell at msID " + msID + ", ltID " + ltID);
          row["manuscript" + (j + 1)] = <div msid={msID} />;
        } else {
          let cellContents = this.props.tableData[msID][ltID].slice(0,this.props.formData.letterExamples).map(coords => {return <LetterImage key={coords.id} coords={coords}/>});
          console.log("adding " + this.props.tableData[msID][ltID].length + " new letter instances at msID " + msID + ", ltID " + ltID);
          //this.prop.tableData[msID][ltID].map(coords => { console.log("letter " + coords['letter'] + " binary URL is " + coords["binaryurl"]); });
          row["manuscript" + (j + 1)] = <div msid={msID}>{cellContents}</div>;
        }
      }
  
      rows.push(row);
    }
    console.log("RETURNING FROM GETROWS");
    return rows;
  }

  getColumns() {

    console.log("Running getColumns");

    console.log("REBUILDING COLUMNS FROM SCRATCH");

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
   //for (let i=0, len=manuscripts.length; i < len; i++) {
    console.log("Length of this.props.columnManuscripts is " + this.props.columnManuscripts.length);
    console.log(this.props.columnManuscripts);
    for (let i=0, len=this.props.columnManuscripts.length; i < len; i++) {
      console.log("column shelfmark is " + this.props.columnManuscripts[i].shelfmark);
      // Consider just not generating values for currently hidden columns...
      let column = {
        property: "manuscript" + (i + 1),
        header: {
          label: this.props.columnManuscripts[i]['shelfmark'],
          props: {
            label: this.props.columnManuscripts[i]['shelfmark'],
            onMove: o => this.onMoveColumn(o)
          }
        },
        visible: (!this.props.hiddenManuscripts.includes(this.props.columnManuscripts[i]['id'])),
        props: {
          msid: this.props.columnManuscripts[i]['id'],
          style: {width: 200}
        }
      };
      cols.push(column);
    }
    return cols;
  }

  onRow(row) {
    return {
      rowId: row.ltid,
      onMove: this.onMoveRow
    };
  }

  onMoveRow({ sourceRowId, targetRowId }) {
    console.log("Row move source " + sourceRowId + " target " + targetRowId);

    this.props.onRowMove(sourceRowId, targetRowId);
  }

  onMoveColumn(labels) {

    console.log("Column move labels");
    console.log(labels);
    this.props.onColumnMove(labels);
  
  }

  onHideRow(letterID) {
    this.props.onHiddenChange("hide", "row", letterID);
  }

  render() {

    console.log("Rendering ScriptChart");

    let rows = this.getRows();
    let columns = this.getColumns();

    return (
      <DragTable rows={rows}
                 columns={columns}
                 hiddenLetters={this.props.hiddenLetters}
                 hiddenManuscripts={this.props.hiddenManuscripts}
                 onRow={this.onRow}
      />
    );
  }
}

export default ScriptChart;
