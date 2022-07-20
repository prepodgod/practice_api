import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { Link } from 'react-router-dom'

const Page404 = () => {

    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontSize': '30px', 'color': 'red' }}>Page doesnt exist</p>
            <Link to="/" style={{ 'display': 'block', 'textAlign': 'center', 'fontSize': '30px' }}>Back to the main page</Link>
        </div>
    )
}

export default Page404;