const ui = require('../../lib/ui');
const { icon, badge, btn, card, list, kv, callout, guard, rule, avatar, pageHead, sectionHead, sheet, field, docIco, choice } = ui;
const { B, task } = require('./_h');

const check = (title, sub, when) => ({ icon: 'circle-check', tone: 'ok', title, sub, endSub: when, chev: false });
const doc = (title, sub, o = {}) => ({ lead: docIco(o.kind || 'PDF'), title, sub, endBadge: o.badge || badge('Accepted', 'ok'), chev: false });

const referencing = {
  slug: 'referencing', nav: 'documents', title: 'Referencing', sub: 'Passed Fri 20 Nov · 1 thing to add',
  body: () => `
${pageHead({ title: 'Referencing and documents', sub: 'Five checks for each of you, done once and reused for every offer. Fatima sees the result, never the documents.' })}

${callout({ tone: 'danger', icon: 'image-off', title: 'Anika’s Emirates ID could not be read', body: 'The photo you sent on Monday was too blurry to read the ID number. Everyone who lives in the flat must be on the Ejari record, children included.', rules: [rule('DXB-OCC', 'Co-occupants')], actions: btn('Upload again', { size: 'sm', variant: 'primary', sheet: 'sheet-upload', icon: 'camera' }) })}

<div class="split">
<div class="stack">
  ${card({ title: 'Arjun Mehta · lead tenant', headEnd: badge('5 of 5 passed', 'ok'), flush: true, body: list([
    check('Identity', 'UAE Pass · Emirates ID 784-1987-•••••••-6', '15 Nov'),
    check('Residence visa', 'Employment visa · valid to 9 Aug 2028', '15 Nov'),
    check('Income', 'Salary certificate and 3 months of statements · Gulfstar Logistics', '19 Nov'),
    check('Credit', 'Al Etihad Credit Bureau · no defaults, no bounced cheques', '19 Nov'),
    check('Previous landlord', 'Dubai Hills Estate, 2 years · rent always on time', '20 Nov'),
  ]) })}
  ${card({ title: 'Neha Mehta · joint tenant', headEnd: badge('5 of 5 passed', 'ok'), flush: true, body: list([
    check('Identity', 'UAE Pass · Emirates ID 784-1989-•••••••-2', '15 Nov'),
    check('Residence visa', 'Sponsored by employer · valid to 2 Mar 2028', '15 Nov'),
    { icon: 'circle-check', tone: 'ok', title: 'Income', sub: 'Salary certificate · Smile Paediatric Dental Clinic', extra: `<div class="small muted mt-1 inline">${icon('rotate-ccw', 12)}<span>The first certificate was 41 days old. The new one was accepted on 19 Nov.</span></div>`, endSub: '19 Nov', chev: false },
    check('Credit', 'Al Etihad Credit Bureau · no defaults', '19 Nov'),
    check('Previous landlord', 'Same tenancy as Arjun', '20 Nov'),
  ]) })}
  ${card({ title: 'Living with you', headEnd: badge('1 to add', 'danger'), body:
    task('done', 'Arjun Mehta', 'Lead tenant · on the contract') +
    task('done', 'Neha Mehta', 'Joint tenant · on the contract') +
    task('now', 'Anika Mehta, 7', 'Co-occupant · needs Emirates ID, or passport and visa page', btn('Upload', { size: 'sm', sheet: 'sheet-upload' })) })}

  ${card({ title: 'Documents on file', flush: true, body: list([
    doc('Salary certificate · Arjun', 'Gulfstar Logistics · issued 12 Nov 2026'),
    doc('Bank statements · Arjun', 'Aug – Oct 2026 · 3 files'),
    doc('Salary certificate · Neha', 'Smile Paediatric Dental Clinic · issued 18 Nov 2026'),
    doc('Salary certificate · Neha', 'Issued 8 Oct 2026 · replaced', { badge: badge('Replaced') }),
    doc('Landlord reference', 'Dubai Hills Estate · signed 20 Nov 2026'),
    doc('Anika · Emirates ID (front)', 'Uploaded Mon 23 Nov · unreadable', { kind: 'JPG', badge: badge('Upload again', 'danger') }),
  ]) })}
</div>

<aside class="stack">
  ${guard({ title: 'What Fatima saw', sub: 'Before she accepted your offer', checks: [
    { state: 'ok', title: '“Verified” for both of you', sub: 'Identity, visa and credit passed.' },
    { state: 'ok', title: 'Affordability: comfortable', sub: 'A band, not your salary. Rent is under a third of household income.' },
    { state: 'info', title: 'Never your documents', sub: 'Only Layla, your licensed manager, can open them. Every view is logged.' },
  ] })}
  ${card({ title: 'Your data', body: `<div class="stack stack-sm small"><p>Documents are kept for the tenancy plus 5 years, as UAE anti-money-laundering rules require. You can download everything at any time.</p>${btn('Download my data', { size: 'sm', icon: 'download', toast: 'Your data export will be emailed within 24 hours (demo)' })}</div>` })}
  ${callout({ tone: 'neutral', icon: 'user-check', title: 'Checked by Layla Haddad', body: 'Automatic checks first, then a person. Signed off Fri 20 Nov, 16:40.' })}
</aside>
</div>`,
  sheets: () => sheet('sheet-upload', 'Anika’s Emirates ID',
    `${choice('doc', 'Emirates ID', 'Front and back, the whole card in the frame', true)}${choice('doc', 'Passport and residence visa', 'If her Emirates ID is still being issued', false)}
     <div class="field"><span class="label">Front</span><div class="photo-grid"><div class="ph"><img src="${B}assets/img/x6.svg" alt="Previous upload, blurred" style="filter:blur(3px)"></div><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button><button type="button" class="ph add" aria-label="Add from photo library" data-toast="Library opened (demo)">${icon('image-plus', 22)}</button></div><span class="hint err">${icon('circle-alert', 12)} Too blurry to read the ID number. Use good light and hold the phone still.</span></div>
     <div class="field"><span class="label">Back</span><div class="photo-grid"><button type="button" class="ph add" aria-label="Take a photo" data-toast="Camera opened (demo)">${icon('camera', 22)}</button></div></div>`,
    btn('Cancel', { attrs: { 'data-close': true } }) + btn('Send for checking', { variant: 'primary', toast: 'Sent. Layla usually checks within an hour (demo)' })),
};

module.exports = [referencing];
