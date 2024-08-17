import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from "./routes/Home"
import Signin from "./routes/Signin"
import Signup from "./routes/Signup"
import Profile from './routes/Profile';
import Voting from './routes/Voting';
import RateModel from "./routes/Rate";
import Admin from "./routes/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path='voting' element={<Voting />} />
          <Route path='profile' element={<Profile />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="rate" element={<RateModel/>}/>
          <Route path="admin" element={<Admin/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
