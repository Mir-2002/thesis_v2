# How to Start

## Requirements

- git
- npm
- python and pip
- MongoDB, MongoDB Compass

To start:

1. Create a folder
2. Open the folder in VSCode
3. Open a new terminal (Ctrl + Shift + `)
4. Enter this command: git clone https://github.com/Mir-2002/thesis_v2.git . (include the dot, this will clone the repo in the folder itself instead of creating a new one)

## For Frontend

1. Open a terminal
2. Go to client directory by opening a terminal and type in:

cd client

3. Install the dependencies by typing in:

npm i

4. To run, type in:

npm run dev

5. To view, open a browser and type in "localhost:5173"

## For Backend

1. Open a terminal
2. Go to server directory by opening a terminal and type in:

cd server

3. Create a Python virtual environment by typing in:

python -m venv venv

4. Activate the virtual environment by typing in:

venv\Scripts\activate

5. Install the requirements by typing in:

pip install -r requirements.txt

6. Run the server by typing in:

uvicorn main:app --reload

7. Server endpoint is accessible via http://127.0.0.1:8000
