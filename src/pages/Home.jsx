import axios from "axios";
import { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar";

const Beranda = () => {
	// const [menuData, setMenuData] = useState();
	const [isLogin, setIsLogin] = useState(false);
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}check_login.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "sudah login") setIsLogin(true);
			});
	}, []);
	return (
		<div>
			<Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
			<Jumbotron />
		</div>
	);
};

export default Beranda;
