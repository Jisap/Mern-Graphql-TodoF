import React from 'react'
import { useNavigate } from "react-router-dom"

export const ProjectCard = ({ project }) => {

  const navigate = useNavigate()

  return (
    <div
      onClick = {() => navigate(`/projects/${project._id}`)}
      className="bg-zinc-800 w-full rounded-lg shadow-lg p-4 mb-2 hover:bg-zinc-700 hover:cursor-pointer"
    >
        <h2 className="text-lg font-bold">{ project.name }</h2>
        <p className="text-slate-400 text-sm">{ project.description }</p>
    </div>
  )
}
