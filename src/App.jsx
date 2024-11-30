import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import FavoritePage from "./pages/FavoritePage";
import EditPage from "./pages/EditPage";

function App() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/starred" element={<FavoritePage />} />
                    <Route path="/edit/:id" element={<EditPage />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
