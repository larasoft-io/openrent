// Shared mock data so every dashboard tells the same story. "Today" in the demo is Tue 24 Nov 2026.
const TODAY = 'Tue 24 Nov 2026';

const company = {
  name: 'openrent.me', legal: 'OpenRent ME Real Estate Brokerage L.L.C (demo entity)',
  orn: 'ORN 31877', licence: 'DET Licence 1184220', vatTrn: 'TRN 1004 8821 9300 003',
  address: 'Level 14, One Central, Dubai World Trade Centre', phone: '800 RENT ME (800 736 863)', email: 'salam@openrent.me',
};

const people = {
  tenant: { name: 'Maya Fernandes', first: 'Maya', role: 'Tenant', sub: 'Marina Gate 1 · Apt 2304', email: 'maya.fernandes@example.com', phone: '+971 50 555 0142', job: 'Senior Brand Manager, Meridian Hospitality Group', eid: '784-1991-•••••••-4' },
  landlord: { name: 'Fatima Al Hashimi', first: 'Fatima', role: 'Landlord', sub: '7 properties', email: 'fatima@alhashimi.example', phone: '+971 50 555 0107' },
  contractor: { name: 'Imran Sheikh', first: 'Imran', role: 'Contractor', sub: 'Falcon Technical Services', email: 'imran@falcontech.example', phone: '+971 55 555 0188', company: 'Falcon Technical Services L.L.C', trades: ['AC & ventilation', 'Plumbing', 'Electrical', 'Handyman'] },
  manager: { name: 'Layla Haddad', first: 'Layla', role: 'OpenRent Manager', sub: 'RERA BRN 61204', email: 'layla@openrent.me' },
  admin: { name: 'Sami Khoury', first: 'Sami', role: 'Super Admin', sub: 'Platform owner', email: 'sami@openrent.me' },
  rep: { name: 'Daniel Okafor', first: 'Daniel', role: "Owner's Representative", sub: 'PoA for 3 owners', email: 'daniel@okaforpm.example' },
  field: { name: 'Jun Reyes', first: 'Jun', role: 'Field Agent', sub: 'Viewings & inspections', email: 'jun@openrent.me' },
  compliance: { name: 'Hana Suzuki', first: 'Hana', role: 'Compliance Officer', sub: 'MLRO · Finance', email: 'hana@openrent.me' },
};

// Property lifecycle stages used everywhere (index = position in the journey)
const STAGES = ['Draft', 'Verification', 'Live', 'Viewings', 'Offers', 'Contract', 'Ejari', 'Move-in', 'Occupied', 'Renewal', 'Move-out', 'Settled'];

