import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PROJECT, GET_PROJECTS } from '../graphql/projects'


const initialState = {
  name: "",
  description: "",
}

export const ProjectForm = () => {

  const [project, setProject] = useState({ initialState });                   // Estado

  const [createProject, { loading, error }] = useMutation( CREATE_PROJECT, {  // Mutation para crear proyecto
    refetchQueries:[
      { query: GET_PROJECTS }, 'GetProjects'],
  });

  const handleChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value })
  };

  
  const handleSubmit = (e) => {
    e.preventDefault()
    createProject({                                                             // El submit usa los valores del formulario en la mutation
      variables:{
        name: project.name,
        description: project.description
      }
    });
    setProject( initialState );
    
  }
  
  

  return (
    <form onSubmit={ handleSubmit } className="w-2/5">

    {error && <p className="bg-red-500 p-3 mb-2">{error.message}</p>}

      <input 
        type="text" 
        name="name" 
        placeholder='Escribe un título'
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"         
        onChange={ handleChange } 
      />
      <textarea 
        name="description"  
        rows="3" 
        placeholder='Escribe una descripción'
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
        onChange={ handleChange }
        ></textarea>
      <button 
        disabled={ !project.name || !project.description } 
        className="bg-blue-500 px-4 rounded-md py-1 text-lg mb-3 disabled:bg-zinc-400 hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  )
}
