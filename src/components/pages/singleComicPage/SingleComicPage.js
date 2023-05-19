import './singleComicPage.scss';
import { Link } from 'react-router-dom'

const SingleComicPage = ({data}) => {
    const {desc, title, price, thumbnail, page} = data
    console.log('we are here')
    return(
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{desc}</p>
                <p className="single-comic__descr">{page} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to={'../comics'} className="single-comic__back">Back to all</Link>
        </div>

    )
}

export default SingleComicPage