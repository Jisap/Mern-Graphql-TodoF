import { TaskCard } from './TaskCard'
import { ImFileEmpty } from "react-icons/im";

export const TaskList = ({ tasks }) => {
  if( !tasks.length)
    return (
      <div className="flex justify-center content-center p-5">
        <div>
          <ImFileEmpty className="h-32 w-32 text-zinc-500 pb-4" />
          <h1 className='text-center'>No task yet</h1>
        </div>
      </div>
  )

  return (
      <div>
        { tasks.map( task => (
          <TaskCard task={ task } key={ task._id }/>
        ))}
      </div>
    )
}
