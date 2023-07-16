import React, { useState, useRef, useEffect} from 'react';
import BugList from '../components/BugList';
import ProjectNavBar from '../components/ProjectNavBar';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import { doc, collection, addDoc, documentId } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import useCollection from '../hooks/useCollection';


export default function BugPage( ){
	const [bugs, setBugs] = useState([]);
	const bugNameRef = useRef();
	const bugDescRef = useRef();
	const projectId = useParams();
	//To get BugList subCollection
  	const bugListQuery = ["__name__", "!=", "b"];
	const subCollectionName = `Projects/${projectId.id}/BugList`;
  	const { error, loading, documents } = useCollection(subCollectionName, bugListQuery);
	
	//To get Project Document
	const projectQuery = ["__name__", "==", projectId.id]
	const { error: projectError, loading: projectLoading,
	documents: projectDocuments } = useCollection("Projects", projectQuery);
	
  	useEffect(() => {
		setBugs(documents);	
	}, [documents])

	async function handleAddBug(e) {
		const name = bugNameRef.current.value;
		const desc = bugDescRef.current.value;
		if (name === '') return;
		if (desc === '') return;	
		const bugRef = await addDoc(collection(db, "Projects", projectId.id, "BugList"),{
			bugName : name,
			bugDesc : desc
		});
		bugNameRef.current.value = null;
		bugDescRef.current.value = null;
	}

	

	return(
		<>	
			{projectDocuments === null ? <h4>Project not found</h4> :
			<ProjectNavBar projectDocuments={projectDocuments}/>}
			{loading === true ? <h1> Loading Bugs...</h1> : null}
			{error && <p>{error}</p>}
			{projectLoading === true ? <h4> Loading Title...</h4> : null}
			{projectError && <p>{projectError}</p>}
			{bugs === null ? <p>No bugs found</p> : <BugList bugs={bugs} 
			/>}
			<input type="text" placeholder="Title" className="form-control" ref={bugNameRef}/>
			<textarea type="text" placeholder="Description" className="form-control" ref={bugDescRef}/>
			<button className="btn" onClick={handleAddBug} style={{backgroundColor: '#90EE90'}}>
			Add a new Bug </button>
		</>
	);
}


