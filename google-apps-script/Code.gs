/**
 * OPTI-SYNC IDEATHON Registration Form - Google Apps Script
 * Connects HTML form to Google Sheets
 */

// --- CONFIGURATION ---
// Set this to the EXACT name of your sheet tab (e.g., "Registrations")
const SHEET_NAME = "Registrations";

/**
 * Handles GET requests (optional, for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    "OPTI-SYNC IDEATHON Registration Web App is running. Use POST to submit data."
  ).setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handles POST requests from the registration form
 */
function doPost(e) {
  try {
    // Validate that we have postData
    if (!e.postData) {
      throw new Error("No post data received");
    }

    // Parse incoming JSON data
    const requestData = JSON.parse(e.postData.contents);

    // Get the spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      createNewSheet(ss);
    }

    // Prepare the row data
    const rowData = buildRowData(requestData);

    // Append the row to the sheet
    sheet.appendRow(rowData);

    // Return success response with CORS headers
    return buildResponse({
      success: true,
      message: "Registration submitted successfully!"
    });
  } catch (error) {
    // Return error response with CORS headers
    return buildResponse({
      success: false,
      message: error.message
    });
  }
}

/**
 * Creates a new sheet with proper headers
 */
function createNewSheet(ss) {
  const sheet = ss.insertSheet(SHEET_NAME);
  
  // Set headers (customize these if needed)
  const headers = [
    "Timestamp",
    "Team Size",
    "Team Phone",
    "Member 1 Name",
    "Member 1 USN",
    "Member 1 College",
    "Member 1 IEEE Member?",
    "Member 1 IEEE Number",
    "Member 2 Name",
    "Member 2 USN",
    "Member 2 College",
    "Member 2 IEEE Member?",
    "Member 2 IEEE Number",
    "Member 3 Name",
    "Member 3 USN",
    "Member 3 College",
    "Member 3 IEEE Member?",
    "Member 3 IEEE Number",
    "Member 4 Name",
    "Member 4 USN",
    "Member 4 College",
    "Member 4 IEEE Member?",
    "Member 4 IEEE Number"
  ];
  
  sheet.appendRow(headers);
  
  // Format header row for better readability
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0a0e1a");
  headerRange.setFontColor("#00f2fe");
}

/**
 * Builds a row of data from the request object
 */
function buildRowData(data) {
  const row = [
    new Date().toISOString(), // Timestamp
    data.teamSize,
    data.teamPhone
  ];

  // Add data for all 4 possible members
  for (let i = 1; i <= 4; i++) {
    const member = data.members[i - 1];
    if (member) {
      row.push(
        member.name,
        member.usn,
        member.college,
        member.isIeeeMember ? "Yes" : "No",
        member.ieeeNumber || ""
      );
    } else {
      row.push("", "", "", "", "");
    }
  }

  return row;
}

/**
 * Builds a proper response with CORS headers
 */
function buildResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*", // Allows requests from any origin (for development)
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
