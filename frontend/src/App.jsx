import axios from 'axios';
import { BACKEND_URL } from './config';
import { SignUp } from './pages/Signup';
import { SignIn } from './pages/Signin';
import { useEffect, useState } from 'react'
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/bulk`);
        setUsers(response.data.users);
      } catch(error) {
        console.error("failed to fetch users: ", error);
      }
    };

    fetchUsers();
  }, []);

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