import { useState } from "react";
import MenuModal from "./MenuModal";

const CardMenu = ({ menuData, tambahKeCart, hapusDariCart, isLogin }) => {
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
		<div className="relative flex flex-col w-full gap-6 p-8 rounded-lg shadow-xl card-menu-wrap bg-slate-50 md:w-max">
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
						<button
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
						</button>
					) : (
						<div className="flex items-center justify-center">
							<div className="flex items-center shadow-md">
								<button
									onClick={() => {
										handleRemoveFromCart();
										handleKurangJumlah();
									}}
									className="px-4 py-4 font-medium text-white bg-green-900 rounded-l-md text-md">
									-
								</button>
								<h1 className="px-4 py-4 font-medium text-white bg-green-700 text-md">
									{jumlahOrder}
								</h1>
								<button
									onClick={() => {
										handleAddToCart();
										handleTambahJumlah();
									}}
									className="px-4 py-4 font-medium text-white bg-green-900 rounded-r-md text-md">
									+
								</button>
							</div>
						</div>
					)}
					<MenuModal menuData={menuData} />
				</div>
			</div>
		</div>
	);
};

export default CardMenu;
