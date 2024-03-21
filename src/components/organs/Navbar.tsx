import { Link } from 'react-router-dom';
import "../../assets/styles/navbar.css"

const Landing = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/viewForms">Forms List</Link></li>
                <li><Link to="/createForm">Create Form</Link></li>
            </ul>
        </nav>
    )
}

export default Landing