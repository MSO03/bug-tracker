import React, {useState} from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase/firebaseConfig';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function ProjectNavBar({ projectDocuments }) {
  const [userEmail, setUserEmail] = useState('');
  const [formError, setFormError] = useState(null);

  function handleAddUser() {
	  fetchSignInMethodsForEmail(auth, userEmail)
		  .then(async (result) => {
			  if(result.length > 0){
			  //Email exists so add to projects.user array 
				  const docRef = doc(db, "Projects", projectDocuments[0].docId);
				  await updateDoc(docRef, {
					users : arrayUnion(userEmail)
		                  });
				  setFormError("User added");
			  }
			  else {
			  //Email does not exist so send error
				setFormError("Email does not exist");
				setTimeout(() => setFormError(null), 12000);
			  } 
		  })
	  	.catch((error) => {
	  	//Other possible errors
			setFormError("Email does not exist");
			setTimeout(() => setFormError(null), 12000);
		});
  }

     return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="collapse navbar-collapse justify-content-start">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link">{projectDocuments[0].title}</a>
          </li>
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Edit Project
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <button
                type="button"
                className="dropdown-item btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
              >
                Add User
              </button>
              <a className="dropdown-item" href="#">
                Delete User
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Delete Project
              </a>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 d-flex">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0 mr-2"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {/* AddUser Modal */}
      <div
        className="modal fade"
        id="addUserModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Add User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
{formError && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ padding: "5px", margin: "5px" }}
          >
            {" "}
            {formError}{" "}
          </div>
        )}

              <form>
                <div className="form-group">
                  <label htmlFor="userEmail" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="userEmail"
		    placeholder="theirEmail@gmail.com"
         value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
