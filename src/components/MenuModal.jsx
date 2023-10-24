const MenuModal = ({ menuData }) => {
	const formatToRupiah = (number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(number);
	};

	return (
		<dialog id={`menu-modal-${menuData?.nama}`} className="modal">
			<div className={`fixed inset-0 flex items-center justify-center z-50`}>
				<div className="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" />

				<div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
					<div className="px-6 py-4 text-left modal-content">
						<div className="flex items-center justify-between pb-3">
							<p className="text-2xl font-bold">{menuData?.nama}</p>
							<form method="dialog">
								<button className="border-opacity-0 border-none">Tutup</button>
							</form>
						</div>
						<p className="text-gray-700">{menuData?.deskripsi}</p>
						<div className="mt-4">
							<p className="text-xl font-bold text-green-700">
								{formatToRupiah(menuData?.harga)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
};

export default MenuModal;
