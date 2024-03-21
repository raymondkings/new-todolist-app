import ProgressBar from "./ProgressBar";
import {useState} from "react";
import Modal from "./Modal";
import TickIcon from "./TickIcon";

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteData = async () => {

        try {
            //TODO Jangan lupa ganti serverurl
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                setShowModal(false)
                getData()
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='list-item'>
            <div className="info-container">
                <TickIcon/>
                <p className="task-title">{task.title}</p>
                <ProgressBar progress = {task.progress}/>
            </div>

            <div className="button-container">
                <button className="edit-button" onClick={() => setShowModal(true)}>EDIT</button>
                <button className="delete-button" onClick={() => deleteData()}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData = {getData} task={task}/>}
        </div>
    );
}

export default ListItem;