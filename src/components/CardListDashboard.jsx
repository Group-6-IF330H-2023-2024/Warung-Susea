import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link } from "react-router-dom";

const CardListDashboard = ({ item }) => {
	const handleSubmitDelete = async () => {
		if (confirm("Apakah Kamu Yakin Menghapus Menu?"))
			await axios
				.post(`${import.meta.env.VITE_API_URL}hapus_menu.php`, {
					id: item?.id,
				})
				.then((res) => {
					if (res.data === "berhasil") {
						alert("Menu berhasil dihapus");
						window.location.href = "/dashboard";
					}
				})
				.catch(function (error) {
					console.log(error);
				});
	};

	const formatToRupiah = (number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(number);
	};

	return (
		<tr className="h-full text-center bg-white border-b">
			<td className="flex items-center gap-4 px-6 py-4 font-medium text-gray-900">
				<div className="flex items-center w-24 h-24 image">
					<img
						src={`${import.meta.env.VITE_IMG_URL}/${item?.gambar}`}
						alt={item?.nama}
					/>
				</div>
				<div className="text-left detail-menu">
					<h1 className="mb-2 text-xl font-bold">{item?.nama}</h1>
					<p className="break-words line-clamp-1 opacity-40">
						{item?.deskripsi}
					</p>
				</div>
			</td>
			<td className="px-6 py-4">
				<h1 className="p-2 border rounded-full">{item?.kategori}</h1>
			</td>
			<td className="px-6 py-4">{formatToRupiah(item?.harga)}</td>
			<td className="px-6 py-4">
				<Link to={`/edit_menu/${item?.id}`}>
					<button className="p-2">
						<PencilSquareIcon className="w-6" />
					</button>
				</Link>
			</td>
			<td className="px-6 py-4">
				<button className="p-2" onClick={handleSubmitDelete}>
					<TrashIcon className="w-6" />
				</button>
			</td>
		</tr>
	);
};

export default CardListDashboard;
