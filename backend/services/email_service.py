import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

def send_email(to_email: str, subject: str, body: str):
    """Send email using Gmail SMTP"""
    try:
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')

        if not smtp_user or not smtp_password:
            logger.error("SMTP credentials not configured")
            return False

        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_user
        msg['To'] = to_email
        msg['Subject'] = subject

        html_part = MIMEText(body, 'html')
        msg.attach(html_part)

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)

        logger.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

def send_booking_confirmation(booking_data: dict):
    """Send booking confirmation to customer"""
    subject = "Booking Confirmation - U Matter"
    
    body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #00CED1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .details {{ background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .detail-row {{ padding: 10px 0; border-bottom: 1px solid #eee; }}
            .detail-label {{ font-weight: bold; color: #00CED1; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmed!</h1>
            </div>
            <div class="content">
                <p>Dear {booking_data['name']},</p>
                <p>Thank you for booking with U Matter. Your request has been confirmed.</p>
                
                <div class="details">
                    <h3 style="color: #00CED1; margin-top: 0;">Booking Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Service:</span> {booking_data['service']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span> {booking_data['date']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Time:</span> {booking_data['time']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Contact:</span> {booking_data['phone']}
                    </div>
                </div>
                
                <p>We'll reach out to you shortly to confirm the final details.</p>
                <p>If you have any questions, please contact us at:</p>
                <p>📞 8259014044 or 8837249340<br>
                📧 umatter.shillong.21@gmail.com</p>
                
                <div class="footer">
                    <p>U Matter Multipurpose Cooperative Society<br>
                    Shillong, Meghalaya</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(booking_data['email'], subject, body)

def send_admin_notification(booking_data: dict):
    """Send booking notification to admin"""
    admin_email = os.environ.get('ADMIN_EMAIL', 'umatter.shillong.21@gmail.com')
    subject = f"New Booking - {booking_data['service']}"
    
    body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #FFB6C1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .details {{ background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .detail-row {{ padding: 10px 0; border-bottom: 1px solid #eee; }}
            .detail-label {{ font-weight: bold; color: #00CED1; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Booking Received</h1>
            </div>
            <div class="content">
                <p>A new booking has been made on the U Matter website.</p>
                
                <div class="details">
                    <h3 style="color: #00CED1; margin-top: 0;">Customer Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Name:</span> {booking_data['name']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span> {booking_data['email']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span> {booking_data['phone']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Service:</span> {booking_data['service']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span> {booking_data['date']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Time:</span> {booking_data['time']}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Booking ID:</span> {booking_data.get('id', 'N/A')}
                    </div>
                </div>
                
                <p>Please follow up with the customer to confirm the appointment.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(admin_email, subject, body)
