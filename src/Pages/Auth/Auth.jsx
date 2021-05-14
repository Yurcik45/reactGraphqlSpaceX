import "./Auth.sass"
import {useState} from "react"
import {useHistory} from "react-router-dom"

const Auth  = () => {

    const history = useHistory()

    const[userRegister] = useState({})
    const[userLogin] = useState({})


    const register = (e) => {
        userRegister[e.target.name] = e.target.value
        console.log("user", userRegister);
    }

    const login = (e) => {
        userLogin[e.target.name] = e.target.value
    }

    const clickRegister = () => {
        if(
            userRegister.name !== undefined &&
            userRegister.password !== undefined &&
            userRegister.password_confirm !== undefined &&
            userRegister.password_confirm === userRegister.password
        ) {
            localStorage.setItem("user", JSON.stringify(userRegister))
            window.location.replace("/")
            console.log("register success")
        } else {
            console.log("register failed")
        }

    }

    const clickLogin = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        if (
            userLogin.name === data.name &&
            userLogin.password === data.password
        ) {
            console.log("auth success");
            window.location.replace("/")
        } else {
            console.log("auth failed");
        }
        console.log("data", data);
    }

    return (
        <div className="Auth">
            <div className="loginContainer">
                <div className="text">sign in</div>
                <div className="input">
                    <input
                        type="text"
                        placeholder="input your name"
                        name="name"
                        onChange={(e) => login(e)}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        placeholder="input your password"
                        name="password"
                        onChange={(e) => login(e)}
                    />
                </div>
                <div className="button">
                    <button
                        onClick={clickLogin}
                    >login</button>
                </div>
            </div>
            <div className="registerContainer">
                <div className="text">or register new user</div>
                <div className="input">
                    <input
                        type="text"
                        placeholder="input your name"
                        name="name"
                        onChange={(e) => register(e)}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        placeholder="input your password"
                        name="password"
                        onChange={(e) => register(e)}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        placeholder="confirm your password"
                        name="password_confirm"
                        onChange={(e) => register(e)}
                    />
                </div>
                <div className="button">
                    <button
                        onClick={clickRegister}
                    >register</button>
                </div>
            </div>
        </div>
    )
}

export default Auth