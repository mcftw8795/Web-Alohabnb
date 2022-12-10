
import React from "react";

const Login = (props) => {
    var login_user = props.login_user.username;
    return (
        <div>
            <title>login_user</title>
            <h1>
                {login_user}
            </h1>
        </div>
    );
};

export default Login;