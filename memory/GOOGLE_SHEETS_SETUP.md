# Google Sheets Integration Setup

The booking system logs all form submissions and needs to save them to Google Sheets.

## Current Status
- ✅ Backend API endpoints working
- ✅ Email notifications working (customer + admin)
- ✅ MongoDB database saving bookings
- ⏳ Google Sheets integration pending (requires Google Apps Script setup)

## To Complete Google Sheets Integration:

### Method 1: Using Google Apps Script (Recommended)

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/13sNjnplzBfbPfKRpSEAG4uZqgyHTV-gjH5PZd5hdC0E/edit

2. Go to **Extensions → Apps Script**

3. Replace the code with:

\`\`\`javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.Timestamp,
      data['Full Name'],
      data.Phone,
      data.Email,
      data['Interested Service'],
      data.Date,
      data.Time
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

4. Click **Deploy → New deployment**
5. Select type: **Web app**
6. Execute as: **Me**
7. Who has access: **Anyone**
8. Click **Deploy** and copy the Web App URL

9. Add the URL to `/app/backend/.env`:
\`\`\`
GOOGLE_SHEETS_WEBHOOK_URL=<your-web-app-url>
\`\`\`

10. Update `/app/backend/services/sheets_service.py` to uncomment the webhook code

11. Restart backend: `sudo supervisorctl restart backend`

### Method 2: Using Service Account (Alternative)

Requires creating a Google Cloud Project and service account with Sheets API access. More complex but more robust for production.

## Data Format
Columns in Google Sheet should be:
- Timestamp
- Full Name
- Phone
- Email
- Interested Service
- Date
- Time
