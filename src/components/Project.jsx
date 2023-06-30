import React from 'react';
import { useContext } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import BugPage from '../pages/BugPage';
import {projectContext} from '../App';

export default function Project( {project} ){
	const navigate = useNavigate();
	const setProject = useContext(projectContext);
		
	const handleClick = () => {
		setProject(project.id);
		navigate(`/project/${project.id}`);
	}

	return(
		<div className="col-md-4">
			<div className="card" >
  				<img src="..." className="card-img-top" alt="..."/>
  				<div className="card-body">
    				<h5 className="card-title">{project.title}</h5>
    				<p className="card-text">{project.description}</p>
    				<button className="btn btn-outline-success" onClick={handleClick}>Go to project</button>
				</div>
  			</div>
  		</div>

	);
}
