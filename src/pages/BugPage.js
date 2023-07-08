import React, { useState, useRef, useEffect} from 'react';
import BugList from '../components/BugList';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import { doc, collection, addDoc, FieldPath, documentId, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import useCollection from '../hooks/useCollection';


export default function BugPage( ){
	const [bugs, setBugs] = useState([]);
	const bugNameRef = useRef();
	const projectId = useParams();
  	const bugListQuery = ["__name__", "!=", "b"];
	const subCollectionName = `Projects/${projectId.id}/BugList`;
  	const { error, loading, documents } = useCollection(subCollectionName, bugListQuery);
	console.debug(documents);

  	useEffect(() => {
		setBugs(documents);	
	}, [documents])

	async function handleAddBug(e) {
		const name = bugNameRef.current.value;
		if (name === '') return;
		const bugRef = await addDoc(collection(db, "Projects", projectId.id, "BugList"),{
			bugName : name 
		});
		bugNameRef.current.value = null;
	}

	async function handleClearBugs(e) {
	const completedBugs = bugs.filter(bug => bug.complete === true);
  	completedBugs.forEach(async bug => {
    	try {
      		await deleteDoc(doc(db, "Projects", projectId.id, "BugList", bug.docId));
    	} catch (error) {
      		console.error("Error deleting bug:", error);
    	}
  	});

  	const remainingBugs = bugs.filter(bug => bug.complete === false);
  	setBugs(remainingBugs);
	}

	function toggleBug(id){
		const newBugs = [...bugs];
		const bug = newBugs.find(bug => bug.docId === id);
		bug.complete = !bug.complete;
		setBugs(newBugs);
	}

	return(
		<>	
			{loading === true ? <h1> Loading Bugs...</h1> : null}
			{error && <p>{error}</p>}
			{bugs === null ? <p>No bugs found</p> : <BugList bugs={bugs} toggleBug={toggleBug} />}
			<input type="text" ref={bugNameRef}/>
			<button className="btn" onClick={handleAddBug} style={{backgroundColor: '#90EE90'}}>
			Add a new Bug </button>
			<button className="btn" onClick={handleClearBugs} style={{backgroundColor: '#90EE90'}}>
			Delete completed bugs </button>
		</>
	);
}


