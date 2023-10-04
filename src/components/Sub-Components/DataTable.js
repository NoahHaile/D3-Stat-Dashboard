import React, { Component } from 'react';
import "../../CSS/table.css"

class DataTable extends Component {
  render() {
    const { data } = this.props;

    const includedColumnIndexes = [0, 1, 2, 4, 7]; // Indexes of columns to be included

    const tableRows = data.map((rowData, rowIndex) => (
      <tr key={rowIndex}>
        {Object.values(rowData).map((cellData, cellIndex) => {
          if (includedColumnIndexes.includes(cellIndex)) {
            return <td key={cellIndex}>{cellData}</td>;
          }
          return null; // Exclude this cell
        })}
      </tr>
    ));


    return (
      
        <table className="styled-table">
          <thead>
            <tr>
              <td>
                Rank
              </td>
              <td>
                Name
              </td>
              <td>
                Subscribers
              </td>
              <td>
                Category
              </td>
              <td>
                Location
              </td>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      
    );
  }
}

export default DataTable;
