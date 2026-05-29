from config import llm

def interviewer_agent(role):

    prompt = f"""
You are an AI interviewer.

Ask ONLY ONE-TWO short professional interview question for the role: {role}.

Rules:
- Keep question under 30 words
- Ask practical technical question
- No explanation
- No greeting
"""

    response = llm.invoke(prompt)

    return response.content.strip()