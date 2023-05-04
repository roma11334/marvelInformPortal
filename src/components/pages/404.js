import ErrorMessage from "../errorMessage/errorMesage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return(
        <>
            <ErrorMessage/>
            <h1 style={{'display':'block', 'textAlign': 'center'}}>Page is not found</h1>
            <Link style={{'color':'#9f0013','display':'block', 'textAlign': 'center'}} to="/">
                <h2>Go to main page</h2>
            </Link>
        </>
    )   
}

export default Page404