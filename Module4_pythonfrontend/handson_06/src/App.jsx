import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/courses/:id" element={<CourseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;