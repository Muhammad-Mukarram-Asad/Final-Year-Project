import React from 'react'
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faUser,faComments, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["footer_navBar"]}>
      <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff"}} onClick={() => navigate("/createPost")}/>
      {/* <FontAwesomeIcon icon={faPenSquare} style={{color: "#ffffff",}} /> */}
      {/* <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} onClick={() => navigate("/userProfile")} /> */}
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff"}} onClick={() => navigate("/userSearch")} />
      <div id={styles['addition_symbol']}>
      <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} onClick={() =>navigate("/stepperContainer") } />
      </div>
      <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} onClick={() => navigate("/userProfile")}/>
      <FontAwesomeIcon icon={faComments} style={{color: "#ffffff",}} onClick={() => navigate("/messageScreen")} />
       
    </div>
  )
}

export default Footer