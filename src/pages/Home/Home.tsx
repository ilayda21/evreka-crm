import { useState } from "react"
import ToggleButton from "../../components/ToggleButton"
import DropdownInput from "../../components/DropdownInput"
import Table from "../../components/Table"
import CardGrid from "../../components/CardGrid"
import Paginator from "../../components/Paginator"

function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event?.target.value)
  }


  const [view, setView] = useState<string>('table')

  const [showAll, setShowAll] = useState<boolean>(false)
  const onClick = () => {
    setShowAll((value) => !value)
  }

  return (
    <div>
      <div>
        <h2>User List</h2>
        <DropdownInput
          label="View:"
          onClick={(key) => { setView(key) }}
          options={[{ key: 'table', value: 'Table' }, { key: 'card', value: 'Card' }]}
          value={view}
        />

      </div>

      <div>
        <input type="text" value={searchTerm} onChange={onSearchTermChange} placeholder="Search..." />
        <ToggleButton label="Show all" value={showAll} onClick={onClick} />
      </div>

      {view === 'table' ? (
        <div>
          <Table
            headers={["Name", "Email", "Role", "Creation Date", ""]}
            row={
              [
                ["Example", "Example", "Example", "Example", <button>Details</button>],
                ["Example", "Example", "Example", "Example", <button>Details</button>]
              ]
            }
          />
        </div>
      ): (
          <div>
        <CardGrid data={[{
          role: 'role',
          creationDate: 'date',
          email: 'email',
          name: 'name'
        }, {
            role: 'role',
            creationDate: 'date',
            email: 'email',
            name: 'name'
          }
        ]}/>
      </div>
      )}

      {showAll  && <Paginator/>}

    </div>
  )
}

export default Home
