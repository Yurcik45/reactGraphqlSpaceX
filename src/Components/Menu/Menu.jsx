import "./Menu.sass"
import { NavLink } from "react-router-dom";

const Menu = props => {


    const logOut = () => {
        localStorage.clear()
        window.location.replace("/exit")
    }

    return (
        <div className="Menu">
            <div className="menuContainer">
                <NavLink to="/" onClick={() => props.auth ? null : window.location.replace("/auth")} ><div>home</div></NavLink>
                {
                    props.auth
                    ? null
                    : <NavLink to="/auth"><div>auth</div></NavLink>
                }
                {
                    props.auth
                    ? <NavLink to="/exit" onClick={logOut}><div>exit</div></NavLink>
                    : null
                }
            </div>
        </div>
    )
}

export default Menu;