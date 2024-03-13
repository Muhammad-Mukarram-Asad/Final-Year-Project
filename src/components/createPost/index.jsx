import React, { useState } from "react";
import styles from "./post.module.css";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import back_icon from "../../images/back_icon.svg";
import apiHit from "../../util/AxiosURL";
import Swal from "sweetalert2";
import { SkipBack, ArrowLeft } from "react-feather";
const CreatePost = () => {
  // const apiHit = axios.create({
  //     baseURL: process.env.API_BASE_URL
  //   });

  const navigate = useNavigate();
  const [matchFormat, setMatchFormat] = useState("");
  const [runs, setRuns] = useState(0);
  const postData = {
    match_format: matchFormat,
    score_wicket: runs,
  };
  const handleSubmit = async () => {
    // console.log("Format = ", matchFormat, "runs or wickets = ", runs);
    console.log("post data =", postData);
    await apiHit
      .post("/createpost", postData)
      .then((res) => {
        console.log("Result = ", res.data);
        Swal.fire({
          icon: "success",
          title: "Post created successfully",
          text: "You have successfully created a post",
          confirmButtonText: "OK",
          position: "center",
          confirmButtonColor: "green",
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log("Error in creating post = ", err);
      });

    setTimeout(() => {
      navigate("/userProfile");
    }, 1000);
  };
  return (
    <main className={styles["createPost"]}>
      <div className={styles["createPost_header"]}>
        <div className={styles["back_icon"]}>
          <ArrowLeft color="black" size={30} onClick={() => navigate(-1)} />
        </div>
        {/* <img src={back_icon} alt="back" onClick={() => navigate(-1)} /> */}
        <h1>Select the match format</h1>
        <p>{""}</p>
      </div>
      <ul>
        <li>
          {" "}
          <input
            type="radio"
            name="format"
            value={"T20"}
            onChange={(e) => setMatchFormat(e.target.value)}
          />{" "}
          T20
        </li>
        <li>
          {" "}
          <input
            type="radio"
            name="format"
            value={"ODI"}
            onChange={(e) => setMatchFormat(e.target.value)}
          />{" "}
          ODI
        </li>
        <li>
          {" "}
          <input
            type="radio"
            name="format"
            value={"Test"}
            onChange={(e) => setMatchFormat(e.target.value)}
          />{" "}
          Test
        </li>
      </ul>

      <div className={styles["runs_div"]}>
        <h3>Enter RUNS/WICKETS</h3>
        <input
          type="number"
          placeholder="Enter Runs/Wickets"
          onChange={(e) => setRuns(e.target.value)}
        />
      </div>
      <div className={styles["btn_div"]}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  );
};

export default CreatePost;