const properties = [
  { id: 'p1', img: 'p1.svg', name: 'Marina Gate 1 · Apt 2304', short: 'Marina Gate 2304', area: 'Dubai Marina', type: 'Apartment', beds: 1, baths: 2, sqft: 812, furnished: false, rent: 105000, deposit: 5250,
    stage: 9, status: 'Renewal window', tone: 'warn', tenant: 'Maya Fernandes', start: '1 Mar 2026', end: '28 Feb 2027', pay: '12 direct debits · Flexi Rent', ejari: '0120260301004417', permit: '71452208931', dewa: '2030148866', makani: '13245 77281',
    note: 'Offer sent 18 Nov · awaiting tenant' },
  { id: 'p2', img: 'p2.svg', name: 'Bloom Towers B · Studio 915', short: 'Bloom Towers 915', area: 'Jumeirah Village Circle', type: 'Studio', beds: 0, baths: 1, sqft: 410, furnished: true, rent: 54000, deposit: 5400,
    stage: 3, status: 'Live · viewings', tone: 'info', permit: '71460017342', note: '23 enquiries · 6 viewings · 2 offers' },
  { id: 'p3', img: 'p3.svg', name: 'Palma Villa 27', short: 'Palma Villa 27', area: 'Arabian Ranches 2', type: 'Villa', beds: 4, baths: 5, sqft: 3480, furnished: false, rent: 310000, deposit: 15500,
    stage: 8, status: 'Occupied · notice running', tone: 'violet', tenant: 'James & Claire Whitfield', start: '15 Sep 2026', end: '14 Sep 2027', pay: '2 cheques', ejari: '0120260915002291',
    note: '12-month notice (owner use) served 2 Sep 2026' },
  { id: 'p4', img: 'p4.svg', name: 'Executive Towers K · Apt 1807', short: 'Executive Towers 1807', area: 'Business Bay', type: 'Apartment', beds: 2, baths: 3, sqft: 1240, furnished: false, rent: 135000, deposit: 6750,
    stage: 5, status: 'Contract & Ejari', tone: 'accent', tenant: 'Arjun & Neha Mehta', start: '5 Dec 2026', end: '4 Dec 2027', pay: '4 cheques', permit: '71458830117',
    note: 'Awaiting your signature · move-in 5 Dec' },
  { id: 'p5', img: 'p5.svg', name: 'Al Ghozlan 3 · Apt 412', short: 'Al Ghozlan 412', area: 'The Greens', type: 'Apartment', beds: 1, baths: 1, sqft: 760, furnished: false, rent: 88000, deposit: 4400,
    stage: 10, status: 'Move-out', tone: 'gold', tenant: 'Olena Kovalenko', start: '1 Dec 2025', end: '30 Nov 2026', pay: '4 cheques', ejari: '0120251201007764',
    note: 'Check-out inspection Mon 30 Nov, 10:00' },
  { id: 'p6', img: 'p6.svg', name: 'Burj Vista 1 · Apt 3102', short: 'Burj Vista 3102', area: 'Downtown Dubai', type: 'Apartment', beds: 2, baths: 2, sqft: 1180, furnished: true, rent: 195000, deposit: 19500,
    stage: 1, status: 'Verification', tone: 'neutral', note: 'Title deed verified · Form A to sign · photos Thu 26 Nov' },
  { id: 'p7', img: 'p7.svg', name: 'Zahra Townhouse 114', short: 'Zahra TH 114', area: 'Town Square', type: 'Townhouse', beds: 3, baths: 4, sqft: 2260, furnished: false, rent: 145000, deposit: 7250,
    stage: 8, status: 'Occupied · arrears', tone: 'danger', tenant: 'Hassan El-Sayed', start: '1 May 2026', end: '30 Apr 2027', pay: '4 cheques', ejari: '0120260501003358',
    note: 'Cheque 3 returned · 30-day notice ends 9 Dec' },
];
const P = Object.fromEntries(properties.map(p => [p.id, p]));

