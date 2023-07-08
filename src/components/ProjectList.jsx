import React from 'react';
import Project from '../components/Project';


export default function ProjectList( {projects} ){
	return(
		<div className="container-fluid">
			<div className="row">
			{projects.map((project) => {
		  		return <Project project={project} key={project.docId} />
		  	})
			}
			</div>
		</div>
	);
}
