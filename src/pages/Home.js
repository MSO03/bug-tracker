import React, { useState, useEffect, useRef } from 'react';
import ProjectList from '../components/ProjectList';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'bugTracker.projects'

export default function Home( ){
	const [projects, setProjects] = useState([]);
	const projectTitle = useRef();
	const projectDescritpion = useRef();

	useEffect(() => {
		const storedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedProjects){
			setProjects(prevProjects => [...prevProjects,...storedProjects]);
		}
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
	}, [projects])

	function deleteAll(e){
		setProjects([]);
	}

	function handleAddProject(e){
		const title = projectTitle.current.value;
		const description = projectDescritpion.current.value;
		if (title === '' || description ==='') return;
		setProjects(prevProjects => {
			return[...prevProjects, {title:title, id:uuidv4(), description:description}]	
			}
		)
		projectTitle.current.value = null;
		projectDescritpion.current.value = null;
	}
	
	return(
		<>
			{projects.length === 0 ? <p>No projects found</p> : 
			<ProjectList projects={projects} />}
			<label htmlFor="title"> Project Title: </label>
			<input type="text" ref={projectTitle} 
			placeholder="Name of Project"/>
			<label htmlFor="description"> Project Description: </label>
			<input type="text" ref={projectDescritpion} 
			placeholder="Project Description"/>
			<button className="btn btn-success" type="submit" onClick={handleAddProject}>Add a new project</button>
			<button className="btn btn-success" onClick={deleteAll}>Delete All Projects</button>
		</>
	);
}


