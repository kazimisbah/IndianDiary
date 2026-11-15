/**
 * =============================================================================
 *  GOOGLE APPS SCRIPT — saves "Book a Demo / Request a Quote" form
 *  submissions from the website into a Google Sheet (one row per request).
 * =============================================================================
 *
 *  SETUP (about 5 minutes, no coding needed)
 *  -----------------------------------------
 *  1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *     Name it, e.g., "Website Leads". (You can later download it as Excel:
 *     File → Download → Microsoft Excel (.xlsx).)
 *
 *  2. In the spreadsheet menu click:  Extensions → Apps Script
 *
 *  3. Delete any code in the editor, then copy-paste THIS ENTIRE FILE in.
 *     Click the 💾 Save icon. Name the project "Website Lead Form".
 *
 *  4. (Optional) Set NOTIFY_EMAIL below to get an email for every new lead.
 *
 *  5. Click  Deploy → New deployment
 *       • Click the ⚙ gear next to "Select type" → choose "Web app"
 *       • Description:     Website form
 *       • Execute as:      Me
 *       • Who has access:  Anyone          ← important
 *     Click "Deploy".
 *
 *  6. Google will ask you to authorize:
 *       Authorize access → choose your Google account →
 *       "Google hasn't verified this app" → Advanced →
 *       "Go to Website Lead Form (unsafe)" → Allow.
 *     (This is normal: it's your own script, accessing your own sheet.)
 *
 *  7. Copy the "Web app URL". It looks like:
 *       https://script.google.com/macros/s/AKfycb..../exec
 *
 *  8. Open  src/config.js  in the website project and paste it into:
 *       export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec'
 *     Then rebuild the site (npm run build) and upload it again.
 *
 *  9. Test it: submit the form on your website. A new row should appear in the
 *     "Leads" tab within a few seconds, with a timestamp in the first column.
 *     (You can also open the Web app URL in a browser; it should say "OK".)
 *
 *  IF YOU CHANGE THIS SCRIPT LATER:
 *     Deploy → Manage deployments → ✏ Edit → Version: "New version" → Deploy.
 *     (Keeps the same URL. A brand-new deployment would give a NEW URL.)
 *
 *  TROUBLESHOOTING
 *     • No rows appearing? Check "Who has access" is set to "Anyone".
 *     • Check Apps Script → Executions (left sidebar) for error messages.
 * =============================================================================
 */

// ---- Settings ---------------------------------------------------------------
var SHEET_NAME = 'Leads'; // the tab that rows are written to (created automatically)
var NOTIFY_EMAIL = 'hello@indiadiarie.com'; // gets an email for every new lead. Set to '' to turn off.
var TIMEZONE = 'Asia/Kolkata';

// Column order in the sheet. New fields sent by the website are added
// automatically at the end, so you don't need to edit this when the form changes.
var DEFAULT_HEADERS = [
  'Timestamp',
  'Full Name',
  'Company',
  'Email',
  'Phone',
  'Country',
  'City',
  'Buyer Type',
  'Diary Category',
  'Estimated Quantity',
  'Required By',
  'Customization Notes',
  'Preferred Contact',
  'Preferred Demo Date & Time',
  'Visitor Timezone',
  'Page URL',
  'Status',
];

// ---- Receives the form submission ------------------------------------------
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // avoid two submissions writing to the same row

  try {
    var data = (e && e.parameter) || {};
    var sheet = getSheet_();
    var headers = ensureHeaders_(sheet, Object.keys(data));

    var row = headers.map(function (h) {
      if (h === 'Timestamp') return Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
      if (h === 'Status') return 'New';
      var value = data[h] != null ? String(data[h]) : '';
      // Prevent spreadsheet formula injection (values starting with = + - @)
      return /^[=+\-@]/.test(value) ? "'" + value : value;
    });

    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      var body = headers
        .map(function (h, i) { return h + ': ' + row[i]; })
        .join('\n');
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New website enquiry: ' + (data['Full Name'] || '') + ' (' + (data['Country'] || '') + ')',
        body: body,
        replyTo: data['Email'] || undefined,
      });
    }

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the Web app URL in a browser shows "OK", which confirms the deployment works.
function doGet() {
  return ContentService.createTextOutput('OK: the lead form endpoint is live.');
}

// ---- Helpers ----------------------------------------------------------------
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(DEFAULT_HEADERS);
    sheet.getRange(1, 1, 1, DEFAULT_HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#1b2a41')
      .setFontColor('#f8f3e8');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Adds any new field names as extra columns, then returns the full header list.
function ensureHeaders_(sheet, keys) {
  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  keys.forEach(function (k) {
    if (headers.indexOf(k) === -1) {
      headers.push(k);
      sheet.getRange(1, headers.length).setValue(k).setFontWeight('bold');
    }
  });
  return headers;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
