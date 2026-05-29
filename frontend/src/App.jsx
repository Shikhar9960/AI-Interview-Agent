// import { useState } from "react";
// import API from "./api/api";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { TailSpin } from "react-loader-spinner";
// import { motion, AnimatePresence } from "framer-motion";

// function App() {
//   const [role, setRole] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [feedback, setFeedback] = useState("");

//   const [loadingQuestion, setLoadingQuestion] = useState(false);
//   const [loadingFeedback, setLoadingFeedback] = useState(false);

//   const { transcript, listening, resetTranscript } = useSpeechRecognition();

//   const generateQuestion = async () => {
//     if (!role) return;
//     try {
//       setLoadingQuestion(true);
//       setQuestion("");
//       setFeedback("");
//       setAnswer("");
//       const res = await API.post("/generate-question", { role });
//       setQuestion(res.data.question);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingQuestion(false);
//     }
//   };

//   const evaluateAnswer = async () => {
//     if (!answer && !transcript) return;
//     try {
//       setLoadingFeedback(true);
//       const res = await API.post("/evaluate-answer", {
//         question,
//         answer: answer || transcript,
//       });
//       setFeedback(res.data.feedback);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingFeedback(false);
//     }
//   };

//   const startListening = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//     setAnswer(transcript);
//   };

//   const scoreMatch = feedback.match(/Score:\s*(\d+)/i);
//   const score = scoreMatch ? scoreMatch[1] : null;

//   return (
//     <>
//       {/* Injecting a small style block to handle hover states 
//         since we are purely relying on your index.css variables 
//       */}
//       <style>{`
//         .custom-input:focus {
//           border-color: var(--accent) !important;
//           box-shadow: 0 0 0 3px var(--accent-bg);
//         }
//         .primary-btn {
//           background: var(--accent);
//           color: #fff;
//           transition: opacity 0.2s, transform 0.1s;
//         }
//         .primary-btn:hover:not(:disabled) {
//           opacity: 0.9;
//           transform: translateY(-1px);
//         }
//         .primary-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }
//         .icon-btn {
//           background: var(--code-bg);
//           border: 1px solid var(--border);
//           color: var(--text-h);
//           transition: all 0.2s;
//         }
//         .icon-btn:hover {
//           background: var(--border);
//         }
//         .icon-btn.recording {
//           background: rgba(239, 68, 68, 0.1);
//           border-color: rgba(239, 68, 68, 0.5);
//           color: #ef4444;
//         }
//         .app-container {
//           padding: 40px 20px;
//           display: flex;
//           flex-direction: column;
//           gap: 32px;
//           width: 100%;
//           max-width: 800px;
//           margin: 0 auto;
//           text-align: left;
//         }
//       `}</style>

//       <div className="app-container">
//         {/* HEADER */}
//         <div style={{ textAlign: "center", marginBottom: "16px" }}>
//           <h1>AI Interview System</h1>
//           <p>Prepare for your next role with real-time AI feedback.</p>
//         </div>

//         {/* ROLE INPUT */}
//         <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//           <input
//             type="text"
//             className="custom-input"
//             placeholder="Enter Role (e.g., React Developer)"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             style={{
//               flex: "1 1 300px",
//               padding: "16px 20px",
//               fontSize: "16px",
//               borderRadius: "12px",
//               border: "1px solid var(--border)",
//               background: "var(--bg)",
//               color: "var(--text-h)",
//               fontFamily: "var(--sans)",
//               outline: "none",
//               boxSizing: "border-box"
//             }}
//           />
//           <button
//             onClick={generateQuestion}
//             disabled={loadingQuestion || !role}
//             className="primary-btn"
//             style={{
//               padding: "16px 32px",
//               borderRadius: "12px",
//               border: "none",
//               fontSize: "16px",
//               fontWeight: 600,
//               fontFamily: "var(--sans)",
//               cursor: "pointer",
//               boxShadow: "var(--shadow)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               minWidth: "200px"
//             }}
//           >
//             {loadingQuestion ? <TailSpin height="24" width="24" color="#fff" /> : "Generate Question"}
//           </button>
//         </div>

//         <AnimatePresence mode="wait">
//           {/* QUESTION CARD */}
//           {question && !loadingQuestion && (
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, height: 0 }}
//               style={{
//                 background: "var(--accent-bg)",
//                 border: "1px solid var(--accent-border)",
//                 borderRadius: "16px",
//                 padding: "24px",
//                 boxShadow: "var(--shadow)"
//               }}
//             >
//               <h2>The Challenge</h2>
//               <p style={{ lineHeight: "160%", color: "var(--text-h)", marginTop: "12px" }}>
//                 {question}
//               </p>
//             </motion.div>
//           )}

