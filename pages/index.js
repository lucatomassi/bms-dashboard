import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Content from "./components/Content";
import Header from "./components/Header";
import LeftNavbar from "./components/LeftNavbar";


export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>XGUARD BMS</title>
				<meta name="description" content="Capstone Project" />
				<link rel="icon" href="/shield-blanc.ico" />
			</Head>
			<div className={styles.container}>
				<LeftNavbar />
				<Header />
				<Content />
			</div>
		</div>
	);
}
