import { useState } from "react";
import API from "./api/api";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

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

  const score = scoreMatch
    ? scoreMatch[1]
    : null;

  return (

    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

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

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 768px) {

          .app-container {
            padding: 24px 16px;
            gap: 24px;
          }

          h1 {
            font-size: 30px !important;
          }

          h2 {
            font-size: 22px !important;
          }

          p {
            font-size: 15px !important;
          }

          textarea,
          input {
            font-size: 15px !important;
          }

          .role-container {
            flex-direction: column;
          }

          .role-container button {
            width: 100%;
          }

          .feedback-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .question-header {
            flex-direction: column;
            align-items: flex-start !important;
          }

          .mic-controls {
            flex-direction: column;
            align-items: stretch !important;
          }

          .mic-controls button {
            width: 100%;
          }

          .submit-btn,
          .next-btn {
            width: 100%;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 480px) {

          .app-container {
            padding: 18px 12px;
            gap: 20px;
          }

          h1 {
            font-size: 24px !important;
          }

          h2 {
            font-size: 18px !important;
          }

          p {
            font-size: 14px !important;
            line-height: 160% !important;
          }

          textarea {
            padding: 16px !important;
          }

          .score-circle {
            width: 90px !important;
            height: 90px !important;
          }
        }

      `}</style>

      <div className="app-container">

        {/* HEADER */}

        <div style={{ textAlign: "center" }}>

          <h1>
            AI Interview System
          </h1>

          <p>
            Practice interviews with AI powered feedback.
          </p>

        </div>

        {/* ROLE INPUT */}

        <div
          className="role-container"
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >

          

          <input
            type="text"
            className="custom-input"
            placeholder="Enter Role (React Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              flex: "1",
              width: "100%",
              minWidth: "0",
              padding: window.innerWidth < 480 ? "12px" : "16px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text-h)",
              outline: "none",
              fontSize: window.innerWidth < 480 ? "14px" : "16px",
              height: window.innerWidth < 480 ? "48px" : "56px",
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
              minWidth: "200px",
            }}
          >

            {
              loadingQuestion
                ? (
                  <TailSpin
                    height="22"
                    width="22"
                    color="#fff"
                  />
                )
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

                <div
                  className="question-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >

                  <h2>
                    Question {questionNumber}
                  </h2>

                  <span
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "30px",
                      fontSize: "14px",
                    }}
                  >
                    AI Interview
                  </span>

                </div>

                <p
                  style={{
                    lineHeight: "170%",
                    fontSize: "18px",
                    wordBreak: "break-word",
                  }}
                >
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
                gap: "18px",
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
                  lineHeight: "160%",
                }}
              />

              {/* MIC */}

              <div
                className="mic-controls"
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >

                {
                  !listening ? (

                    <button
                      onClick={startListening}
                      className="icon-btn"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: "1px solid var(--border)",
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
                        cursor: "pointer",
                      }}
                    >
                      ⏹ Stop
                    </button>
                  )
                }

                {
                  listening && (

                    <span
                      style={{
                        color: "#ef4444",
                        fontWeight: "600",
                      }}
                    >
                      Listening...
                    </span>
                  )
                }

              </div>

              {/* SUBMIT */}

              <button
                onClick={evaluateAnswer}
                disabled={
                  loadingFeedback ||
                  (!answer && !transcript)
                }
                className="primary-btn submit-btn"
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >

                {
                  loadingFeedback
                    ? (
                      <TailSpin
                        height="26"
                        width="26"
                        color="#fff"
                      />
                    )
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
                padding: "30px",
              }}
            >

              <div
                className="feedback-container"
                style={{
                  display: "flex",
                  gap: "24px",
                  flexWrap: "wrap",
                }}
              >

                {/* SCORE */}

                {
                  score && (

                    <div
                      className="score-circle"
                      style={{
                        width: "110px",
                        height: "110px",
                        borderRadius: "50%",
                        background: "var(--accent-bg)",
                        border: "1px solid var(--accent-border)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >

                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--accent)",
                        }}
                      >
                        SCORE
                      </span>

                      <h2 style={{ margin: 0 }}>
                        {score}/10
                      </h2>

                    </div>
                  )
                }

                {/* FEEDBACK TEXT */}

                <div
                  style={{
                    flex: 1,
                    minWidth: "0",
                  }}
                >

                  <h2
                    style={{
                      color: "var(--accent)",
                      marginBottom: "12px",
                    }}
                  >
                    AI Feedback
                  </h2>

                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      lineHeight: "170%",
                      wordBreak: "break-word",
                    }}
                  >
                    {
                      feedback
                        .replace(/Score:\s*\d+\/10/i, "")
                        .trim()
                    }
                  </p>

                </div>

              </div>

              {/* NEXT QUESTION */}

              <button
                onClick={nextQuestion}
                className="primary-btn next-btn"
                style={{
                  marginTop: "30px",
                  width: "100%",
                  padding: "18px",
                  borderRadius: "14px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "17px",
                  cursor: "pointer",
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
