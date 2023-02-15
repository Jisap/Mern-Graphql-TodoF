import React from 'react'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'


export const Projects = () => {
  return (
    <div className='bg-zinc-900 rounded-md shadow-lg shadow-black p-8 h-3/5 w-3/5'>
      <h1 className='text-2xl font-bold py-2 mb-4 text-white'>Project Manager - Graphql</h1>
      <div className="flex justify-between gap-x-1">
        <ProjectForm />
        <ProjectList />
      </div>
    </div>
  )
}
