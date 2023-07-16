import React, { useState, useRef, useEffect } from 'react';
import BugList from '../components/BugList';
import ProjectNavBar from '../components/ProjectNavBar';
import { useParams } from 'react-router';
import { doc, collection, addDoc, FieldPath, documentId, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function Bug({ bug }) {
  const projectId = useParams();

  async function deleteBug(bug) {
    try {
      await deleteDoc(
        doc(db, 'Projects', projectId.id, 'BugList', bug)
      );
    } catch (error) {
      console.error('Error deleting bug:', error);
    }
  }

  async function updatePriority(bug, priority) {
    const docRef = doc(db, "Projects", projectId.id, 'BugList', bug);
          await updateDoc(docRef, {
          priority : priority
          });
  }

  function handleDelete() {
    deleteBug(bug.docId);
  }

  function handlePriorityChange(priority) {
    updatePriority(bug.docId, priority);
  }

  return (
    <>
      <h2 className="accordion-header border border-1 border-primary">
        <button
          className="accordion-button collapsed text-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={'#' + bug.docId}
        >
          {bug.bugName}
        </button>
      </h2>
      <div
        id={bug.docId}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionBugs"
      >
        <div className="accordion-body">{bug.bugDesc}</div>
        <button
          className="btn-outline-primary btn"
          type="button"
          onClick={handleDelete}
        >
          Completed
        </button>
        <div className="btn-group dropend">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Priority
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePriorityChange('Urgent')}
              >
                Urgent
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePriorityChange('Medium')}
              >
                Medium
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePriorityChange('Minor')}
              >
                Minor
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
