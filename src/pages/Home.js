import React, { useState, useEffect, useRef } from 'react';
import ProjectList from '../components/ProjectList';
import {v4 as uuidv4} from 'uuid';
import { collection, addDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import useAuth from '../hooks/useAuth';
import useCollection from '../hooks/useCollection';
import {doc, deleteDoc} from 'firebase/firestore';

export default function Home( ){
	const [projects, setProjects] = useState([]);
	const projectTitle = useRef();
	const projectDescription = useRef();
	const { user } = useAuth();
	const userEmail = user?.email ?? '';
 	const { error, loading, documents } = useCollection("Projects" ,["users", "array-contains",
   	userEmail]
	);

	useEffect(() => {
		setProjects(documents);	
	}, [documents])

	function deleteAll() {
		console.log("delete");
	}


	async function handleAddProject(e){
		const title = projectTitle.current.value;
		const description = projectDescription.current.value;
		if (title === '' || description ==='') return;
		const docRef = await addDoc(collection(db, "Projects"), {
			title : projectTitle.current.value,
			description : projectDescription.current.value,
			owner : user.email,
			users: arrayUnion(user.email)
		});
		projectTitle.current.value = null;
		projectDescription.current.value = null;

	}
	
	return(
		<>
			{loading === true ? <h1> Loading Projects...</h1> : null}
			{error && <p>{error}</p>}
			{projects === null ? <p>No projects found</p> : 
			<ProjectList projects={projects} />}
			<div className="input-group mb-3">
				<input type="text" className="form-control" ref={projectTitle} 
				placeholder="Name of Project"/>
			</div>
			<div className="input-group">
				<textarea type="text" className="form-control" ref={projectDescription} 
				placeholder="Project Description"/>
			</div>
			<button className="btn" style={{backgroundColor: '#90EE90'}} 
			type="submit" onClick={handleAddProject}>Add Project</button>
			<button className="btn" style={{backgroundColor: '#90EE90'}} 
			onClick={deleteAll}>Delete All Projects</button>
		</>
	);
}


