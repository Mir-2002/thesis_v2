from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from views.user import router as user_router
from views.file import router as file_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
@app.get("/")
async def read_root():
    return {"Hello": "World"}

app.include_router(user_router, prefix="/api", tags=["users"])
app.include_router(file_router, prefix="/api", tags=["files"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info", reload=True, debug=True)


