import React from 'react'
import Bug from './Bug';

export default function BugList( {bugs, toggleBug} ){

	return (
		<ol className="list-group list-group-numbered">
		{	bugs.map((bug, index) => {
			console.log(index);
			return <Bug bug={bug} key={bug.id} toggleBug={toggleBug} index={index}  />	
		})}
		</ol>
	);

}

