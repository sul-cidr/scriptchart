import React from "react";

import cloneDeep from "lodash/cloneDeep";

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";
import * as resolve from "table-resolver";

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

import "./DragAndDropTable.css";
/* PMB These should come in handy when the content is pulled in dynamically
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    letter: {
      type: 'string'
    },
    manuscript1: {
      type: 'string'    
    },
    manuscript2: {
      type: 'string'    
    },
    manuscript3: {
      type: 'string'    
    },
    manuscript4: {
      type: 'string'    
    },
    manuscript5: {
      type: 'string'    
    },
    manuscript6: {
      type: 'string'    
    }
  },
  required: ['id', 'letter', 'manuscript1', 'manuscript2', 'manuscript3', 'manuscript4', 'manuscript5', 'manuscript6']
}
*/

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
const manuscripts = ["A", "B", "C", "D", "E", "F"];
var rows = [];
let sampleLetterCount = 0;

/* Load the sample letter images into the rows array */
for (let i = 0; i < letters.length; i++) {
  let row = { id: i + 1, letter: letters[i] };

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

class DragAndDropTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          property: "letter",
          props: {
            label: "Letter",
            style: {
              fontWeight: "bold"
            }
          },
          header: {
            label: "Scriptchart",
            props: {
              onMove: o => this.onMoveColumn(o)
            }
          }
        }
      ],
      rows
    };

    /* Iteratively populate the columns */
    for (let i = 0; i < manuscripts.length; i++) {
      let column = {
        property: "manuscript" + (i + 1),
        header: {
          label: "Manuscript " + manuscripts[i],
          props: {
            onMove: o => this.onMoveColumn(o)
          }
        },
        props: {
          label: "Manuscript " + manuscripts[i]
        }
      };
      this.state.columns.push(column);
    }

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMoveColumn = this.onMoveColumn.bind(this);
    this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
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
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested
    })(rows);

    return (
      <Table.Provider renderers={renderers} columns={resolvedColumns}>
        <Table.Header headerRows={resolve.headerRows({ columns })} />

        <Table.Body rows={resolvedRows} rowKey="id" onRow={this.onRow} />
      </Table.Provider>
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
}

export default DragAndDropTable;
