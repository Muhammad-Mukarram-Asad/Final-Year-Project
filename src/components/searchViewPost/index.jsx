import React, { useState, useEffect } from "react";
import styles from "./searchView.module.css";
import post_image from "../../images/post_image.svg";
import empty_post from "../../images/empty_post.svg";
import apiHit from "../../util/AxiosURL";
// import axios from "axios";
const SearchUserViewPost = () => {

  // const apiHit = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL
  // });

  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function getTokenId() {
      try {
        const storedData = await localStorage.getItem("selectedUser");
        // console.log("stored data of searched user = ", storedData);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          console.log("stored data of searched user = ", parsedData._id);
        }
      } catch (err) {
        console.log("Error in getting id of searched user = ", err);
      }
    }
    getTokenId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("userData in searchedUserProfile = ", userData);
      try {
        // Check if userData exists before accessing _id property
        if (userData && userData._id) {
          await apiHit.get(`/getallpostbyid/${userData._id}`).then((res) => {
            console.log("res.data in searched viewPost = ", res.data);
            setPostData(res.data);
          });
        }
      } catch (err) {
        console.log("GET Error in accessing search view post: \n", err);
      }
    }
    fetchData();
  }, [userData]);

  return (
    <main className={styles["viewPost"]}>
      {postData?.length > 0 ? (
        postData?.map((post, index) => (
          <section className={styles["post_main_div"]} key={index}>
            <section className={styles["headings_main_div"]}>
              <article className={styles["date_time_main_div"]}>
                <div className={styles["date_time_inner_div"]}>
                  <h1>
                    Date:{" "}
                    {new Date(post?.createdAt).toLocaleDateString("en-US")}{" "}
                  </h1>
                  <h1>
                    Time:{new Date(post?.createdAt).toLocaleTimeString("en-US")}{" "}
                  </h1>
                </div>
              </article>
              <div className={styles["match_format_div"]}>
                <h1>Match Format: {post?.match_format}</h1>
                <h1>
                {userData?.player_type === "Batsman" ? "RUNS: " : "WICKETS: "}
                {post?.score_wicket}
                </h1>
              </div>
            </section>

            <div className={styles["image_main_div"]}>
              <img src={post_image} alt="post_image" />
            </div>
          </section>
        ))
      ) : (
        <div className={styles["no_posts_main_div"]}>
          <img src={empty_post} alt="empty_post_placeholder" />
          <h1>
            {`This player (${userData?.name}) has no post to display...`}{" "}
          </h1>
        </div>
      )}
    </main>
  );
};

export default SearchUserViewPost;
