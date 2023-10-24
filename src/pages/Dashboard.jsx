import axios from "axios";
import { useEffect, useState } from "react";
import {
	PlusCircleIcon,
	ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import CardListDashboard from "../components/CardListDashboard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
	const [menu, setMenu] = useState();

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}dashboard.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "bukan admin") {
					alert("Kamu Bukan Admin");
					window.location.href = "/";
				} else if (res.data === "belum login") {
					alert("Harap Login Terlebih Dahulu");
					window.location.href = "/login";
				} else {
					setMenu(res.data);
				}
			});
	}, []);

	return (
		<>
			<Navbar isLogin={true} />
			<div className="mx-8 mt-8 md:mx-auto md:container">
				<h1 className="text-6xl">Admin Dashboard</h1>
				<div className="flex gap-2">
					<Link to={"/tambah_menu"}>
						<button className="flex items-center h-12 gap-2 px-3 py-2 mt-4 mb-4 text-white bg-green-700 rounded-lg w-max">
							<PlusCircleIcon className="w-6" />
							<h1>Tambah Menu</h1>
						</button>
					</Link>
					<Link to={"/list"}>
						<button className="flex items-center h-12 gap-2 px-3 py-2 mt-4 mb-4 text-green-700 border-2 border-green-700 rounded-lg w-max">
							<ArrowUturnLeftIcon className="w-6" />
							<h1>Kembali Ke Halaman Menu</h1>
						</button>
					</Link>
				</div>
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left">
						<thead className="text-lg text-center text-white uppercase bg-green-700">
							<tr>
								<th scope="col" className="px-6 py-3 text-left">
									Menu
								</th>
								<th scope="col" className="px-6 py-3">
									Kategori
								</th>
								<th scope="col" className="px-6 py-3">
									Harga
								</th>
								<th scope="col" className="px-6 py-3">
									Edit
								</th>
								<th scope="col" className="px-6 py-3">
									Delete
								</th>
							</tr>
						</thead>
						<tbody>
							{menu?.map((item, index) => (
								<CardListDashboard key={index} item={item} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
