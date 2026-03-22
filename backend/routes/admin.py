from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from models.admin import AdminLogin, AdminToken, ADMIN_USERNAME, ADMIN_PASSWORD
import secrets
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/admin", tags=["admin"])
security = HTTPBasic()

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    """Verify admin credentials"""
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@router.post("/login", response_model=AdminToken)
async def admin_login(login_data: AdminLogin):
    """Admin login endpoint"""
    if login_data.username == ADMIN_USERNAME and login_data.password == ADMIN_PASSWORD:
        # In a real app, generate a JWT token
        # For simplicity, returning a simple token
        token = f"{login_data.username}:{login_data.password}"
        return AdminToken(access_token=token)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

@router.get("/verify")
async def verify_admin_access(username: str = Depends(verify_admin)):
    """Verify admin access"""
    return {"authenticated": True, "username": username}
