import { useId, useState } from "react"

interface IProps  {
    label: string
    value: boolean
    onClick: () => void
}

function ToggleButton({label, onClick, value} : IProps) {

    const toggleButton = useId()
    return (
        <div>
            <label htmlFor={toggleButton}>{label}</label>
            <button id={toggleButton} onClick={onClick}>
                <div />
            </button>
        </div>
    )
}

export default ToggleButton
