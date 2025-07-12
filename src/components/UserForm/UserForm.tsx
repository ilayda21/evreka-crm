import { useId } from "react"

interface IProps {

}

function UserForm({  }: IProps) {
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            console.log("Submitted!")
        }}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    // value={form.name}
                    // onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    // value={form.name}
                    // onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input
                    id="role"
                    name="role"
                    // value={form.name}
                    // onChange={handleChange}
                    required
                />
            </div>
            <div>
                <button
                    type="submit"
                >
                    Add user
                </button>
            </div>
        </form>
    )
}

export default UserForm
