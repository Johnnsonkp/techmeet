from openai import OpenAI
from flask import jsonify
import os
import json
import re


class ProfileFacade:
    @staticmethod
    def create_career_data(job_title):
        prompt = f"""
            You are a career profiling assistant.

            Given a job title, generate a user profile including:
            1. A short but informative job description tailored to the role.
            2. A list of 5–10 relevant and in-demand technical or soft skills typically expected for this role.
            3. A list of 3–5 key personality traits or work styles that make someone successful in this role.
            4. A set of 3–6 tags useful for discovering events or opportunities related to the job title.

            Format the response as a JSON object with the following keys:
            - job_title (string)
            - description (string)
            - skills (array of strings)
            - tags (array of strings)
            - personality (array of strings)

            Now generate the profile for the job title: "{job_title}"
            """
        
        client = OpenAI(
            # This is the default and can be omitted
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

        response = client.responses.create(
            model="gpt-4o",
            instructions="You are a helpful AI assistant.",
            input=prompt
        )

        try:

            raw_text = response.output[0].content[0].text
            match = re.search(r"```json\n(.*?)\n```", raw_text, re.DOTALL)

            if match:
                json_str = match.group(1)

                print(json_str)
                parsed_data = json.loads(json_str)

                print(parsed_data)

                return parsed_data
                # print(f" {json.loads(response.choices[0].message['content'])}")
                # return json.loads(response.choices[0].message['content'])
        except Exception as e:
            raise ValueError(f"Failed to parse profile JSON: {str(e)}")