//           {/* ANSWER SECTION */}
//           {question && (
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//             >
//               <div style={{ position: "relative" }}>
//                 <textarea
//                   className="custom-input"
//                   rows="6"
//                   placeholder="Type your answer or use the microphone..."
//                   value={transcript || answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   style={{
//                     width: "100%",
//                     padding: "20px",
//                     paddingBottom: "60px",
//                     fontSize: "16px",
//                     borderRadius: "16px",
//                     border: "1px solid var(--border)",
//                     background: "var(--code-bg)",
//                     color: "var(--text-h)",
//                     fontFamily: "var(--sans)",
//                     outline: "none",
//                     resize: "vertical",
//                     boxSizing: "border-box",
//                     lineHeight: "150%"
//                   }}
//                 />
                
//                 {/* MIC CONTROLS */}
//                 <div style={{ position: "absolute", bottom: "16px", right: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
//                   {listening && (
//                     <span style={{ color: "#ef4444", fontSize: "14px", fontWeight: 500, marginRight: "8px" }}>
//                       ● Listening...
//                     </span>
//                   )}
//                   {!listening ? (
//                     <button
//                       onClick={startListening}
//                       className="icon-btn"
//                       style={{ padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 500 }}
//                     >
//                       🎤 Start
//                     </button>
//                   ) : (
//                     <button
//                       onClick={stopListening}
//                       className="icon-btn recording"
//                       style={{ padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 500 }}
//                     >
//                       ⏹ Stop
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <button
//                 onClick={evaluateAnswer}
//                 disabled={loadingFeedback || (!answer && !transcript)}
//                 className="primary-btn"
//                 style={{
//                   padding: "18px 24px",
//                   borderRadius: "12px",
//                   border: "none",
//                   fontSize: "18px",
//                   fontWeight: 600,
//                   fontFamily: "var(--sans)",
//                   cursor: "pointer",
//                   boxShadow: "var(--shadow)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "100%"
//                 }}
//               >
//                 {loadingFeedback ? <TailSpin height="28" width="28" color="#fff" /> : "Submit Answer"}
//               </button>
//             </motion.div>
//           )}

//           {/* FEEDBACK CARD */}
//           {feedback && !loadingFeedback && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               style={{
//                 background: "var(--bg)",
//                 border: "1px solid var(--border)",
//                 borderRadius: "16px",
//                 padding: "32px",
//                 boxShadow: "var(--shadow)",
//                 marginTop: "16px"
//               }}
//             >
//               <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                
//                 {/* SCORE BUBBLE */}
//                 {score && (
//                   <div style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "var(--accent-bg)",
//                     border: "1px solid var(--accent-border)",
//                     borderRadius: "50%",
//                     width: "100px",
//                     height: "100px",
//                     flexShrink: 0
//                   }}>
//                     <span style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 600, color: "var(--accent)" }}>Score</span>
//                     <h2 style={{ margin: 0, color: "var(--text-h)", fontSize: "32px" }}>{score}</h2>
//                   </div>
//                 )}

//                 {/* FEEDBACK TEXT */}
//                 <div style={{ flex: 1, minWidth: "250px" }}>
//                   <h2 style={{ color: "var(--accent)", marginBottom: "12px" }}>AI Analysis</h2>
//                   <p style={{ whiteSpace: "pre-wrap", lineHeight: "160%", color: "var(--text-h)" }}>
//                     {feedback.replace(/Score:\s*\d+\/10/i, "").trim()}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }

// export default App;



import { useState } from "react";
import API from "./api/api";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { TailSpin } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

