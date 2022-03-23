import React from "react";
import styles from "../../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCog,
	faSignOutAlt,
	faTachometerAlt,
	faArrowCircleDown
} from "@fortawesome/free-solid-svg-icons";

function LeftNavbar({open,setOpen,user}) {
	return (
		<div className={styles.navcontainer}>
			<div className={styles.logo}>
			<div class="navbar-logo">
                <img src="https://xdronesecurity.com/img/logos/shield-blanc.png" alt="Logo" height="80" width="80" />
            </div>
				<h2>BMS</h2>
				<h2>Dashboard</h2>
			</div>
			<div className={styles.wrapper}>
				<ul>
				<li>
						<FontAwesomeIcon
							icon={faArrowCircleDown}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">Battery 1</a>
						
					</li>
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
					{
						user ? (<a style={{ width: "18px", cursor: "pointer" }} onClick={()=>{
							localStorage.removeItem("username");
							alert("You've been logged out");
							location.reload()
						}} >  Logout </a>) : (<li onClick={()=>setOpen(true)} >
						<FontAwesomeIcon
							icon={faSignOutAlt}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">LogIn</a>
					</li>)
					}
					
				</ul>
			</div>
		</div>
	);
}

export default LeftNavbar;
