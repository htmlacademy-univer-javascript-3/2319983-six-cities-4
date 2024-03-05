import Main from "../../pages/main/main";
import { ListProps } from "../main/list-places/list-places";
 

function App({places}: ListProps): JSX.Element {
    return(
        <Main places = {places}/>
    );
}

export default App;