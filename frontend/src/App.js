import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AbonementDetailPage from "./pages/AbonementsPages/AbonementDetailPage/AbonementDetailPage";
import AbonementsListPage from "./pages/AbonementsPages/AbonementsListPage/AbonementsListPage";
import InstructorDetailPage from "./pages/InstructorsPages/InstructorDetailPage/InstructorDetailPage";
import InstructorListPage from "./pages/InstructorsPages/InstructorsListPage/InstructorsListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { RecoilRoot } from "recoil";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ClassesPage from "./pages/ClassesPage/ClassesPage";

function App() {
    return (
        <RecoilRoot>
            <Navbar />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/instructors" element={<InstructorListPage />} />
                <Route
                    path="/instructors/:id"
                    element={<InstructorDetailPage />}
                />
                <Route path="/abonements" element={<AbonementsListPage />} />
                <Route
                    path="/abonements/:id"
                    element={<AbonementDetailPage />}
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<ClassesPage />} />
            </Routes>
            {/* <Footer /> */}
        </RecoilRoot>
    );
}

export default App;
