import {useState} from "react";
import {useCookies} from "react-cookie";

const Auth = () => {
    const [error, setError] = useState(null)
    const [isLogIn, setisLogin] = useState(true)


    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    
    const viewLogin = (status) => {
        setError(null)
        setisLogin(status)
    }
    

    const handleSubmit = async (e, endpoint) => {
        
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError('Make sure password match!')
            return
        }
        console.log('endpoint', endpoint)
        //TODO benerin addresssss
        const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,password}),
        })
        console.log('Response', response)
        
        const data = await response.json()
        console.log('data', data)
        console.log('data.email: ', data.email)
        console.log('data.token: ', data.token)

        if (data.detail) {
            setError(data.detail)
        }
        else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
            console.log('Cookie di Auth.js', cookies)
            window.location.reload()
        }
    }

    return (
        <div className={"auth-container"}>
            <div className={"auth-container-box"}>
                <form>
                    <h2 style={{color: '#6c584c'}}>
                        {isLogIn? 'Log In': 'Sign up'}
                    </h2>
                    <input type={'email'} placeholder={'email'} onChange={(e) => setEmail(e.target.value)}/>
                    <input type={'password'} placeholder={'password'} onChange={(e) => setPassword(e.target.value)}/>
                    {!isLogIn && <input type={'password'} placeholder={'confirm password'} onChange={(e) => setConfirmPassword(e.target.value)}/>}
                    <input type={'submit'} className={'create'} onClick={(e) => handleSubmit(e, isLogIn? 'login' : 'signup')}/>
                    {error && <p>{error}</p>}
                </form>

                <div className={'auth-options'}>
                    <button
                        onClick={() => viewLogin(false)}
                        style={{backgroundColor: !isLogIn? "#6c584c" :"white", color: !isLogIn? "white": "#6c584c"}}>
                        Sign Up
                    </button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{backgroundColor: isLogIn? "#6c584c" : "white", color: !isLogIn? "#6c584c": "white"}}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
