import { Link } from 'react-router-dom';
import "../../assets/styles/landing.css"

const Landing = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/viewForms">Submitted Forms</Link></li>
                <li><Link to="/createForm">Create Form</Link></li>
            </ul>
        </nav>
    )
}

export default Landing