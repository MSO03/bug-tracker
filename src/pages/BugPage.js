import React, { useState, useRef, useEffect } from 'react';
import BugList from '../components/BugList';
import {v4 as uuidv4} from 'uuid';


export default function BugPage( {projectKey} ){
	const [bugs, setBugs] = useState([]);
	const bugNameRef = useRef();
	let LOCAL_STORAGE_KEY = localStorage.getItem(projectKey);

	useEffect(() => {
		if(LOCAL_STORAGE_KEY === null){
			localStorage.setItem(projectKey, uuidv4());
			LOCAL_STORAGE_KEY = localStorage.getItem(projectKey);
		}
		const storedBugs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedBugs){
			setBugs(prevBugs => [...prevBugs,...storedBugs]);
		}
	}, [])
		

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bugs));
	}, [bugs])

	function toggleBug(id){
		const newBugs = [...bugs];
		const bug = newBugs.find(bug => bug.id === id);
		bug.complete = !bug.complete;
		setBugs(newBugs);
	}
	
	function handleAddBug(e) {
		const name = bugNameRef.current.value;
		if (name === '') return;
		setBugs(prevBugs => {
			return[...prevBugs, {id :uuidv4(), name:name, complete: false}]	
		})
		bugNameRef.current.value = null;
	}

	function handleClearBugs(e) {
		const newBugs = bugs.filter(bug => bug.complete === false);
		setBugs(newBugs);
	}

	return(
		<>	
			{bugs.length === 0 ? <p>No bugs found</p> : <BugList bugs={bugs} toggleBug={toggleBug} />}
			<input type="text" ref={bugNameRef}/>
			<button className="btn  " onClick={handleAddBug} style={{backgroundColor: '#90EE90'}}>
			Add a new Bug </button>
			<button className="btn " onClick={handleClearBugs} style={{backgroundColor: '#90EE90'}}>
			Delete completed bugs </button>
			{bugs.length >= 1 ? <div> {bugs.filter(bug => !bug.complete).length} left to do </div> : null }
		</>
	);
}


