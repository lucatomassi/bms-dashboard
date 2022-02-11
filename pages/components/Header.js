import React from "react";
import styles from "../../styles/Home.module.css";

function Header() {
	return (
		<div className={styles.headcontainer}>
			<div className={styles.headwrapper}>
				<div className={styles.title}>
					<h2>
						Hello, <span>Luca</span>
					</h2>
				</div>
				<div className={styles.profile}>
				</div>
			</div>
		</div>
	);
}

export default Header;
