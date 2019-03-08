import React from "react";

import { cloneDeep } from "lodash";

import { manuscripts } from "./ManuscriptsLoader";

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";

import ColumnControls from "./ColumnControls";

import SyriacLetter, { letterInfo } from "./SyriacLetter";

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

// For development only; eventually URLs will be read from DB REST API
const defaultManifest = "https://purl.stanford.edu/zv668dm4974/iiif/manifest";

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

/* PMB These should come in handy when the content is pulled in dynamically
const schema = {
  type: "object",
  properties: {
    id: {
      type: "integer"
    },
    letter: {
      type: "string"
    },
    required: ["id", "letter"]
  }
};
for (let i = 0; i < manuscripts.length; i++) {
  let colId = "manuscript" + (i + 1);
  schema["properties"][colId] = { type: "string" };
  schema["required"].push(colId);
}
*/

class ScriptChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      rows: this.getRows(),
    };

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMoveColumn = this.onMoveColumn.bind(this);
    this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
    this.onHideColumn = this.onHideColumn.bind(this);
    this.onHideRow = this.onHideRow.bind(this);
    this.viewManifest = this.viewManifest.bind(this);
  }

  viewManifest(manifestURL, manifestActivator) {
    console.log("viewManifest called with URL " + manifestURL);
    manifestActivator(manifestURL);
  }

  onHideColumn( manuscriptID, columnHider ) {
    columnHider(manuscriptID);
  }

  getRows() {

    console.log("Running getRows");
    let rows = [];
  
    let sampleLetterCount = 0;
  
    let colControls = { id: 0, letter: "", visible: true };
  
    for (let i = 0; i < manuscripts.length; i++) {
      colControls["manuscript" + (i + 1)] = <ColumnControls
                                                msid={manuscripts[i]['id']}
                                                manifestURL={manuscripts[i]['manifest']}
                                                displayManifest={this.viewManifest}
                                                onHideColumn={this.onHideColumn}
                                                onHiddenChange={this.props.onHiddenChange}
                                                onManifestSelected={this.props.onManifestSelected}
                                            />
    }
    rows.push(colControls);
  
    /* Add dates row */
    let datesRow = { id: 1, letter: "Date", ltid: "Date", visible: (!this.props.hiddenLetters.includes("Date")) };
  
    for (let i = 0; i < manuscripts.length; i++) {
      datesRow["manuscript" + (i + 1)] = manuscripts[i]['date'];
    }
    rows.push(datesRow);
  
    /* Load the sample letters into the rows array */
    for (let i = 0; i < 14; i++) {
      let row = { id: i + 3, ltid: letterInfo[i]['id'],
                  letter: <SyriacLetter id={letterInfo[i]['id']} />,
                  visible: (!this.props.hiddenLetters.includes(letterInfo[i]['id'])) };
      console.log(row['visible']);
  
      for (let j = 0; j < manuscripts.length; j++) {
        sampleLetterCount++;
        let sampleLetterIndex = sampleLetterCount % sampleLetters.length;
        row["manuscript" + (j + 1)] = (
          <img
            src={sampleLetters[sampleLetterIndex]}
            alt={"letter " + sampleLetterIndex}
          />
        );
      }
  
      rows.push(row);
    }
    return rows;
  }

  getColumns() {

    console.log("Running getColumns");
    let cols = [
      {
        property: "letter",
        props: {
          label: "Letter",
          style: {
            fontWeight: "bold"
          }
        },
        visible: true
      }
    ];
    let rowRemoverColumn = {
      property: "row_remover",
      props: {
        style: {
          width: 50
        }
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
    for (let i = 0; i < manuscripts.length; i++) {
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
          msid: manuscripts[i]['id']
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
    const rows = dnd.moveRows({
      sourceRowId,
      targetRowId
    })(this.state.rows);

    if (rows) {
      this.setState({ rows });
    }
  }

  onMoveColumn(labels) {

    console.log("onMoveColumn labels " + labels.sourceLabel + " " + labels);

    const movedColumns = dnd.moveLabels(this.state.columns, labels);

    console.log("movedColumns: " + movedColumns);

    if (movedColumns) {
      console.log("Column move detected");
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

  onMoveChildColumn(labels) {
    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    console.log("Column child move detected");

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }

  onHideRow(letterID) {
    this.props.onHiddenChange("hide", "row", letterID);
  }

  render() {
    const renderers = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };
    const { columns, rows } = this.state;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          style={{ overflowX: "auto" }}
          renderers={renderers}
          columns={columns.filter(column => !this.props.hiddenManuscripts.includes(column.props.msid))}
        >
          <Table.Header />

          <Table.Body rows={rows.filter(row => !this.props.hiddenLetters.includes(row.ltid))} rowKey="id" onRow={this.onRow} />
        </Table.Provider>
      </div>
    );
  }
}

export default ScriptChart;
