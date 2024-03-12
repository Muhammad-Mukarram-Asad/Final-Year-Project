import React, { useEffect, useState } from "react";
import styles from "./searchProfile.module.css";
import Footer from "../navigationFooter";
// import ViewPost from "../viewPost";
import SearchUserViewPost from "../searchViewPost";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBaseballBatBall,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
// import signout from "../../images/signout_logo.png";
// import logout_icon from "../../images/logout_icon.png";
// import axios from "axios";

import { useNavigate } from "react-router-dom";
import { storage } from "../editUserPicture/config";
import { ref, getDownloadURL } from "firebase/storage";
import apiHit from "../../util/AxiosURL";

const SearchedUserProfile = () => {
  // const apiHit = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL
  // });

  const navigate = useNavigate();
  // const [user, setUser] = useState();
  const [postData, setPostData] = useState([]);
  const [loginUserData, setLoginUserData] = useState();
  const [userData, setUserData] = useState({});
  const [btnText, setBtnText] = useState("Follow");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loginUser() {
      try {
        const storedData = localStorage.getItem("loginUserData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          console.log("stored data of login user = ", parsedData._id);
        }
      } catch (err) {
        console.log(
          "Error in getting login user data from session storrage = ",
          err
        );
      }
    }
    loginUser();
  }, []);

  function getTokenId() {
    try {
      const storedData = localStorage.getItem("selectedUser");
      // console.log("stored data of searched user = ", storedData);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        console.log("stored data of searched user = ", parsedData._id);
      }
    } catch (err) {
      console.log("Error in getting selected searched user = ", err);
    }
  }

  useEffect(() => {
    getTokenId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("userData in searchedUserProfile = ", userData);
      try {
        // Check if userData exists before accessing _id property
        if (userData && userData._id) {
          await apiHit.get(`/getallpostbyid/${userData._id}`).then((res) => {
            console.log("res.data of searched user posts = ", res.data);
            setPostData(res.data);
          });
        }
      } catch (err) {
        console.log("GET Error in accessing searched user posts: \n", err);
      }
    }

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

    fetchData();
  }, [userData]);

  const followSearchUser = async () => {
    try {
      await apiHit.get(`/followunfollow/${userData?._id}`);
      // Toggle the button text after successful API call
      setBtnText((prevText) => (prevText === "Follow" ? "Unfollow" : "Follow"));
    } catch (err) {
      console.log("Error in follow api = ", err);
    }
  };

  // Function to aggregate data
  function aggregateData(data) {
    const result = {};

    data.forEach((item) => {
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

  // Aggregate the data
  const aggregatedDataList = aggregateData(postData.length > 0 ? postData : []);
  console.log("aggregatedDataList = ", aggregatedDataList);

  return (
    <main className={styles["profile_main_div"]}>
      <section className={styles["header_div"]}>
        <div className={styles["header_inner_div"]}>
          {/* <img src={logout_icon} alt="signout" onClick={handleLogout} /> */}
          <h1>Cell Number: 0{userData?.wathsapp}</h1>
          <p>{""}</p>
        </div>
        <div className={styles["image_div"]}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="user_profile_picture"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGaMR527JjInwGbpIkGKlHLNnlMma5nbz7dw&usqp=CAU"
              onClick={() => navigate("/editUserPicture")}
              alt="user_profile_picture"
            />
          )}
        </div>
        {/* <img
          src="https://reviewit.pk/wp-content/uploads/2020/10/fsdgsdg1-1-1024x724-1.jpg"
          alt="user_profile_picture"
        /> */}
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

          <div className={styles["follow_btn_div"]}>
            <button onClick={followSearchUser}>{btnText}</button>
          </div>
        </article>

        <section className={styles["followers_div"]}>
          <div className={styles["social_stats_div"]}>
            <h1>{postData?.length}</h1>
            <p>Posts</p>
          </div>
          <div className={styles["social_stats_div"]}>
            <h1>{Math.floor(Math.random() * 60) + 1}</h1>
            <p>Connections </p>
          </div>
          <div className={styles["social_stats_div"]}>
            <h1>{userData?.follower?.length}</h1>
            <p>Followers </p>
          </div>
        </section>

        <section className={styles["stats_main_div"]}>
          {userData?.player_type === "Batsman"
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
                    {/* <div className={styles["cricket_stats_div"]}>
                      <h1>{item.average.toFixed(2)}</h1>
                      <p>Average Runs </p>
                    </div> */}
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
                      <p>Match Format</p>
                    </div>
                    {/* <div className={styles["cricket_stats_div"]}>
                      <h1>{item.average.toFixed(2)}</h1>
                      <p>Average Wicket </p>
                    </div> */}
                  </section>
                );
              })}

          <section className={styles["images_main_div"]}>
            <SearchUserViewPost />
          </section>
        </section>
      </section>
      <Footer />
    </main>
  );
};

export default SearchedUserProfile;
