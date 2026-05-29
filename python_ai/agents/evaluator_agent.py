from config import llm

def evaluator_agent(question, answer):

   
    
    prompt = f"""
        Evaluate this interview answer.

        Question:
        {question}

        Answer:
        {answer}

        Give response in this format:

        Strength:
        (1 short line)

        Improvement:
        (1 short line)

        Final Verdict:
        (1 short line)

        Score: X/10

        Keep everything short and professional.
        """

    response = llm.invoke(prompt)

    return response.content.strip()