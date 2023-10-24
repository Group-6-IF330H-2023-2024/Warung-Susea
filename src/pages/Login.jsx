import axios from "axios";
import { useState, useEffect } from "react";
import Logo from "../assets/img/logo2.png";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

const Login = () => {
	const [captcha, setCaptcha] = useState("");
	const [generateCaptcha, setGenerateCaptcha] = useState(true);
	const [state, setState] = useState({
		data: {
			username: "",
			password: "",
			input_captcha: "",
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
			.post(
				`${import.meta.env.VITE_API_URL}login.php`,
				{ ...state.data, captcha: captcha },
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				if (res.data === "admin") {
					window.location.href = "/dashboard";
				} else if (res.data === "customer") {
					window.location.href = "/list";
				} else alert(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}check_login.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "sudah login") window.location.href = "/list";
			});
	}, []);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}buat_captcha.php`, {
				withCredentials: true,
			})
			.then((res) => {
				setCaptcha(res.data);
			});
	}, [generateCaptcha]);

	return (
		<>
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="w-full max-w-sm mx-auto">
					<img className="mx-auto w-44 h-max" src={Logo} alt="Waroeng Susea" />
					<h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-center text-green-900">
						Masuk ke akunmu !
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-green-900">
								Username / email
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
						<div>
							<div className="flex items-center gap-4 captcha">
								<div className="px-5 py-3 text-lg bg-white shadow-md captcha">
									{captcha}
								</div>
								<div>
									<div
										className="flex gap-2 buat-ulang-captcha hover:cursor-pointer"
										onClick={() => {
											setGenerateCaptcha(!generateCaptcha);
										}}>
										<Cog8ToothIcon className="w-6" />
										<div className="underline">Buat Ulang</div>
									</div>
								</div>
							</div>
							<div className="mt-2">
								<input
									onChange={handleChange}
									id="captcha"
									name="input_captcha"
									type="text"
									autoComplete="captcha"
									required
									className="px-2 block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
								Masuk
							</button>
						</div>
					</form>

					<p className="mt-10 text-sm text-center text-gray-500">
						Belum punya akun?{" "}
						<a
							href="/register"
							className="font-semibold leading-6 text-green-900 hover:text-green-700">
							Daftar
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
