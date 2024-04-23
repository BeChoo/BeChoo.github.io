import Head from 'next/head';
import 'tailwindcss/tailwind.css'; {/* Integrates tailwindcss and postcss */}
function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<title>RapidAPI Devrel Example - Hotel App</title> {/* Creates formatted display for homepage */}
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} />;
		</>
	);
}
export default MyApp;