// The rulebook. kind: law = statutory hard rule · reg = regulator/process requirement · std = openrent.me standard (better than law)
// scope: all = every tenancy · new = new tenancies only · renewal = renewals · listing = adverts
const rules = [
  { id: 'DXB-001', title: 'Written contract, registered in Ejari', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 4 (as amended by Law 33/2008)', since: '2008',
    plain: 'Every tenancy must be in writing and registered with RERA through Ejari. Without Ejari you cannot connect DEWA, sponsor family or bring a case to the Rental Disputes Center.',
    enforce: 'A tenancy cannot be marked active — and no rent is released — until the Ejari certificate number is on file.' },
  { id: 'DXB-002', title: 'Advertising permit on every listing', kind: 'reg', scope: 'listing', src: 'RERA advertising rules · Trakheesi permit & QR code', since: '2021',
    plain: 'A property may only be advertised with a valid Trakheesi permit issued for that unit, backed by a signed marketing agreement (Form A) with the owner. The permit number and QR code must appear on the advert.',
    enforce: 'Listings cannot go live without Form A, a verified title deed and an active permit. Expired permits pause the advert automatically.' },
  { id: 'DXB-003', title: 'Only the owner (or a valid PoA) can let', kind: 'reg', scope: 'all', src: 'DLD title-deed records · AML/KYC obligations for brokers', since: '—',
    plain: 'The landlord on the contract must match the title deed, or hold a notarised power of attorney. Identity is confirmed with UAE Pass / Emirates ID.',
    enforce: 'Title deed and ID are checked before listing, and again before contract signing.' },
  { id: 'DXB-006', title: 'Automatic renewal on the same terms', kind: 'law', scope: 'renewal', src: 'Law 26/2007 Art. 6', since: '2007',
    plain: 'If the term ends and the tenant stays on without objection, the tenancy renews for the same period (or one year, whichever is shorter) on the same terms.',
    enforce: 'If nobody acts before expiry, the platform prepares a like-for-like renewal and Ejari renewal.' },
  { id: 'DXB-009', title: 'Rent increases capped by the Smart Rental Index', kind: 'law', scope: 'renewal', src: 'Decree 43/2013 · DLD Smart Rental Index (2025)', since: '2013 · index updated 2025',
    plain: 'On renewal, rent can only rise if it is more than 10% below the index rent for your building: up to 5% (11–20% below), 10% (21–30%), 15% (31–40%) or 20% (more than 40% below).',
    enforce: 'The renewal form pulls the index band for the unit and blocks any figure above the permitted maximum.' },
  { id: 'DXB-014', title: '90 days’ notice to change any term', kind: 'law', scope: 'renewal', src: 'Law 26/2007 Art. 14 (as amended)', since: '2008',
    plain: 'Either side wanting to change the rent or any other term at renewal must tell the other at least 90 days before the contract ends, unless both agreed a different period.',
    enforce: 'After the 90-day cut-off the “propose changes” action locks and renewal is offered on existing terms only.' },
  { id: 'DXB-016', title: 'Landlord keeps the home in good repair', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 16', since: '2007',
    plain: 'Unless agreed otherwise, the landlord is responsible for maintenance and for fixing defects that affect the tenant’s use of the home.',
    enforce: 'Major repairs are always routed to the landlord. Contracts cannot move structural, AC plant, plumbing or electrical faults to the tenant.' },
  { id: 'DXB-019', title: 'No alterations without consent', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 19', since: '2007',
    plain: 'Tenants need the landlord’s permission (and any required permits) before making changes to the property.',
    enforce: 'Alteration requests are logged and approved in-app so there is a record at move-out.' },
  { id: 'DXB-020', title: 'Security deposit is refundable', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 20', since: '2007',
    plain: 'A landlord may take a deposit to cover damage, and must return it — or the balance — when the tenancy ends. The law sets no maximum; market custom is 5% (unfurnished) or 10% (furnished).',
    enforce: 'See OR-101: openrent.me caps and safeguards deposits and sets a return deadline.' },
  { id: 'DXB-021', title: 'Hand back in the same condition, fair wear and tear excepted', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 21', since: '2007',
    plain: 'Tenants return the home as they received it, allowing for normal use. Deductions need evidence.',
    enforce: 'Timestamped move-in and move-out reports are compared side by side; deductions must reference a photo.' },
  { id: 'DXB-024', title: 'No subletting without written consent', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 24', since: '2007',
    plain: 'A tenant cannot sublet or assign the tenancy unless the landlord agrees in writing.',
    enforce: 'Sublet requests need a signed consent; see also DXB-S04 for rooms and bed spaces.' },
  { id: 'DXB-025A', title: 'Eviction during the term — limited grounds, 30-day notice', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 25(1) (as amended)', since: '2008',
    plain: 'Before expiry a landlord can only seek eviction on listed grounds — for example unpaid rent 30 days after a notice served through a notary public or registered mail, unauthorised subletting, illegal use or serious damage.',
    enforce: 'Arrears follow a fixed path: reminder → notarised 30-day notice → RDC file. The platform will not generate any other “eviction” letter.' },
  { id: 'DXB-025B', title: 'Eviction at expiry — 12 months’ notarised notice', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 25(2) (as amended)', since: '2008',
    plain: 'To recover a home at the end of the term (owner’s or first-degree relative’s own use, sale, demolition or major works) the landlord must give at least 12 months’ notice, stating the reason, through a notary public or registered mail.',
    enforce: 'Notices are drafted from the legal template, dated, and sent via the notary service; shorter periods and other reasons are rejected.' },
  { id: 'DXB-026', title: 'No re-letting after an own-use eviction', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 26', since: '2008',
    plain: 'A home recovered for the owner’s own use cannot be let to someone else for 2 years (residential). If it is, the former tenant may claim compensation.',
    enforce: 'The unit is locked from listing for 24 months after an own-use recovery.' },
  { id: 'DXB-027', title: 'A sale does not end the tenancy', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 28', since: '2007',
    plain: 'If the property changes hands, the new owner takes over the existing tenancy on the same terms.',
    enforce: 'Ownership transfers carry the tenancy, deposit record and payment schedule to the new owner’s account.' },
  { id: 'DXB-034', title: 'No cutting services or locking out', kind: 'law', scope: 'all', src: 'Law 26/2007 Art. 34 · clarified March 2026', since: '2007',
    plain: 'A landlord must not disconnect utilities or otherwise stop the tenant using the home. Disputes go to the Rental Disputes Center, not self-help.',
    enforce: 'There is no such action in the product. Reports of a lock-out or cut-off are escalated to a manager within one hour.' },
  { id: 'DXB-OCC', title: 'Everyone living in the home is registered', kind: 'reg', scope: 'all', src: 'DLD co-occupant registration (Dubai REST)', since: '2022',
    plain: 'All occupants — family, flatmates, long-stay guests — should be recorded against the Ejari via Dubai REST.',
    enforce: 'Tenants are prompted to add occupants at move-in and whenever the household changes.' },
  { id: 'DXB-S04', title: 'Shared housing needs a permit — tenants cannot sublet rooms or bed spaces', kind: 'law', scope: 'all', src: 'Law 4/2026 on shared housing (in force since late Aug 2026)', since: '2026',
    plain: 'Letting rooms, partitions or bed spaces is only allowed by the owner or an authorised operator holding a shared-housing permit, within occupancy and safety standards. Fines can reach AED 1,000,000.',
    enforce: 'Listings are for whole units. Room-by-room letting is disabled unless a shared-housing permit is uploaded and verified.' },
  { id: 'DXB-PAY', title: 'Payment terms are written into the contract', kind: 'reg', scope: 'new', src: 'Unified tenancy contract · DLD Flexi Rent initiative (June 2026)', since: '2026',
    plain: 'There is no mandatory number of cheques. Monthly, quarterly or half-yearly instalments are allowed when both sides agree, and must be stated in the contract. Rent is the same total whichever plan is chosen.',
    enforce: 'The contract builder records the plan; changing instalments does not change the annual rent.' },
  { id: 'DXB-RDC', title: 'Disputes go to the Rental Disputes Center', kind: 'reg', scope: 'all', src: 'Decree 26/2013 establishing the RDC', since: '2013',
    plain: 'The RDC hears all landlord–tenant disputes. The filing fee is 3.5% of annual rent (minimum AED 500, maximum AED 20,000); half is refunded if you settle.',
    enforce: 'Mediation is offered first. If it fails, a complete case file (contract, Ejari, notices, ledger, photos) is exported.' },
  { id: 'OR-101', title: 'Deposits capped, safeguarded and returned in 14 days', kind: 'std', scope: 'new', src: 'openrent.me standard — goes further than the law', since: '2026.1',
    plain: 'Deposits are limited to 5% of annual rent (10% furnished), held in a safeguarded client account rather than by the landlord, and returned within 14 days of check-out unless a deduction is evidenced.',
    enforce: 'Deposit field has a hard maximum. Release needs both parties, or a manager’s decision on the evidence.' },
  { id: 'OR-102', title: 'A fair way out for tenants', kind: 'std', scope: 'new', src: 'openrent.me standard — goes further than the law', since: '2026.1',
    plain: 'Dubai law gives tenants no automatic right to leave early. Every openrent.me contract includes a break clause: 60 days’ notice and at most two months’ rent. Landlords can offer better, never worse.',
    enforce: 'Break-clause sliders stop at the standard.' },
  { id: 'OR-103', title: 'Small repairs threshold', kind: 'std', scope: 'new', src: 'openrent.me standard', since: '2026.1',
    plain: 'Tenants cover minor fixes up to AED 500 per item (light bulbs, blocked drains they caused). Everything else is the landlord’s cost. The threshold can be lowered, not raised.',
    enforce: 'Each maintenance job is tagged with who pays before a contractor is booked.' },
  { id: 'OR-104', title: 'Emergency response within 4 hours', kind: 'std', scope: 'all', src: 'openrent.me standard', since: '2026.2',
    plain: 'No cooling in summer, flooding, no power or a security risk are emergencies. If the landlord does not respond in 60 minutes, openrent.me dispatches an approved contractor up to a pre-agreed limit.',
    enforce: 'Emergency tickets start a timer visible to tenant, landlord and manager.' },
  { id: 'OR-105', title: 'No agency commission for tenants', kind: 'std', scope: 'all', src: 'openrent.me standard', since: '2026.1',
    plain: 'Tenants never pay a percentage commission. Fees are flat, shown before you commit, and government fees are passed on at cost.',
    enforce: 'Fee table is the only source of tenant charges.' },
];
const R = Object.fromEntries(rules.map(r => [r.id, r]));

