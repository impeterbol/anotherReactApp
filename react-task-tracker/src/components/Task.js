import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
    return (
        //1:02:53
        <div className={`task ${task.reminder ? 'reminder': ''}`} onMouseDown={() => onToggle(task.id)} >
            <h3> 
                {task.text}{' '} 
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>

        </div>
    )
}

export default Task