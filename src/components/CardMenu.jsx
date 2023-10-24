import { useState } from "react";
import MenuModal from "./MenuModal";
import { motion } from "framer-motion";

const CardMenu = ({
	menuData,
	tambahKeCart,
	hapusDariCart,
	isLogin,
	index,
}) => {
	const [jumlahOrder, setJumlahOrder] = useState(0);

	const handleTambahJumlah = () => {
		if (jumlahOrder >= 0) {
			setJumlahOrder(jumlahOrder + 1);
		}
	};

	const handleKurangJumlah = () => {
		if (jumlahOrder > 0) {
			setJumlahOrder(jumlahOrder - 1);
		}
	};

	const handleAddToCart = () => {
		const tambahItem = {
			id: menuData.id,
			nama: menuData.nama,
			harga: menuData.harga,
			gambar: menuData.gambar,
			jumlah: jumlahOrder,
		};
		tambahKeCart(tambahItem);
	};

	const handleRemoveFromCart = () => {
		const kurangItem = {
			id: menuData.id,
			nama: menuData.nama,
			harga: menuData.harga,
			gambar: menuData.gambar,
			jumlah: 1,
		};
		hapusDariCart(kurangItem);
	};

	return (
		<motion.div
			initial={{ translateY: 100, opacity: 0 }}
			animate={{ translateY: 0, opacity: 1 }}
			transition={{ delay: index * 0.1, duration: 1.6, type: "spring" }}
			className="relative flex flex-col w-full gap-6 p-8 rounded-lg shadow-xl card-menu-wrap bg-slate-50 md:w-max">
			<div className="flex justify-center kategori">
				<div className="px-4 py-1 border rounded-full w-max">
					{menuData?.kategori}
				</div>
			</div>
			<div
				className="flex justify-center card-menu-image hover:cursor-pointer"
				onClick={() =>
					document.getElementById(`menu-modal-${menuData?.nama}`).showModal()
				}>
				<img
					src={`${import.meta.env.VITE_IMG_URL}/${menuData?.gambar}`}
					alt="menu"
					className="rounded-md w-36 h-36"
				/>
			</div>
			<div className="text-center md:w-64 card-menu-content">
				<h1
					className="mb-2 text-xl font-medium card-menu-title hover:cursor-pointer"
					onClick={() =>
						document.getElementById(`menu-modal-${menuData?.nama}`).showModal()
					}>
					{menuData?.nama}
				</h1>
				<p className="text-sm opacity-30 card-menu-description line-clamp-1">
					{menuData?.deskripsi}
				</p>
				<div className="mt-4 button">
					{jumlahOrder === 0 ? (
						<motion.button
							initial={{ scale: 1 }}
							whileHover={{ scale: 1.06 }}
							whileTap={{ scale: 0.8 }}
							onClick={() => {
								if (isLogin) {
									handleAddToCart();
									handleTambahJumlah();
								} else {
									alert("Silahkan login terlebih dahulu");
									window.location.href = "/login";
								}
							}}
							className="w-full px-4 py-4 font-medium text-white bg-green-900 rounded-md text-md">
							Tambah ke Pesanan
						</motion.button>
					) : (
						<div className="flex items-center justify-center">
							<div className="flex items-center shadow-md">
								<motion.button
									initial={{ scale: 1 }}
									whileHover={{ scale: 1.06 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										handleRemoveFromCart();
										handleKurangJumlah();
									}}
									className="px-4 py-4 font-medium text-white bg-green-900 rounded-l-md text-md">
									-
								</motion.button>
								<h1 className="px-4 py-4 font-medium text-white bg-green-700 text-md">
									{jumlahOrder}
								</h1>
								<motion.button
									initial={{ scale: 1 }}
									whileHover={{ scale: 1.06 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										handleAddToCart();
										handleTambahJumlah();
									}}
									className="px-4 py-4 font-medium text-white bg-green-900 rounded-r-md text-md">
									+
								</motion.button>
							</div>
						</div>
					)}
					<MenuModal menuData={menuData} />
				</div>
			</div>
		</motion.div>
	);
};

export default CardMenu;
