from fastapi import APIRouter, HTTPException, status
from models.user import UserRegister, UserLogin, User, UserToken, ForgotPassword
from datetime import datetime
import uuid
import logging
import hashlib

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/users", tags=["users"])

# Import database
from server import db

def hash_password(password: str) -> str:
    """Simple password hashing"""
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register", response_model=User)
async def register_user(user_data: UserRegister):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create user
        user = {
            "id": str(uuid.uuid4()),
            "name": user_data.name,
            "email": user_data.email,
            "phone": user_data.phone,
            "password": hash_password(user_data.password),
            "created_at": datetime.utcnow().isoformat()
        }
        
        await db.users.insert_one(user)
        
        # Return user without password
        user_response = User(**{k: v for k, v in user.items() if k != 'password'})
        logger.info(f"User registered: {user_data.email}")
        
        return user_response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error registering user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register user"
        )

@router.post("/login", response_model=UserToken)
async def login_user(login_data: UserLogin):
    """User login"""
    try:
        # Find user
        user = await db.users.find_one({"email": login_data.email})
        
        if not user or user.get('password') != hash_password(login_data.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Create token (simplified - in production use JWT)
        token = f"user_{user['id']}"
        
        user_response = User(**{k: v for k, v in user.items() if k != 'password'})
        
        return UserToken(
            access_token=token,
            user=user_response
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error logging in user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to login"
        )

@router.post("/forgot-password")
async def forgot_password(data: ForgotPassword):
    """Send password reset email"""
    try:
        user = await db.users.find_one({"email": data.email})
        
        if not user:
            # Don't reveal if email exists
            return {"message": "If the email exists, a reset link will be sent"}
        
        # TODO: Send password reset email
        logger.info(f"Password reset requested for: {data.email}")
        
        return {"message": "If the email exists, a reset link will be sent"}
        
    except Exception as e:
        logger.error(f"Error in forgot password: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process request"
        )
