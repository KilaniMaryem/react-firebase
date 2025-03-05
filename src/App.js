import './App.css';
import { useEffect, useState } from 'react';
import { app, database, storage } from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSignOutAlt } from "react-icons/fa";

function App() {
  const auth = getAuth();
  const collectionRef = collection(database, 'users');
  let googleProvider = new GoogleAuthProvider();
  let githubProvider = new GithubAuthProvider();
  const [data, setData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const handleSignUpInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setSignUpData({ ...signUpData, ...inputs });
  };

  const addData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password).catch((e) => alert(e.message));
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password).then((userCredential) => {
      addDoc(collectionRef, { email: signUpData.email, uid: userCredential.user.uid })
        .then(() => alert('User Added to Firestore'))
        .catch((e) => alert('Error adding user: ' + e.message));
    }).catch((e) => alert('Error creating user: ' + e.message));
  };

  const addDataGoogle = () => {
    signInWithPopup(auth, googleProvider).catch((e) => alert(e.message));
  };

  const addDataGithub = () => {
    signInWithPopup(auth, githubProvider).catch((e) => alert(e.message));
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collectionRef);
      setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setShowUsers(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(database, 'users', userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => setIsLoggedIn(!!data));
  }, []);

  return (
    <div className="App-header">
      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout} style={{ position: 'absolute', top: '20px', right: '20px',borderRadius:'10px'}}>
          <FaSignOutAlt size={20} />
        </button>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card rounded shadow bg-light">
              <div className="card-body text-center">
                <h2 className="card-title">Sign Up</h2>
                <div className='mailDiv d-flex flex-column align-items-center'>
                  <input placeholder="Email" name="email" type="email" className="inp form-control mb-2" onChange={handleSignUpInputs} />
                  <input placeholder="Password" name="password" type="password" className="inp form-control mb-2" onChange={handleSignUpInputs} />
                </div>
                <button className="button btn btn-dark" onClick={signUp}>Sign Up</button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card rounded shadow bg-light">
              <div className="card-body text-center">
                <h2 className="card-title">Sign In</h2>
                <div className="auth-buttons mb-3">
                  <button className="button btn btn-dark me-2" onClick={addDataGoogle}><FcGoogle size={30} /></button>
                  <button className="button btn btn-dark" onClick={addDataGithub}><FaGithub size={30} /></button>
                </div>
                <hr className="separator" />
                <div className='mailDiv d-flex flex-column align-items-center'>
                  <input placeholder="Email" name="email" type="email" className="inp form-control mb-2" onChange={handleInputs} />
                  <input placeholder="Password" name="password" type="password" className="inp form-control mb-2" onChange={handleInputs} />
                </div>
                <button className="button btn btn-dark mb-3" onClick={addData}>Log in</button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card rounded shadow bg-light">
              <div className="card-body text-center">
                <h2 className="card-title">Users</h2>
                <button className="button btn btn-dark mb-4" onClick={fetchData}>Display Users</button>
                {showUsers && (
                  <div className="users-list">
                    {users.map((user) => (
                      <div key={user.id} className="card mb-3">
                        <div className="card-body">
                          <p className="card-text" style={{ fontSize: '12px' }}><strong>Email:</strong> {user.email}</p>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;