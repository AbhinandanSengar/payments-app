import { useState } from 'react'
import { SignUp } from '../../pages/Signup';
import { SignIn } from '../../pages/Signin';
import { Dashboard } from '../../pages/Dashboard';
import { SendMoney } from '../../pages/SendMoney';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [users, setUsers] = useState([{
    firstName: "Abhinandan",
    lastName: "Sengar",
    _id: 1
  }]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard users={users} />} />
          <Route path='/send' element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App