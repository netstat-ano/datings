import { Route, Redirect, Switch } from "react-router-dom";
import Auth from "./components/pages/Auth/Auth";
import Main from "./components/pages/Main/Main";
import { useSelector } from "react-redux";
function App() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className="App">
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>
                <Route path="/login">
                    {!user ? <Auth /> : <Redirect to="/main"></Redirect>}
                </Route>
                <Route path="/main">
                    <Main />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
