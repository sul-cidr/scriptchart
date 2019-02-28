import React from "react";

import { cloneDeep, findIndex } from "lodash";

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";

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

const letters = ["ʾĀlep̄", "Bēṯ", "Gāmal", "Dālaṯ", "Hē", "Waw"];
const manuscripts = [
  "Vat. Syr. 157",
  "Vat. Syr. 161",
  "Vat. Syr. 283",
  "Vat. Syr. 586",
  "Vat. Syr. 252",
  "Bor. Syr. 13",
  "BL. Add. 12144",
  "BL. Add. 12139",
  "BL. Add. 12146"
];
const dates = ["NA", "NA", "NA", "NA", "NA", "NA", "1081", "999-1000", "1007"];

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

class DragAndDropTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      rows: this.getRows(),
      //query: {} // search query, also used to hide/show columns
    };

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMoveColumn = this.onMoveColumn.bind(this);
    this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
    this.onToggleColumn = this.onToggleColumn.bind(this);
    this.onToggleRow = this.onToggleRow.bind(this);
  }

  getRows() {

    let rows = [];
  
    let sampleLetterCount = 0;
  
    let colRemoverRow = { id: 0, letter: "hide", visible: true };
  
    for (let i = 0; i < manuscripts.length; i++) {
      colRemoverRow["manuscript" + (i + 1)] = <span
                                                className="remove"
                                                onClick={() => this.onToggleColumn(i+2)} style={{ cursor: 'pointer' }}
                                              >
                                                &#10007;
                                              </span>
    }
    rows.push(colRemoverRow);
  
    /* Add dates row */
    let datesRow = { id: 1, letter: "Date", visible: true };
  
    for (let i = 0; i < dates.length; i++) {
      datesRow["manuscript" + (i + 1)] = dates[i];
    }
    rows.push(datesRow);
  
    /* Load the sample letter images into the rows array */
    for (let i = 0; i < letters.length; i++) {
      let row = { id: i + 3, letter: letters[i], visible: true };
  
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

    let cols = [
      {
        property: "letter",
        props: {
          label: "Letter",
          style: {
            fontWeight: "bold"
          }
        },
        visible: true,
        header: {
          label: "Letter",
          props: {
            onMove: o => this.onMoveColumn(o)
          }
        }
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
              onClick={() => this.onToggleRow(rowData.id)} style={{ cursor: 'pointer' }}
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
          label: manuscripts[i],
          props: {
            onMove: o => this.onMoveColumn(o)
          }
        },
        visible: true,
        props: {
          label: manuscripts[i]
        }
      };
      cols.push(column);
    }
    return cols;
  };

  render() {
    console.log("Rendering scriptchart");
    const renderers = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };
    const { columns, rows } = this.state;
    const cols = columns.filter(column => column.visible);
    //const query = this.state.query;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          style={{ overflowX: "auto" }}
          renderers={renderers}
          columns={columns.filter(column => column.visible)}
        >
          <Table.Header />

          <Table.Body rows={rows.filter(row => row.visible)} rowKey="id" onRow={this.onRow} />
        </Table.Provider>
      </div>
    );
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
  onMoveChildColumn(labels) {
    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }
  onToggleColumn( columnIndex ) {
    const columns = cloneDeep(this.state.columns);
    const column = columns[columnIndex];

    console.log("toggling column index " + columnIndex + " label is " + column.props.label);

    if (column.visible === true) {
      this.props.onHiddenChange( "hide", "column", columnIndex, column.props.label);
    }

    column.visible = !column.visible;

    /*const query = cloneDeep(this.state.query);
    delete query[column.property];

    this.setState({ columns, query });*/
    this.setState({ columns });
  }
  onToggleRow( id ) {
    const rows = cloneDeep(this.state.rows);
    const idx = findIndex(rows, { id });
    const row = rows[idx];

    if (row.visible === true) {
      this.props.onHiddenChange("hide", "row", idx, row.letter);
    }

    row.visible = !row.visible;

    /*const query = cloneDeep(this.state.query);
    delete query[row.property];
    this.setState({ rows, query });*/
    this.setState({ rows });
  }
}

export default DragAndDropTable;
