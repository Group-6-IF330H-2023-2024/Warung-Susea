import BgJumbotron from "../assets/img/bg_jumbotron.jpg";
const Jumbotron = () => {
	return (
		<div
			className="relative w-full"
			style={{
				backgroundImage: `url(${BgJumbotron})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<div className="absolute inset-0 bg-black opacity-70"></div>
			<div className="relative z-50 mx-6 md:mx-auto md:container">
				<div className="py-32 md:py-48">
					<div className="items-center grid-cols-3 gap-5 md:grid">
						<div className="flex flex-col justify-center col-span-2 text-4xl text-center text-white md:text-start md:text-6xl">
							<div className="font-bold heading">
								<h1>Sushi Segar Setiap Hari</h1>
							</div>
							<div className="mt-5 text-sm md:text-base desc-heading">
								<p>
									Kami menggunakan bahan-bahan segar dan berkualitas tinggi
									untuk memastikan setiap gigitan Anda adalah pengalaman yang
									memuaskan.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Jumbotron;
