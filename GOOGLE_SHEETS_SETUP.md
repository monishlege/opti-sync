# OPTI-SYNC IDEATHON: Google Sheets Registration Setup Guide

Follow these steps to connect your registration form to a Google Sheet!

---

## Step 1: Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "OPTI-SYNC IDEATHON Registrations".
3. The first sheet will automatically be created (you can rename it to "Registrations" if you want, but the script will create it if needed).

---

## Step 2: Open Google Apps Script Editor
1. In your Google Sheet, click on **Extensions > Apps Script**.
2. This will open the Google Apps Script editor in a new tab.
3. Delete any existing code in the `Code.gs` file.

---

## Step 3: Paste the Apps Script Code
1. Open the file `google-apps-script/Code.gs` from your project directory.
2. Copy the entire contents of that file.
3. Paste it into the Google Apps Script editor's `Code.gs` file.
4. Optional: If you renamed your sheet tab, update the `SHEET_NAME` constant at the top of the script.

---

## Step 4: Deploy the Script as a Web App
1. In the Google Apps Script editor, click on the **Deploy** button (top right).
2. Select **New deployment** from the dropdown.
3. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
4. Fill in the deployment details:
   - **Description**: "OPTI-SYNC IDEATHON Registration Form" (or something similar)
   - **Execute as**: Select **Me (your email address)**
   - **Who has access**: Select **Anyone** (IMPORTANT: This allows your website to send requests!)
5. Click the **Deploy** button.
6. You may be prompted to authorize access:
   - Click **Authorize access**.
   - Select your Google account.
   - You'll see a "Google hasn't verified this app" warning – click **Advanced**, then **Go to [Project Name] (unsafe)**.
   - Click **Allow** to grant the necessary permissions.
7. After deployment, you'll see a **Web app URL**. Copy this URL – we'll need it in the next step!

---

## Step 5: Update Your Registration Form
1. Open the `register.html` file from your project directory.
2. Find the line that says:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the Web app URL you copied in Step 4.
4. Save the `register.html` file.

---

## Step 6: Test the Integration
1. Open your website (http://localhost:8000/register.html).
2. Fill out the registration form and click **Submit Registration**.
3. Check your Google Sheet – you should see a new row with the registration data!

---

## Important Notes
- The script automatically creates the header row if the sheet is empty.
- Data is also saved to `localStorage` in the browser as a backup.
- Organizers can use the "Download All Registrations (CSV)" button in the form to download all locally stored data.

---

## Troubleshooting
- **CORS Errors**: Make sure you set "Who has access" to "Anyone" in Step 4.
- **Permissions Errors**: Re-run the authorization steps in Step 4.
- **Data Not Showing Up**: Check the Google Apps Script editor's **Executions** tab for error messages.
