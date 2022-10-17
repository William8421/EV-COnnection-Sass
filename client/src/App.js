// styles
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import './styles/style.scss'

// libraries
import { Routes, Route } from "react-router-dom";

// routes
import HomePage from "./components/routes/homePage/HomePage.js";
import AboutUs from "./components/routes/about-us/AboutUs.js";
import ContactUs from "./components/routes/contact/ContactUs.js";
import Profile from "./components/routes/profile/Profile.js";
import UserProfile from "./components/routes/profile/UserProfile.js"
import EditProfile from "./components/routes/profile/EditProfile.js";

// routes-maps
import Main from "./components/routes/mainMap/Main.js";
import FinalRoute from "./components/routes/finalMap/FinalRoute.js";
import NewFinalRoute from "./components/routes/finalMap/NewFinalRoute.js";

// components
import NavBar from "./components/navigation/NavBar.js";
import Messages from "./components/routes/messages/MessageBoard";

// Provider
import { AuthProvider } from "./context/authContext/AuthContext.js";
import { MapProvider } from "./context/mapContext/MapContext.js";
import { CommentsProvider } from "./context/commentsContext/CommentsContext.js";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <MapProvider>
          <CommentsProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<HomePage />} />

              <Route path="/aboutus" element={<AboutUs />} />

              <Route path="/contact" element={<ContactUs />} />
              <Route path="/editProfile" element={<EditProfile />} />

              <Route path="/account" element={<Profile />} />
              <Route path="/userProfile/:id" element={<UserProfile />} />
             

              <Route path="/germany" element={<Main />} />
              <Route path="/calc_route" element={<FinalRoute />} />
              <Route path="/calc_newroute" element={<NewFinalRoute />} />

              <Route path="/board" element={<Messages />} />
            </Routes>
          </CommentsProvider>
        </MapProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
