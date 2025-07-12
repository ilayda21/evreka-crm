

interface IProps {
    headers: Array<string | React.ReactNode>
    row: Array<Array<string | React.ReactNode>>
}

function Table({ headers, row } : IProps) {
    return (
        <table>
          <thead>
            <tr>
              {headers.map((header) => <th>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {row.map((cells) => <tr>{cells.map(cell => <td>{cell}</td>)}</tr>)}  
          </tbody>
        </table >
    )
}

export default Table