function App() {

  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(1);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // ===============================
  // Generate Question
  // ===============================

  const generateQuestion = async () => {

    if (!role) return;

    try {

      setLoadingQuestion(true);

      setQuestion("");
      setFeedback("");
      setAnswer("");

      resetTranscript();

      const res = await API.post("/generate-question", {
        role,
      });

      setQuestion(res.data.question);

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingQuestion(false);
    }
  };

  // ===============================
  // Next Question
  // ===============================

  const nextQuestion = async () => {

    setQuestionNumber((prev) => prev + 1);

    setFeedback("");
    setAnswer("");
    resetTranscript();

    await generateQuestion();
  };

  // ===============================
  // Evaluate Answer
  // ===============================

  const evaluateAnswer = async () => {

    if (!answer && !transcript) return;

    try {

      setLoadingFeedback(true);

      const res = await API.post("/evaluate-answer", {
        question,
        answer: answer || transcript,
      });

      setFeedback(res.data.feedback);

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingFeedback(false);
    }
  };

  // ===============================
  // Voice Functions
  // ===============================

  const startListening = () => {

    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening = () => {

    SpeechRecognition.stopListening();

    setAnswer(transcript);
  };

  // ===============================
  // Extract Score
  // ===============================

  const scoreMatch = feedback.match(/Score:\s*(\d+)/i);

  const score = scoreMatch ? scoreMatch[1] : null;

  return (

    <>
      <style>{`

        .custom-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px var(--accent-bg);
        }

        .primary-btn {
          background: var(--accent);
          color: #fff;
          transition: 0.2s;
        }

        .primary-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .primary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .icon-btn {
          background: var(--code-bg);
          border: 1px solid var(--border);
          color: var(--text-h);
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: var(--border);
        }

        .icon-btn.recording {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ef4444;
        }

        .app-container {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
          max-width: 850px;
          margin: 0 auto;
        }

      `}</style>

      <div className="app-container">

        {/* HEADER */}

        <div style={{ textAlign: "center" }}>

          <h1>AI Interview System</h1>

          <p>
            Practice interviews with AI powered feedback.
          </p>

        </div>

        {/* ROLE INPUT */}

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

          <input
            type="text"
            className="custom-input"
            placeholder="Enter Role (React Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              flex: "1",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text-h)",
              outline: "none",
            }}
          />

          <button
            onClick={generateQuestion}
            disabled={loadingQuestion || !role}
            className="primary-btn"
            style={{
              padding: "16px 30px",
              borderRadius: "12px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >

            {
              loadingQuestion
                ? <TailSpin height="22" width="22" color="#fff" />
                : "Generate Question"
            }

          </button>

        </div>

        {/* QUESTION */}

        <AnimatePresence>

          {
            question && !loadingQuestion && (

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "var(--accent-bg)",
                  border: "1px solid var(--accent-border)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px"
                }}>

                  <h2>
                    Question {questionNumber}
                  </h2>

                  <span style={{
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "30px",
                    fontSize: "14px"
                  }}>
                    AI Interview
                  </span>

                </div>

                <p style={{
                  lineHeight: "170%",
                  fontSize: "18px"
                }}>
                  {question}
                </p>

              </motion.div>
            )
          }

        </AnimatePresence>

        {/* ANSWER */}

        {
          question && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}
            >

              <textarea
                className="custom-input"
                rows="6"
                placeholder="Write your answer..."
                value={transcript || answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: "var(--code-bg)",
                  color: "var(--text-h)",
                  outline: "none",
                  resize: "none",
                  lineHeight: "160%"
                }}
              />

              {/* MIC */}

              <div style={{
                display: "flex",
                gap: "12px",
                alignItems: "center"
              }}>

                {
                  !listening ? (

                    <button
                      onClick={startListening}
                      className="icon-btn"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      🎤 Start
                    </button>

                  ) : (

                    <button
                      onClick={stopListening}
                      className="icon-btn recording"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      ⏹ Stop
                    </button>
                  )
                }

                {
                  listening && (
                    <span style={{
                      color: "#ef4444",
                      fontWeight: "600"
                    }}>
                      Listening...
                    </span>
                  )
                }

              </div>

              {/* SUBMIT */}

              <button
                onClick={evaluateAnswer}
                disabled={loadingFeedback || (!answer && !transcript)}
                className="primary-btn"
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "17px",
                  cursor: "pointer"
                }}
              >

                {
                  loadingFeedback
                    ? <TailSpin height="26" width="26" color="#fff" />
                    : "Submit Answer"
                }

              </button>

            </motion.div>
          )
        }

        {/* FEEDBACK */}

        {
          feedback && !loadingFeedback && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                padding: "30px"
              }}
            >

              <div style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap"
              }}>

                {/* SCORE */}

                {
                  score && (

                    <div style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "50%",
                      background: "var(--accent-bg)",
                      border: "1px solid var(--accent-border)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>

                      <span style={{
                        fontSize: "13px",
                        color: "var(--accent)"
                      }}>
                        SCORE
                      </span>

                      <h2 style={{
                        margin: 0
                      }}>
                        {score}/10
                      </h2>

                    </div>
                  )
                }

                {/* FEEDBACK TEXT */}

                <div style={{ flex: 1 }}>

                  <h2 style={{
                    color: "var(--accent)",
                    marginBottom: "12px"
                  }}>
                    AI Feedback
                  </h2>

                  <p style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "170%"
                  }}>
                    {feedback.replace(/Score:\s*\d+\/10/i, "").trim()}
                  </p>

                </div>

              </div>

              {/* NEXT QUESTION */}

              <button
                onClick={nextQuestion}
                className="primary-btn"
                style={{
                  marginTop: "30px",
                  width: "100%",
                  padding: "18px",
                  borderRadius: "14px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "17px",
                  cursor: "pointer"
                }}
              >
                Next Question →
              </button>

            </motion.div>
          )
        }

      </div>
    </>
  );
}

export default App;