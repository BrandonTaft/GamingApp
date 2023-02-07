import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
            <h1>NAVBAR</h1>
            <Link to={"/profile"} className='highlight'>Profile</Link>
            <Link to={"/"} className='highlight'>Public Page</Link>
        </div>
    )
}

export default Navbar