const rulesets = [
  { v: '2026.3', date: '26 Aug 2026', state: 'Live', title: 'Shared Housing Law', scope: 'All tenancies', n: 2, summary: 'Room and bed-space letting disabled without a permit; sublet consent flow tightened.' },
  { v: '2026.2', date: '23 Jun 2026', state: 'Live', title: 'Flexi Rent payment plans', scope: 'New & renewed contracts', n: 1, summary: 'Monthly, quarterly and half-yearly instalments available in the contract builder.' },
  { v: '2026.1', date: '8 Mar 2026', state: 'Live', title: 'Service cut-off clarification', scope: 'All tenancies', n: 1, summary: 'Lock-out / cut-off reports escalate within one hour; guidance text updated.' },
  { v: '2025.1', date: '2 Jan 2025', state: 'Live', title: 'Smart Rental Index', scope: 'Renewals', n: 1, summary: 'Rent-increase cap now reads the building-level index.' },
];

const fees = {
  landlord: [
    { key: 'List.me', price: 299, unit: 'per listing', what: 'Trakheesi permit & QR, verified advert, enquiry inbox, viewing scheduler' },
    { key: 'Let.me', price: 899, unit: 'per tenancy', what: 'Tenant verification, unified contract, e-signature, deposit safeguarding, Ejari' },
    { key: 'Collect.me', price: '1%', unit: 'of rent collected · max AED 150/mo', what: 'Direct debit & card collection, cheque custody, arrears workflow' },
    { key: 'Manage.me', price: '3.5%', unit: 'of annual rent', what: 'Everything above plus maintenance coordination, renewals and a named manager' },
  ],
  tenant: [
    { key: 'Move.me', price: 249, unit: 'once per tenancy', what: 'Verification, contract, Ejari handling, move-in report' },
  ],
  addons: [
    ['Professional photos & floor plan', 449], ['Hosted viewing', 99], ['Inventory & condition report', 399], ['Renewal pack (index check, addendum, Ejari)', 349],
    ['Notarised legal notice service', 449], ['RDC case file preparation', 699], ['Rent guarantee (partner insurer)', '2.9%'],
  ],
};

module.exports = { TODAY, company, people, STAGES, properties, P, rules, R, rulesets, fees };
