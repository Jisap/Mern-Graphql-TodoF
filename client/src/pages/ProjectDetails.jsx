import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECT, DELETE_PROJECT } from '../graphql/projects';
import { TaskList } from '../components/task/TaskList';
import { TaskForm } from '../components/task/TaskForm';

export const ProjectDetails = () => {
  
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables:{
      id: params.id
    },
    skip: !params.id, // Nos saltamos la ejecución de la mutation hasta que params.id tenga valor
  });

  const [deleteProject, { loading: deleting, error: deleteError }] =
		useMutation(DELETE_PROJECT, {
			refetchQueries: ["getProjects"],
		});
	const navigate = useNavigate();

	const handleDelete = async () => {
		const result = await deleteProject({
			variables: {
				id: params.id,
			},
		});
		if (result.data.deleteProject._id) {
			navigate("/projects");
		}
	};
  
  if( loading ) return <p>Loading...</p>
  if( error ) return <p>Error!</p>

  return (
    <div className="w-2/5 rounded">

      { deleteError && (
				  <p className="bg-red-500 p-2 mb-2 text-center">{ deleteError.message }</p>
			  )}

      <Link to="/projects">
        <button
          className='bg-sky-900 text-white text-center px-3 py-2 mb-2 hover:bg-sky-600 transition duration-200 ease-in-out rounded'
        >Back</button>
      </Link>

      <div className="bg-zinc-900 mb-2 p-10 flex justify-between rounded-md">  
        <div>
          <h1 className="text-2xl">{ data.project.name }</h1>
          <p>{ data.project.description }</p>
        </div>
        <div>
          <button
            onClick={ handleDelete } 
            className="bg-red-400 px-3 py-2 hover:bg-red-600 transition duration-200 ease-in-out rounded"

          >
              { deleting ? "Deleting..." : "Delete" }
          </button>
        </div>
      </div>

        <TaskForm />

        <TaskList tasks={ data.project.tasks }/>
    </div>
  )
}
