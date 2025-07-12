
interface GridItem {
    name: string,
    email: string,
    role: string,
    creationDate: string,
}

interface IProps {
    data: GridItem[]
}

function CardGrid({ data }: IProps) {

    return (
        <ul role="list">
            {
                data.map((item) => <li>
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                    <p>{item.role}</p>
                    <p>{item.creationDate}</p>
                    <button>Deatils</button>
                </li>)
            }
        </ul>
    )
}

export default CardGrid
