import React from 'react'
import styles from "./introScreen.module.css";
import { useNavigate } from 'react-router-dom';

const IntroScreen = () => {
    const navigate = useNavigate();
  return (
    <main className={styles["intro_main_div"]}>
        <div className={styles["intro_inner_div"]}>
        <h1>Sportify</h1>
        <p>Join the Sportify community and elevate your sporting journey</p>
        <button onClick={() => navigate("/signInScreen")}>Lets Begin</button>
        </div>

    </main>
  )
}

export default IntroScreen