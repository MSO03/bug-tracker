import React, {useState} from 'react';

export default function Bug( {bug, toggleBug, index} ){

	function handleCheckbox() {
		toggleBug(bug.id);
	}

	return (
		<li className="list-group-item list-group-item-action ">
			<input className="form-check-input me-1" type="checkbox" checked={bug.complete} onChange={handleCheckbox} />
			{bug.name}
		</li>
	);
}
