import React from "react";
import CircularProgressBar from "../ui/circularprogressbar/CircularProgressBar";

import styles from "./PresentionCard.module.css";

const PresentionCard = (props) => {
	const { present, sick, excused, absent, holiday } = props;
	const percentage = Math.floor(
		(present / (present + sick + excused + absent + holiday)) * 100
	);

	return (
		<div className={styles.card}>
			<div className={styles.title}>
				<h3>Absensi</h3>
			</div>
			<CircularProgressBar percentage={percentage} />
			<ul className={styles.absention}>
				<li>{present} hari hadir</li>
				<li>{sick} hari sakit</li>
				<li>{excused} hari izin</li>
				<li>{absent} hari alfa</li>
				<li>{holiday} hari cuti</li>
			</ul>
		</div>
	);
};

export default PresentionCard;