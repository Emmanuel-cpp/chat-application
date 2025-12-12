from google.genai import types
from google import genai
import os 
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
load_dotenv()

MODEL_NAME = "gemini-2.5-flash"
API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

context = []

def generateResponse(prompt:str):
        #prompt = input("Enter prompt: ")
        #retain chat context        
        context.append({
            "role": "user",
            "content":prompt
        })
        
        #acceptable format by gemini API
        context2 = [
            {
                "role": message["role"],
                "parts": [{"text": message["content"]}]
            }
            for message in context
        ]
        
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=context2,
            config=types.GenerateContentConfig(
                temperature=2,
                top_k=4,
                top_p=0.4,
                system_instruction="Response must be in text only and not markdown, do not include ** or # in the response"
            )           
        )
        context.append({
             "role":"model",
             "content":response.text 
        })
        return response.text 

class APIHandler(BaseHTTPRequestHandler):
    def setCORS(self):
        #set CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
    def do_OPTIONS(self):
        self.send_response(200)
        self.setCORS()
        self.end_headers()    
        
    def do_POST(self):
        contentSize = int(self.headers["Content-Length"])
        body = self.rfile.read(contentSize)
        data = json.loads(body)
        
        prompt = data.get("message", "")
        reply = generateResponse(prompt)
        
        response = {
            "reply":reply           
        }  
        
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.setCORS()
        self.end_headers()
        self.wfile.write(json.dumps(response).encode("utf-8"))

server = HTTPServer(("localhost", 5000), APIHandler)
print("serrver is running")
server.serve_forever()          