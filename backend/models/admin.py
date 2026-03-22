from pydantic import BaseModel

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Hardcoded admin credentials (in production, use hashed passwords and database)
ADMIN_USERNAME = "umatter"
ADMIN_PASSWORD = "umatter321"
