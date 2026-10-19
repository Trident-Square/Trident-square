/**
 * Trident Square — website leads → Google Sheet + email (free).
 *
 * Every form submission on the website is added as a row in this sheet and
 * emailed to NOTIFY_EMAIL. Setup (5 minutes):
 *
 *  1. Create a Google Sheet (e.g. "Website leads"), then Extensions → Apps Script.
 *  2. Replace everything in Code.gs with this file. Set NOTIFY_EMAIL and SECRET below.
 *  3. Deploy → New deployment → type "Web app"
 *       Execute as: Me          Who has access: Anyone
 *     Authorise when asked, then copy the Web app URL.
 *  4. In the website's environment (Vercel → Settings → Environment Variables, or .env.local):
 *       LEAD_WEBHOOK_URL=<the Web app URL>
 *       LEAD_WEBHOOK_SECRET=<the same SECRET as below>
 *     and redeploy.
 *
 * After any change to this script: Deploy → Manage deployments → edit → New version.
 * Download as Excel any time: File → Download → Microsoft Excel (.xlsx).
 */

const NOTIFY_EMAIL = 'you@example.com' // where new-lead emails go (comma-separate for several)
const SECRET = 'change-me-to-a-long-random-string' // must equal LEAD_WEBHOOK_SECRET on the website
const SHEET_NAME = 'Leads'

const COLUMNS = [
  ['receivedAt', 'Received at'],
  ['kind', 'Type'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['company', 'Company'],
  ['service', 'Service'],
  ['budget', 'Budget'],
  ['partner_type', 'Partnership type'],
  ['location', 'Location'],
  ['message', 'Message'],
  ['page', 'Page'],
]

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents)
    if (SECRET && d.token !== SECRET) return json({ ok: false, error: 'bad token' })

    const sheet = getSheet()
    const row = COLUMNS.map(([key]) => {
      if (key === 'receivedAt') return d.receivedAt ? new Date(d.receivedAt) : new Date()
      return safe(d[key])
    })
    sheet.appendRow(row)

    if (NOTIFY_EMAIL) {
      const type = d.kind === 'partner' ? 'Partner application' : 'Project enquiry'
      const body = COLUMNS.filter(([k]) => k !== 'receivedAt' && d[k])
        .map(([k, label]) => label + ': ' + d[k])
        .join('\n')
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: d.email || NOTIFY_EMAIL,
        subject: type + ' — ' + (d.name || 'website') + (d.company ? ' (' + d.company + ')' : ''),
        body: body + '\n\nSheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      })
    }
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, label]) => label))
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold')
  }
  return sheet
}

// Text that starts with = + - @ would be run as a formula (and "+91…" phone numbers break); store it as plain text.
function safe(v) {
  if (v === undefined || v === null) return ''
  const s = String(v).slice(0, 4000)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
