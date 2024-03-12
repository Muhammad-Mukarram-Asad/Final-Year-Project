import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import Footer from "../navigationFooter";
import ViewPost from "../viewPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBaseballBatBall,
  faUserPen,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import signout from "../../images/signout_logo.png";
// import logout_icon from "../../images/logout_icon.png";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { storage } from "../editUserPicture/config";
import { ref, getDownloadURL } from "firebase/storage";
import apiHit from "../../util/AxiosURL";
import Swal from "sweetalert2";
import { LogOut } from "react-feather";
// import axios from "axios";

const UserProfile = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function getLoginUserDetails() {
      try {
        await apiHit.get("/getloginuser").then((res) => {
          console.log("res.data in userProfile = ", res.data);
          setUserData(res.data);
          localStorage.setItem("loginUserData", JSON.stringify(res.data));
        });
      } catch (err) {
        console.log("GET Error in accessing userProfile Details: \n", err);
      }
    }
    getLoginUserDetails();
  }, []);

  useEffect(() => {
    async function getAllPost() {
      try {
        await apiHit.get("/getallpost").then((res) => {
          console.log("Result of all posts = ", res.data);

          setPostData(res.data);
        });
      } catch (err) {
        console.log("Error in getting all posts of the user = ", err);
      }
    }
    getAllPost();
  }, []);

  // Get Image from firebase
  useEffect(() => {
    if (userData && userData._id) {
      const getImageUrl = async () => {
        try {
          const imageRef = await ref(storage, `userimage/${userData._id}`);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("Error getting download URL: ", error);
        }
      };
      getImageUrl();
    }
  }, [userData]);

  // Function to aggregate data
  function aggregateData(data) {
    const result = {};

    data?.forEach((item) => {
      const {
        match_format,
        score_wicket,
        fiveWicket_hundredRun,
        threeWicket_fiftyRun,
      } = item;

      // If match_format already exists, update the aggregated values and count
      if (result[match_format]) {
        result[match_format].score_wicket += score_wicket;
        result[match_format].fiveWicket_hundredRun += fiveWicket_hundredRun;
        result[match_format].threeWicket_fiftyRun += threeWicket_fiftyRun;
        result[match_format].match += 1;
        result[match_format].average =
          result[match_format].score_wicket / result[match_format].match;
      } else {
        // If match_format doesn't exist, create a new entry
        result[match_format] = {
          match_format,
          score_wicket,
          fiveWicket_hundredRun,
          threeWicket_fiftyRun,
          match: 1,
          average: score_wicket, // Initial average is just the score_wicket since it's the first entry
        };
      }
    });

    // Convert result object to an array of objects
    const aggregatedArray = Object.values(result);
    return aggregatedArray;
  }

  //setAggregatedDataList(aggregateData(postData));
  let aggregatedDataList;
  
  aggregatedDataList = aggregateData(postData.length > 0 ? postData : [])
  console.log("aggregatedDataList = ", aggregatedDataList);
  

  const handleLogout = () => {
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "You are Logout successfully",
        confirmButtonText: "OK",
        position: "center",
        confirmButtonColor:"green",
        timer: 2000,
      })

      setTimeout(() => {
        localStorage.clear();
        // ["userToken", "loginUserData"].forEach(key => localStorage.removeItem(key));
        navigate("/");
        
      }, 4000)
  };
  return (
    <main className={styles["profile_main_div"]}>
      <section className={styles["header_div"]}>
        <div className={styles["header_inner_div"]}>
          {/* <img src={signout} alt="signout" onClick={handleLogout} /> */}
          <LogOut onClick={handleLogout} className={styles["logout_icon"]} color="white" size={30} />

          {/* <h1>{userData?.email}</h1> */}
          <h1>
            For Contact: 0<span>{userData?.wathsapp}</span>
          </h1>
          <p>{""}</p>
        </div>
        <div className={styles["image_div"]}>
          {imageUrl ? (
            <img
              src={imageUrl}
              onClick={() => navigate("/editUserPicture")}
              alt="user_profile"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGaMR527JjInwGbpIkGKlHLNnlMma5nbz7dw&usqp=CAU"
              onClick={() => navigate("/editUserPicture")}
              alt="user_profile"
            />
          )}
        </div>
      </section>
      <section className={styles["specifications_main_div"]}>
        <h1>{userData?.name}</h1>
        <article className={styles["specifications_inner_div"]}>
          <div className={styles["location_main_div"]}>
            <div className={styles["location_inner_div"]}>
              <FontAwesomeIcon
                id={styles["location_icon"]}
                icon={faLocationDot}
              />
              <p>
                {userData?.city}, {userData?.country}
              </p>
            </div>
            <div className={styles["location_inner_div"]}>
              <FontAwesomeIcon
                id={styles["location_icon"]}
                icon={faBaseballBatBall}
              />

              <p>{userData?.player_type}</p>
            </div>
          </div>

          <div className={styles["level_div"]}>
            <FontAwesomeIcon
              id={styles["location_icon"]}
              icon={faFireFlameCurved}
            />
            <p>Level 1</p>
          </div>

          <div className={styles["edit_btn_div"]}>
            <FontAwesomeIcon
              id={styles["location_icon"]}
              icon={faUserPen}
              onClick={() => navigate("/editUserProfile")}
            />
            <p>Edit</p>
          </div>
        </article>

        <section className={styles["followers_div"]}>
          <div className={styles["social_stats_div"]}>
            <h1>{postData?.length}</h1>
            <p>Posts</p>
          </div>
          <div className={styles["social_stats_div"]}>
            <h1>{Math.floor(Math.random() * 100) + 1}</h1>
            <p>Connections </p>
          </div>
          <div className={styles["social_stats_div"]}>
            <h1>{userData?.follower?.length}</h1>
            <p>Followers </p>
          </div>
        </section>
        {aggregatedDataList.length > 0 && userData?.player_type === "Batsman"
          ? aggregatedDataList.map((item, index) => {
              return (
                <section className={styles["match_div"]} key={index}>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>{item.match}</h1>
                    <p>Matches</p>
                  </div>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>{item.score_wicket}</h1>
                    <p>Total Runs</p>
                  </div>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>
                      {item.fiveWicket_hundredRun}/{item.threeWicket_fiftyRun}
                    </h1>
                    <p>100s/50s </p>
                  </div>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>{item.match_format}</h1>
                    <p>Match Format </p>
                  </div>
                </section>
              );
            })
          : aggregatedDataList.map((item, index) => {
              return (
                <section className={styles["match_div"]} key={index}>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>{item.match}</h1>
                    <p>Matches</p>
                  </div>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>{item.score_wicket}</h1>
                    <p>Total Wickets</p>
                  </div>
                  <div className={styles["cricket_stats_div"]}>
                    <h1>
                      {item.fiveWicket_hundredRun}/{item.threeWicket_fiftyRun}
                    </h1>
                    <p>5W/3W </p>
                  </div>

                  <div className={styles["cricket_stats_div"]}>
                  <h1>{item.match_format}</h1>
                      <p>Match Format </p>
                    {/* <h1>{item.average.toFixed(2)}</h1>
                    <p>Average Wicket </p> */}
                  </div>
                </section>
              );
            })}

        <section className={styles["images_main_div"]}>
          <ViewPost />
        </section>
      </section>

      <Footer />
    </main>
  );
};

export default UserProfile;
