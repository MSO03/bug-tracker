import React from 'react'
import Bug from './Bug';

export default function BugList( { bugs } ){

	return (
		<div className="accordion" id="accordionBugs">
			<div className="accordion-item" >
			{	bugs.map((bug, index) => {
				return <Bug bug={bug} key={bug.docId} 
				/>	
			})}
			</div>
		</div>
	);

}

