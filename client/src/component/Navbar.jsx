import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
            <h1>NAVBAR</h1>
            <Link to={"/profile"} className='highlight'>Profile</Link>
            <Link to={"/feed"} className='highlight'>Public Page</Link>
            <Link to={"/chat"} className='highlight'>CHAT</Link>
        </div>
    )
}

export default Navbar