import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Beranda from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TambahMenu from "./pages/TambahMenu";
import EditMenu from "./pages/EditMenu";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Beranda />} />
				<Route path="/list" element={<Menu />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/tambah_menu" element={<TambahMenu />} />
				<Route path="/edit_menu/:id" element={<EditMenu />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
