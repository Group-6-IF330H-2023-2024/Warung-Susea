import ContentLoader from "react-content-loader";

const SkeletonCardMenu = () => {
	return (
		<div className="relative flex flex-col w-full gap-6 p-8 rounded-lg shadow-xl card-menu-wrap bg-slate-50 md:w-max">
			<div className="flex justify-center kategori">
				<div className="px-4 py-1 border rounded-full w-max">
					<ContentLoader
						speed={2}
						width={100}
						height={20}
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb">
						<rect x="0" y="0" rx="10" ry="10" width="100" height="20" />
					</ContentLoader>
				</div>
			</div>
			<div className="flex justify-center card-menu-image">
				<ContentLoader
					speed={2}
					width={144}
					height={144}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="0" y="0" rx="10" ry="10" width="144" height="144" />
				</ContentLoader>
			</div>
			<div className="flex flex-col items-center text-center md:w-64 card-menu-content">
				<ContentLoader
					speed={2}
					width={200}
					height={20}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="0" y="0" rx="10" ry="10" width="200" height="20" />
				</ContentLoader>
				<ContentLoader
					speed={2}
					width={200}
					height={60}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="0" y="0" rx="10" ry="10" width="200" height="60" />
				</ContentLoader>
				<ContentLoader
					speed={2}
					width={100}
					height={20}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="0" y="0" rx="10" ry="10" width="100" height="20" />
				</ContentLoader>
				<div className="mt-4 button">
					<ContentLoader
						speed={2}
						width={200}
						height={40}
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb">
						<rect x="0" y="0" rx="10" ry="10" width="200" height="40" />
					</ContentLoader>
				</div>
			</div>
		</div>
	);
};

export default SkeletonCardMenu;
