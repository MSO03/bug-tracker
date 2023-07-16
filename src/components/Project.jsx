import React from 'react';
import { Route, Routes, useNavigate, Link} from 'react-router-dom';
import BugPage from '../pages/BugPage';
import {projectContext} from '../App';

export default function Project( {project} ){

	return(
		<div className="col-md-4">
			<div className="card" >
  				<img src=""className="card-img-top"/>
  				<div className="card-body">
    				<h5 className="card-title">{project.title}</h5>
    				<p className="card-text">{project.description}</p>
    				<Link to={`/project/${project.docId}`}>Go to project</Link>
				</div>
  			</div>
  		</div>

	);
}
