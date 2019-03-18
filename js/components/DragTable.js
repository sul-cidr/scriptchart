import React from "react";

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";
import * as Sticky from 'reactabular-sticky';


class DragTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // We have refs now. Force update to get those to Header/Body.
    // XXX Is this necessary?
    this.forceUpdate();
  }

  componentDidUpdate() {
  }

  render() {
    console.log("Rendering DragTable");

    const renderers = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };


    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        style={{ overflowX: "auto" }}
        renderers={renderers}
        columns={this.props.columns.filter(column => !this.props.hiddenManuscripts.includes(column.props.msid))}
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
          rows={this.props.rows.filter(row => !this.props.hiddenLetters.includes(row.ltid))}
          rowKey="id"
          onRow={this.props.onRow} 
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
    );
  }
}

export default DragTable;
