import { Disclosure } from "@headlessui/react";
import {
	Bars3Icon,
	XMarkIcon,
	ArrowRightOnRectangleIcon,
	ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ isLogin, setIsLogin }) => {
	const navigation = [
		{ name: "Beranda", href: "/" },
		{ name: "Menu", href: "/list" },
	];

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const handleLogout = () => {
		if (confirm("Apakah Anda yakin ingin keluar?")) {
			axios
				.get(`${import.meta.env.VITE_API_URL}logout.php`, {
					withCredentials: true,
				})
				.then((res) => {
					alert("Anda berhasil keluar");
					if (res.data === "berhasil logout") window.location.href = "/";
					setIsLogin(false);
				});
		}
	};

	return (
		<Disclosure as="nav" className="bg-green-800">
			{({ open }) => (
				<>
					<div className="px-2 mx-2 md:mx-auto md:container">
						<div className="flex items-center justify-between">
							<div className="flex items-center justify-between w-full col-1 sm:justify-start">
								<Disclosure.Button className="flex items-center justify-center p-2 text-green-400 rounded-md sm:hidden hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block w-8 h-8" aria-hidden="true" />
									) : (
										<Bars3Icon className="block w-8 h-8" aria-hidden="true" />
									)}
								</Disclosure.Button>
								<div className="flex items-center">
									<img
										className="w-24 sm:w-32"
										src={Logo}
										alt="Waroeng Susea"
									/>
								</div>
								<div className="hidden w-full sm:w-auto sm:block sm:ml-4">
									<div className="flex">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-green-900 text-white"
														: "text-white hover:bg-green-700 hover:text-white",
													"rounded-md px-3 py-2 text-md font-medium"
												)}
												aria-current={item.current ? "page" : undefined}>
												{item.name}
											</a>
										))}
									</div>
								</div>
								<div className="flex items-center justify-end gap-5 sm:w-full col-2">
									<motion.div
										className="login-button"
										initial={{ scale: 1 }}
										whileHover={{ scale: 1.06 }}
										whileTap={{ scale: 0.8 }}>
										{isLogin ? (
											<button
												onClick={handleLogout}
												className="flex gap-2 px-3 py-3 font-medium text-white bg-green-900 rounded-md logout text-md">
												<ArrowRightOnRectangleIcon className="block w-6 h-6 text-white" />
												<div className="hidden text sm:block">Keluar</div>
											</button>
										) : (
											<Link to={"/login"}>
												<button className="flex gap-2 px-3 py-3 font-medium text-white bg-green-900 rounded-md login text-md">
													<ArrowLeftOnRectangleIcon className="block w-6 h-6 text-white" />
													<div className="hidden text sm:block">Masuk</div>
												</button>
											</Link>
										)}
									</motion.div>
								</div>
							</div>
						</div>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-green-900 text-white"
											: "text-gray-300 hover:bg-green-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Navbar;
