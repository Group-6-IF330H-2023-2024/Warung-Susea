import axios from "axios";
import { useState } from "react";
import Logo from "../assets/img/logo2.png";

const Register = () => {
	const [state, setState] = useState({
		data: {
			nama_depan: "",
			nama_belakang: "",
			username: "",
			email: "",
			password: "",
			gender: "",
			tanggal_lahir: "",
		},
	});

	const handleChange = ({ currentTarget: input }) => {
		const data = { ...state.data };
		data[input.name] = input.value;
		setState({ data });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post(`${import.meta.env.VITE_API_URL}register.php`, state.data, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "berhasil") window.location.href = "/login";
			})
			.catch(function (error) {
				console.log(error);
			});

		await axios
			.get(`${import.meta.env.VITE_API_URL}register.php`, state.data, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "berhasil") window.location.href = "/login";
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<>
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="w-full max-w-sm mx-auto">
					<img className="mx-auto w-44 h-max" src={Logo} alt="Waroeng Susea" />
					<h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-center text-green-900">
						DAFTAR AKUN
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="flex justify-between gap-3 nama">
							<div className="w-full">
								<label
									htmlFor="nama-depan"
									className="block text-sm font-medium leading-6 text-green-900">
									Nama Depan
								</label>
								<div className="mt-2">
									<input
										onChange={handleChange}
										id="nama-depan"
										name="nama_depan"
										type="text"
										autoComplete="nama-depan"
										required
										className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="w-full">
								<label
									htmlFor="nama-belakang"
									className="block text-sm font-medium leading-6 text-green-900">
									Nama Belakang
								</label>
								<div className="mt-2">
									<input
										onChange={handleChange}
										id="nama-belakang"
										name="nama_belakang"
										type="text"
										autoComplete="nama-belakang"
										required
										className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-green-900">
								Username
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-green-900">
								Email
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-green-900">
									Kata Sandi
								</label>
							</div>
							<div className="mt-2">
								<input
									onChange={handleChange}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="flex justify-between gap-3 nama">
							<div className="w-full">
								<label
									htmlFor="tanggal_lahir"
									className="block text-sm font-medium leading-6 text-green-900">
									Tanggal Lahir
								</label>
								<div className="mt-2">
									<input
										onChange={handleChange}
										id="tanggal_lahir"
										name="tanggal_lahir"
										type="date"
										autoComplete="tanggal_lahir"
										required
										className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="w-full">
								<label
									htmlFor="gender"
									className="block text-sm font-medium leading-6 text-green-900">
									Jenis Kelamin
								</label>
								<div className="mt-2">
									<select
										onChange={handleChange}
										id="gender"
										name="gender"
										type="text"
										autoComplete="gender"
										required
										className="px-2 block w-full rounded-md border-0 py-2.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6">
										<option>-- PILIH --</option>
										<option value="L">Laki-laki</option>
										<option value="P">Perempuan</option>
									</select>
								</div>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
								Daftar
							</button>
						</div>
					</form>

					<p className="mt-10 text-sm text-center text-gray-500">
						Sudah punya akun?{" "}
						<a
							href="/login"
							className="font-semibold leading-6 text-green-900 hover:text-green-700">
							Masuk
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Register;
