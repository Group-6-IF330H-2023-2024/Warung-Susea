import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardMenu from "../components/CardMenu";
import SkeletonCardMenu from "../components/SkeletonCardMenu";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Menu = () => {
	const [menuData, setMenuData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isLogin, setIsLogin] = useState(false);
	const [cart, setCart] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("semua");

	const toggleCart = () => {
		setIsCartOpen(!isCartOpen);
	};

	const formatToRupiah = (number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(number);
	};

	const hitungTotalHarga = () => {
		let total = 0;
		for (const item of cart) {
			total += item.harga * item.jumlah;
		}
		return total;
	};

	const tambahKeCart = (menuData) => {
		const cekItem = cart.find((item) => item.id === menuData.id);

		if (cekItem) {
			const updatedCart = cart.map((item) =>
				item.id === menuData.id ? { ...item, jumlah: item.jumlah + 1 } : item
			);
			setCart(updatedCart);
		} else {
			setCart([...cart, { ...menuData, jumlah: 1 }]);
		}
	};

	const hapusDariCart = (menuData) => {
		const cekItem = cart.find((item) => item.id === menuData.id);

		if (cekItem) {
			if (cekItem.jumlah > 1) {
				const updatedCart = cart.map((item) =>
					item.id === menuData.id ? { ...item, jumlah: item.jumlah - 1 } : item
				);
				setCart(updatedCart);
			} else {
				const updatedCart = cart.filter((item) => item.id !== menuData.id);
				setCart(updatedCart);
			}
		}
	};

	const tambahPesanan = () => {
		axios
			.post(
				`${import.meta.env.VITE_API_URL}add_pesanan.php`,
				{ cart: cart },
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				if (res.data === "berhasil") {
					alert("Pesanan berhasil ditambahkan");
					window.location.reload();
				} else alert(res.data);
			});
		setCart([]);
	};
	const fetchMenuData = (selectedCategory) => {
		setIsLoading(true);

		axios
			.get(
				`${
					import.meta.env.VITE_API_URL
				}get_menu.php?kategori=${selectedCategory}`,
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				setMenuData(res.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("gagal mengambil data:", error);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchMenuData(selectedCategory);
		axios
			.get(`${import.meta.env.VITE_API_URL}check_login.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "sudah login") setIsLogin(true);
			});
	}, [selectedCategory]);

	return (
		<div>
			<Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
			<div className="mx-6 mt-8 popular-menu-section md:mx-auto md:container">
				<div className="flex flex-col items-center justify-center text-xl font-medium heading">
					<h1 className="text-xl italic md:text-3xl">Menu</h1>
					<p className="mt-3">Kategori: </p>
					<select
						name="kategori"
						id="kategori"
						className="px-4 py-1 mt-3 text-center text-white bg-green-700 rounded-md appearance-none"
						onChange={(e) => {
							setSelectedCategory(e.target.value);
							fetchMenuData(e.target.value);
						}}>
						<option value="semua">Semua Kategori</option>
						<option value="Sushi Roll">Sushi Roll</option>
						<option value="Hidangan Utama">Hidangan Utama</option>
						<option value="Sashimi">Sashimi</option>
						<option value="Minuman">Minuman</option>
						<option value="Hidangan Penutup">Hidangan Penutup</option>
					</select>
				</div>
				<div className="mt-8 list-menu">
					<div className="flex flex-wrap gap-6 md:grid-cols-2 xl:grid-cols-4 md:grid place-items-center">
						{isLoading
							? menuData?.map((menuData, index) => (
									<SkeletonCardMenu key={index} menuData={menuData} />
							  ))
							: menuData?.map((menuData, index) => (
									<>
										<CardMenu
											key={index}
											menuData={menuData}
											isLogin={isLogin}
											tambahKeCart={tambahKeCart}
											hapusDariCart={hapusDariCart}
											index={index}
										/>
									</>
							  ))}
					</div>

					{cart.length > 0 && (
						<div className="relative">
							<motion.button
								initial={{ scale: 1 }}
								whileHover={{ scale: 1.06 }}
								whileTap={{ scale: 0.8 }}
								className="fixed flex gap-4 p-4 text-white bg-green-900 rounded-full shadow-md shadow-green-900 md:rounded-md bottom-8 md:right-10 right-8"
								onClick={toggleCart}>
								<ShoppingCartIcon className="w-6" />
								<h1 className="hidden md:block">Pesanan Kamu</h1>
							</motion.button>
							{isCartOpen && (
								<motion.div
									initial={{ translateX: 100, opacity: 0 }}
									animate={{ translateX: 0, opacity: 1 }}
									transition={{ duration: 1.05, type: "spring" }}
									className="fixed flex flex-col items-center gap-6 p-8 bg-white rounded-md shadow-md md:gap-10 md:items-end md:flex-row bottom-24 right-8 md:right-10">
									<div className="flex flex-col gap-4">
										{cart?.map((item, index) => (
											<div
												key={index}
												className="flex items-center gap-2 p-2 border-2 border-green-900 rounded-md shadow-md">
												<div className="image">
													<img
														src={`${import.meta.env.VITE_IMG_URL}/${
															item?.gambar
														}`}
														alt={item?.nama}
														className="w-12 md:w-16"
													/>
												</div>
												<div className="text-sm detail-menu">
													<h1 className="font-bold text-md">{item?.nama}</h1>
													<h1 className="mt-1 italic opacity-40">
														Jumlah: {item?.jumlah}
													</h1>
													<h1 className="italic opacity-40">
														{formatToRupiah(item?.harga)}
													</h1>
												</div>
											</div>
										))}
									</div>
									<div className="flex flex-col gap-4">
										<h1 className="text-end">
											Total Bayar:{" "}
											<b className="text-green-700">
												{formatToRupiah(hitungTotalHarga())}
											</b>
										</h1>
										<motion.button
											initial={{ scale: 1 }}
											whileHover={{ scale: 1.06 }}
											whileTap={{ scale: 0.8 }}
											className="p-2 text-white bg-green-900 md:p-3 rounded-xl"
											onClick={tambahPesanan}>
											Pesan
										</motion.button>
									</div>
								</motion.div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Menu;
