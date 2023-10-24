import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const EditMenu = () => {
	const { id } = useParams();
	const [menuData, setMenuData] = useState({});

	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [uploadedFileName, setUploadedFileName] = useState("");
	const [fileData, setFileData] = useState(null);
	const [state, setState] = useState({
		data: {
			nama_menu: "",
			deskripsi_menu: "",
			kategori: "",
			harga: "",
			id_menu: id,
		},
	});

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}edit_menu.php?id_menu=${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setMenuData(res.data[0]);
			});
	}, [id]);

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
				}
			});
	}, []);

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFileData(file);
			setUploadedFileName(file.name);
			setIsFileUploaded(true);
		} else {
			setIsFileUploaded(false);
			setUploadedFileName("");
		}
	};

	const handleChange = ({ currentTarget: input }) => {
		const data = { ...state.data };
		data[input.name] = input.value;
		setState({ data });
		if (data.nama_menu === "") data.nama_menu = menuData.nama;
		if (data.deskripsi_menu === "") data.deskripsi_menu = menuData.deskripsi;
		if (data.kategori === "") data.kategori = menuData.kategori;
		if (data.harga === "") data.harga = menuData.harga;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", fileData);
		formData.append("data", JSON.stringify(state.data));
		axios
			.post(`${import.meta.env.VITE_API_URL}edit_menu.php`, formData, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data === "berhasil") {
					window.location.href = "/dashboard";
					alert("Data Menu Berhasil Diubah");
				}
			});
	};

	return (
		<>
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="w-full max-w-sm mx-auto">
					<h2 className="text-2xl font-bold leading-9 tracking-tight text-center text-green-900">
						Edit Data Menu
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						encType="multipart/form-data"
						method="post"
						onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="nama-menu"
								className="block text-sm font-medium leading-6 text-green-900">
								Nama Menu
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									id="nama-menu"
									name="nama_menu"
									type="text"
									autoComplete="nama_menu"
									defaultValue={menuData.nama}
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="deskripsi-menu"
									className="block text-sm font-medium leading-6 text-green-900">
									Deskripsi Menu
								</label>
							</div>
							<div className="mt-2">
								<input
									onChange={handleChange}
									id="deskripsi-menu"
									name="deskripsi_menu"
									type="text"
									autoComplete="deskripsi-menu"
									defaultValue={menuData.deskripsi}
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="harga"
									className="block text-sm font-medium leading-6 text-green-900">
									Harga
								</label>
							</div>
							<div className="flex gap-2 mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
								<span className="flex items-center pl-3 text-gray-500 select-none sm:text-sm">
									Rp
								</span>
								<input
									onChange={handleChange}
									id="harga"
									name="harga"
									type="number"
									autoComplete="harga"
									defaultValue={menuData.harga}
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="kategori"
								className="block text-sm font-medium leading-6 text-green-900">
								Kategori
							</label>
							<div className="mt-2">
								<select
									onChange={handleChange}
									id="kategori"
									name="kategori"
									type="text"
									autoComplete="kategori"
									defaultValue={menuData.kategori}
									required
									className="px-2 block w-full rounded-md border-0 py-2.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6">
									<option>-- KATEGORI --</option>
									<option value="Sushi Roll">Sushi Roll</option>
									<option value="Hidangan Utama">Hidangan Utama</option>
									<option value="Sashimi">Sashimi</option>
									<option value="Minuman">Minuman</option>
									<option value="Hidangan Penutup">Hidangan Penutup</option>
								</select>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="file"
									className="block text-sm font-medium leading-6 text-green-900">
									Foto Menu
								</label>
							</div>
							<div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
								<div className="text-center">
									<div className="mt-4 text-sm leading-6 text-gray-600">
										<label
											htmlFor="file"
											className="font-semibold text-green-700 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500">
											<span>Upload a file</span>
											<input
												id="file"
												name="file"
												type="file"
												className="sr-only"
												onChange={handleFileUpload}
											/>
										</label>
										{isFileUploaded ? (
											<div className="mt-1 mb-1 text-lg font-bold">
												File uploaded: {uploadedFileName}
											</div>
										) : (
											<p className="pl-1">or drag and drop</p>
										)}
									</div>
									<p className="text-xs leading-5 text-gray-600">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-end mt-6 gap-x-6">
							<Link to={"/dashboard"}>
								<button
									type="button"
									className="text-sm font-semibold leading-6 text-gray-900">
									Batal
								</button>
							</Link>
							<button
								type="submit"
								className="px-3 py-2 text-sm font-semibold text-white bg-green-700 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Simpan
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EditMenu;