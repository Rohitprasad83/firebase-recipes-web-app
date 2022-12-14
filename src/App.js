import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import FirebaseAuthService from './FirebaseAuthService'
function App() {
  const [user, setUser] = useState(null)

  FirebaseAuthService.subscribeToAuthChanges(setUser)

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title"> Firebase Recipes </h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
    </div>
  )
}

export default App
