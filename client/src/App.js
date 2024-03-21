import ListHeader from "./components/ListHeader";
import {useEffect, useState} from "react";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import {useCookies} from "react-cookie";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const userEmail = cookies.Email
    const [tasks, setTasks] = useState(null)
    const AuthToken = cookies.AuthToken



    const getData = async () => {
        try {
            //TODO jangan lupa ganti url
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
            const test = await response.json()
            setTasks(test)
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect (()=> {
        if (AuthToken) {
            getData()
        }
    }, [])
    console.log(tasks)
    
   

    //sort by date
    const sortedList = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="app">
            {!AuthToken && <Auth/>}
            {AuthToken &&
                <>
                    <ListHeader listname={'Your Favorite Todo List'} getData={getData}/>
                    <div className={'user-email-div'}>
                        <h2 className={'user-email'}>Welcome back, {userEmail}</h2>
                    </div>

                    {sortedList?.map((task) => <ListItem key={task.id} getData={getData} task={task}/>)}
                </>
            }

        </div>
  );
}

export default App;
