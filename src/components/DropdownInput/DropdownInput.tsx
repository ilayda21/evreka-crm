import { useId } from "react"

interface DropdownOption {
    key: string
    value: string
}

interface IProps  {
    label: string
    value: string
    options: DropdownOption[]
    onClick: (value: string) => void
}

function DropdownInput({label, options, onClick, value} : IProps) {

    const dropdownId = useId()
    return (
        <div>
            <label htmlFor={dropdownId}>{label}</label>
            <select id={dropdownId} value={value} onChange={(e) => onClick(e.target.value)}>
                {options.map(option => <option key={option.key} value={option.key}>{option.value}</option> )}
            </select>
        </div>
    )
}

export default DropdownInput
