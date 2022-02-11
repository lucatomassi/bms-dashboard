import React from "react";
import styles from "../../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from './Dropdown.js'
import {
	faCog,
	faSignOutAlt,
	faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

function LeftNavbar() {
	return (
		<div className={styles.navcontainer}>
			<div className={styles.logo}>
			<div class="navbar-logo">
                <img src="https://xdronesecurity.com/img/logos/shield-blanc.png" alt="Logo" height="80" width="80" />
            </div>
				<h2>BMS</h2>
				<p>Dashboard</p>

				
			</div>
			<div className={styles.wrapper}>
				<ul>
					<li>
						<FontAwesomeIcon
							icon={faTachometerAlt}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">Dashboard</a>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faCog}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#"> Settings</a>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faSignOutAlt}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default LeftNavbar;
