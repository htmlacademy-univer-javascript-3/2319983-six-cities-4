import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function NotFound(): JSX.Element {
    return (
        <div>
            <h1>404 </h1>
            <h2>Page not found &#128542;</h2>
            <h2><Link to={AppRoute.Main}>На главную</Link></h2>
        </div>
    );
}

export default NotFound;