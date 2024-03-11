import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./userSearch.module.css";
import Footer from "../navigationFooter";
import apiHit from "../../util/AxiosURL";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../editUserPicture/config";
import { useNavigate } from "react-router-dom";

const PlayerSearch = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [imageUrl, setImageUrl] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllUsers() {
      try {
        await apiHit.get("/getalluser").then((res) => {
          setAllPlayers(res.data);
          console.log("All Users = ", res.data);
        });
      } catch (err) {
        console.log("Error in getting all Users = ", err);
      }
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (allPlayers && allPlayers.length > 0) {
        const urls = await Promise.all(
          allPlayers.map(async (player) => {
            try {
              const imageRef = await ref(storage, `userimage/${player._id}`);
              const url = await getDownloadURL(imageRef);
              return { playerId: player._id, url };
            } catch (error) {
              if (error.code === "storage/object-not-found") {
                return {
                  playerId: player._id,
                  url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                };
              } else {
                console.error("Error getting download URL: ", error);
              }
            }
          })
        );

        // Filter out null values (users without images)
        const filteredUrls = urls.filter((url) => url !== null);
        setImageUrl(filteredUrls);
      }
    };

    fetchImages();
  }, [allPlayers]);

  console.log("image url = ", imageUrl);
  const handleChange = (e) => {
    let input = e.target.value;
    setSearchQuery(input);
    const filterData = allPlayers.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    console.log(filterData);
    setFilterList(filterData);
  };

  const handleUserClick = (userId, event) => {
    event.stopPropagation();
    console.log("User Clicked with the userId = ", userId);
    apiHit
      .get(`/getuser/${userId}`)
      .then((res) => {
        console.log("data of the selected user = ", res.data);
        setUserData(res.data);
        // Save data to localStorage inside the 'then' block
        localStorage.setItem("selectedUser", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Error in getting the selected user = ", err);
      });

    setTimeout(() => {
      navigate("/searchedUserProfile");
    }, 1500);
  };
  return (
    <main className={styles["search_players_main_div"]}>
      <section className={styles["search_bar_main_div"]}>
        <input
          type="text"
          placeholder="Search player name"
          value={searchQuery}
          onChange={(e) => handleChange(e)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} id={styles["search_icon"]} />
      </section>

      <section className={styles["players_list_div"]}>
        {filterList.length > 0
          ? filterList.map((item, index) => {
              const image = imageUrl.find((img) => img.playerId === item._id);

              return (
                <div
                  key={index}
                  className={styles["list_inner_div"]}
                  onClick={(event) => handleUserClick(item._id, event)}
                >
                  {image && <img src={image.url} alt="user_image" />}
                  <p>{item.name}</p>
                </div>
              );
            })
          : allPlayers?.length > 0 &&
            allPlayers.map((player, index) => {
              // Assuming imageUrl is an array containing the image URLs
              const image = imageUrl.find((img) => img.playerId === player._id);
              return (
                <div
                  key={index}
                  className={styles["list_inner_div"]}
                  onClick={(event) => handleUserClick(player._id, event)}
                >
                  {/* <p>{index + 1 + ") "}</p> */}
                  {image && <img src={image.url} alt="user_image" />}
                  <h1>{player.name}</h1>
                </div>
              );
            })}
      </section>

      <section className={styles["images_main_div"]}>
        <h1>Explore</h1>

        {/* 1st Time */}
        <div className={styles["images_inner_div"]}>
          <img
            src="https://i.pinimg.com/originals/a1/b1/36/a1b136b66d76abe105311a0ccc1370b9.jpg"
            alt="sports"
          />
          <img
            src="https://crictoday.com/wp-content/uploads/2023/01/skynews-pakistan-cricket_5176500-1.webp"
            alt="sports"
          />
        </div>

        {/* 2nd time */}
        <div className={styles["images_inner_div"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffHLCu41XHNQ3v1zI6a2lv5RsrY_SPhsueg&usqp=CAU"
            alt="sports"
          />
          <img
            src="https://republicpolicy.com/wp-content/uploads/2023/05/first.jpg"
            alt="sports"
          />
        </div>

        {/* 3rd time */}
        <div className={styles["images_inner_div"]}>
          <img
            src="https://i.pinimg.com/236x/48/b1/70/48b1700df2ce05938c62a461c5854925.jpg"
            alt="sports"
          />
          <img
            src="https://i.pinimg.com/236x/de/86/e7/de86e73c6cd9fffbc79be6cfe198eca5.jpg"
            alt="sports"
          />
        </div>

        {/* 4th time */}
        <div className={styles["images_inner_div"]}>
          <img
            src="https://i.pinimg.com/236x/60/db/28/60db280bf31c67aaece3dd2b48f02d86.jpg"
            alt="sports"
          />
          <img
            src="https://i.pinimg.com/236x/f1/6f/e6/f16fe6f173340f7d17b7c73e492b8762.jpg"
            alt="sports"
          />
        </div>

        {/* 5th time */}
        <div className={styles["images_inner_div"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrd4YgqTPk7oz-YvQPZaSEUACjec8NIAi2kQ&usqp=CAU"
            alt="sports"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdTo6AZs7vhizsXSGWdCZ3lA3E3GXX8R12xw&usqp=CAU"
            alt="sports"
          />
        </div>

        {/* 6th time */}
        <div className={styles["images_inner_div"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI20VJcInfyoQ5KfgSbSmxWflJdO2F89M5xw&usqp=CAU"
            alt="sports"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIKjgotvsqwWCnKRuu2kK9Inm8qjlRORY9sg&usqp=CAU"
            alt="sports"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PlayerSearch;
