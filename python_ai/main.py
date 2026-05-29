from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from agents.interviewer_agent import interviewer_agent
from agents.evaluator_agent import evaluator_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InterviewRequest(BaseModel):
    role: str


class EvaluationRequest(BaseModel):
    question: str
    answer: str


@app.post("/generate-question")
def generate_question(data: InterviewRequest):

    question = interviewer_agent(data.role)

    return {
        "question": question
    }


@app.post("/evaluate-answer")
def evaluate_answer(data: EvaluationRequest):

    feedback = evaluator_agent(
        data.question,
        data.answer
    )

    return {
        "feedback": feedback
    }