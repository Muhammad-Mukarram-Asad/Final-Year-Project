import React, { useState } from "react";
import styles from "../chatbot/chatbot.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import back_icon from "../../images/back_icon_white.svg";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const predefinedPatterns = [
    {
      pattern:
        /(?:my name is|I am|hello its me|Hello, its me|call me|it's me|It's me|It is me)\s*(\w+)/i,
      response: "Hi %1, How can I assist you?",
    },
    // Add more patterns and responses as needed
  ];

  const userMessages = [
    [
      "hi",
      "hy",
      "hello",
      "hey",
      "salam",
      "there",
      "hi there",
      "hello there", // 1
      "what is your name",
      "your name",
      "who is this",
      "there",
      "who are you",
    ],
    ["What is the latest cricket score"], // 3
    ["Tell me the current rankings of the cricket teams"], // 4
    ["Who are the top 5 or 6 players in the cricket world cup"], // 5
    ["When is the next cricket match scheduled"], // 6
    ["Give me highlights of the last cricket match"], // 7
    ["Who is the leading run-scorer in international cricket right 1now"], // 8
    ["Which team has won the most cricket World Cups"], // 9
    ["Tell me about the upcoming cricket tournaments"], // 10

    ["What are the rules of T20 cricket"], // 11
    ["Who is the captain of the Indian cricket team"], // 12
    ["Which player has the highest batting average in ODIs"], // 13
    ["Can you recommend a cricket training routine"], // 14
    ["How can I buy tickets for the next cricket match"], // 15
    ["Give me updates on the Indian Premier League (IPL)"], // 16
    ["Tell me about the latest cricket controversies"], // 17
    ["What are the basic rules of cricket"], // 18
    ["Who holds the record for the fastest century in T20 internationals"], // 19
    ["When is the next cricket World Cup scheduled"], // 20

    ["How many overs are there in a T20 cricket match"], // 21
    ["What is the Duckworth-Lewis method in cricket"], // 22
    ["Which cricket player has the most centuries in Tests"], // 23
    ["What are the different formats of cricket"], // 24
    ["Tell me about famous cricket stadiums around the world"], // 25
    ["Who is considered the best cricket all-rounder of all time"], // 26
    ["How can I join a local cricket club"], // 27
    ["Tell me about the history of the Ashes series"], // 28
    ["Which cricket team has the best win-loss ratio"], // 29
    ["Who won the last edition of the ICC Champions Trophy"], // 30

    ["What is the role of the third umpire in cricket"],
    ["How are cricket rankings calculated"],
    ["Tell me about the different cricket shot techniques"],
    ["Which country has the most cricket fans"],
    ["What is the significance of the toss in cricket"],
    ["Who won the last cricket match between India and Australia"],
    ["How can I improve my cricket bowling skills"],
    ["Tell me about famous cricket rivalries"],
    ["What is the Super Over in T20 cricket"],
    ["Who is the fastest bowler in the history of cricket"], //40
    ["What is the IPL auction and how does it work"], // 41

    // ["Which cricket player has the most sixes in T20 internationals"],
    // ["How are cricket balls made"],
    // ["What is the role of a cricket captain on the field"],
    // ["Tell me about cricket legends from the past"],
    // ["How can I get live cricket updates on my phone"],
    // ["What is the role of the match referee in cricket"],
    // ["Who is the most successful captain in international cricket"],
    // ["How can I start playing fantasy cricket on a sports app"],
    // ["What is the difference between a no-ball and a wide in cricket"], //50
    // ["Tell me about the fielding positions in cricket"],
    // ["Which cricket team has the best win percentage in T20s"],
    // ["Who holds the record for the highest individual score in Test cricket"], // 53
  ];

  const botReplies = [
    [
      "Hi this is Sportify Chatbot, your cricketing buddy! How can I assist you",
    ], // 1
    [
      "To get the latest cricket score, you can check the live score section on the app's homepage.",
    ], // 3
    ["You can find the current rankings of cricket teams in the Google."], // 4
    [
      "Babar Azam, Virat Kohli, Ben Stokes, Adam Zampa, Rashid khan, Jos Buttler, etc",
    ], // 5
    [
      "The next cricket match is scheduled for tomorrow. You can find more details in the 'Fixtures' section.",
    ], // 6
    [
      "Highlights of the last cricket match can be viewed in the 'Highlights' tab of the app.",
    ], // 7
    [
      "The leading run-scorer in international cricket currently is Babar Azam.",
    ], // 8
    ["The team with the most cricket World Cup wins is Australia."], // 9
    [
      "Upcoming cricket tournaments can be found in the 'Tournaments' section of the app.",
    ], // 10

    [
      "The rules of T20 cricket are available in the 'Rules' section. It's a fast-paced format with each team playing 20 overs.",
    ],
    ["The current captain of the Indian cricket team is [captain name]."],
    ["The player with the highest batting average in ODIs is [player name]."],
    [
      "For a cricket training routine, consider consulting the 'Training' section of the app or seeking a coach.",
    ],
    [
      "Tickets for the next cricket match can be purchased on the app in the 'Tickets' section.",
    ],
    [
      "For IPL updates, navigate to the 'IPL' section to get the latest news, scores, and team standings.",
    ],
    [
      "To stay informed about cricket controversies, check the 'News' section for the latest updates.",
    ],
    [
      "Basic rules of cricket include runs, wickets, and overs. Detailed rules can be found in the 'Rules' section.",
    ],
    [
      "The record for the fastest century in T20 internationals is held by [player name].",
    ],
    ["The next cricket World Cup is scheduled for October,2024."], // 20

    ["A T20 cricket match consists of 20 overs per side."],
    [
      "The Duckworth-Lewis method is used in rain-affected matches to adjust the target for the chasing team.",
    ],
    ["The player with the most centuries in Tests is [player name]."],
    [
      "Cricket has different formats: Test, One Day International (ODI), and Twenty20 (T20).",
    ],
    [
      "Famous cricket stadiums include Lord's (England), MCG (Australia), and Eden Gardens (India).",
    ],
    [
      "The top three best cricket all-rounders of all time are  Garfield Sobers, Jack Kallis, and Imran Khan.",
    ],
    [
      "To join a local cricket club, check community boards, sports centers, or use the app's 'Clubs' feature.",
    ],
    [
      "The Ashes series is a historic Test cricket rivalry between England and Australia.",
    ],
    ["The team with the best win-loss ratio is Australia."],
    ["The last ICC Champions Trophy was won by Australia."], // 30

    [
      "The third umpire in cricket reviews on-field decisions using technology and assists the on-field umpires.",
    ],
    [
      "Cricket rankings consider performance in matches, including wins, losses, and individual player statistics.",
    ],
    [
      "Different cricket shot techniques include drives, cuts, pulls, and sweeps. Learn more in the 'Techniques' section.",
    ],
    [
      "Cricket fans are widespread, but countries like India, Australia, and England have large fanbases.",
    ],
    [
      "The toss in cricket determines which team bats or bowls first. It can influence the game, especially in Tests.",
    ],
    [
      "The last cricket match between India and Australia was won by Australia.",
    ],
    [
      "To improve your bowling skills, consider practicing different deliveries and seeking guidance from a coach.",
    ],
    [
      "Famous cricket rivalries include India vs. Pakistan, Australia vs. England, and South Africa vs. New Zealand.",
    ],
    [
      "The Super Over in T20 cricket is a tie-breaker, allowing each team to bat and bowl one over to determine the winner.",
    ],
    [
      "The fastest bowler in the history of cricket is often considered to be Shoaib Akhtar.",
    ], // 40

    [
      "The IPL auction is where teams bid for players. It takes place before each season",
    ], // 41
  ];

  const alternative = [
    "Same here, dude.",
    "That's cool! Go on...",
    "Dude...",
    "Ask something else...",
    "Hey, I'm listening...",
  ];

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setInput(input.toLowerCase());

    // Check if the user input matches any predefined patterns
    const matchedPattern = predefinedPatterns.find((pattern) =>
      input.match(pattern.pattern)
    );

    if (matchedPattern) {
      // Extract the user name using capturing groups in the regular expression
      const extractedName = input.match(matchedPattern.pattern)[1];

      // Print the predefined pattern along with the userName
      const patternMessage = `Hi ${extractedName}, How can I assist you?`;
      console.log("patternMessage = ", patternMessage);

      // Set the response in the state or perform any other actions as needed
      setMessages([
        ...messages,
        { text: input, sender: "user" },
        { text: patternMessage, sender: "bot" },
      ]);
    } else {
      // Check if the user input matches any predefined questions
      let matchedQuestionIndex = -1;

      for (let i = 0; i < userMessages.length; i++) {
        const questions = userMessages[i];
        console.log(`Checking questions set ${i + 1}:`, questions);

        // Check if any question in the set matches the user input
        const foundIndex = questions.findIndex((question) =>
          input.toLowerCase().includes(question.toLowerCase())
        );
        console.log("foundIndex = ", foundIndex);

        if (foundIndex !== -1) {
          matchedQuestionIndex = i;
          break; // Stop searching once a match is found in the current set of questions
        }
      }

      // Update the state with the user's message and the chatbot's response
      if (matchedQuestionIndex !== -1) {
        console.log("matchedQuestionIndex = ", matchedQuestionIndex);
        const response = botReplies[matchedQuestionIndex];
        console.log("response from the bot = ", response);
        setMessages([
          ...messages,
          { text: input, sender: "user" },
          { text: response, sender: "bot" },
        ]);
      } else {
        // If the input doesn't match any predefined questions, provide a random alternative response
        const randomAlternative =
          alternative[Math.floor(Math.random() * alternative.length)];
        setMessages([
          ...messages,
          { text: input, sender: "user" },
          { text: randomAlternative, sender: "bot" },
        ]);
      }

      setInput("");
    }
  };

  return (
    // <div>
    //   <div
    //     style={{
    //       height: "300px",
    //       overflowY: "scroll",
    //       border: "1px solid #ccc",
    //       padding: "10px",
    //     }}
    //   >
    //     {messages.map((message, index) => (
    //       <div
    //         key={index}
    //         style={{
    //           marginBottom: "10px",
    //           color: message.sender === "bot" ? "green" : "blue",
    //         }}
    //       >
    //         {message.text}
    //       </div>
    //     ))}
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //     />
    //     <button onClick={handleSendMessage}>Send</button>
    //   </div>
    // </div>

    <div className={styles["card"]}>
      <div id={styles["header"]}>
        <img src={back_icon} alt="back" onClick={() => window.history.back()} />
        <h1>Sportify Chatbot!</h1>
        <p>{""}</p>
      </div>

      <div id={styles["message-section"]}>
        {messages.map((msg, index) => (
          <div key={index} className={styles[`message-${msg.sender}`]}>
            <span id={styles[`${msg.sender}-response`]}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div id={styles["input-section"]}>
        <input
          id={styles["input"]}
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FontAwesomeIcon
          style={{ color: "#ffffff", fontSize: "25px" }}
          icon={faPaperPlane}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chatbot;
