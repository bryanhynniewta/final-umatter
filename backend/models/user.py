from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    created_at: str

class UserToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

class ForgotPassword(BaseModel):
    email: EmailStr
