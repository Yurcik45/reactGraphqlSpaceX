import { useQuery, gql } from "@apollo/client"
import './App.sass';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Exit from "./Pages/Exit/Exit";
import Menu from "./Components/Menu/Menu"

const App = () => {

  const ALL_USERS = gql`
  query Users(
    $name: String
    $rocket: String
    $twitter: String
  ) {
    users(where: {name: {_ilike: $name}, rocket: {_ilike: $rocket}, twitter: {_ilike: $twitter}}) {
      name
      rocket
      timestamp
      twitter
      id
    }
  }
  `

  const { data, error, loading, refetch, fetchMore } = useQuery(
    ALL_USERS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { name: '%%', rocket: '%%', twitter: '%%' },
    }
  )


  const auth = localStorage.getItem("user") ? true : false

  return (
    <div className="App">
      <BrowserRouter>
        <Menu auth={auth}/>
        <Switch>
          <Route exact path="/auth">
            <Auth/>
          </Route>
          <Route exact path={ auth ? "/" : "/auth"}>
            <Home
              search={(name, rocket, twitter) => {
                console.log("name", name);
                refetch({
                  name: `%${name}%`,
                  rocket: `%${rocket}%`,
                  twitter: `%${twitter}%`
                });
              }}
              data={data}
              loading={loading}
              error={error}
            />
          </Route>
          <Route exact path="/exit">
            <Exit/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
