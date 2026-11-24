#!/usr/bin/env node
// Captures dashboard screenshots used by the marketing site. Usage: node src/shots.js [name-filter]
const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const dist = path.join(__dirname, '../dist');
const out = path.join(__dirname, 'shots');
// name: [page, options]  options: {scroll, desktop, tab:'group:id', sheet:'id', click:'selector'}
const SHOTS = {
  'tenant-home': ['app/tenant/index.html'],
  'tenant-renewal': ['app/tenant/renewal.html'],
  'tenant-payments': ['app/tenant/payments.html'],
  'tenant-repair': ['app/tenant/repair-detail.html'],
  'tenant-rights': ['app/tenant/rights.html'],
  'landlord-home': ['app/landlord/index.html'],
  'landlord-properties': ['app/landlord/properties.html'],
  'landlord-contract': ['app/landlord/contract.html'],
  'landlord-renewals': ['app/landlord/renewals.html'],
  'landlord-arrears': ['app/landlord/arrears.html'],
  'landlord-listing': ['app/landlord/listing.html'],
  'landlord-offers': ['app/landlord/offers.html'],
  'landlord-moveout': ['app/landlord/moveout.html'],
  'contractor-today': ['app/contractor/index.html'],
  'contractor-job': ['app/contractor/job.html'],
  'contractor-earnings': ['app/contractor/earnings.html'],
  'manager-queue': ['app/manager/index.html'],
  'manager-tenancies': ['app/manager/tenancies.html'],
  'manager-dispute': ['app/manager/dispute.html'],
  'admin-overview': ['app/admin/index.html'],
  'admin-rulesets': ['app/admin/rulesets.html'],
  'admin-ruleset': ['app/admin/ruleset.html'],
  'desk-landlord-home': ['app/landlord/index.html', { desktop: true }],
  'desk-admin-rulesets': ['app/admin/rulesets.html', { desktop: true }],
};
(async () => {
  const filter = process.argv[2];
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const overrides = fs.existsSync(path.join(__dirname, 'shots.overrides.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'shots.overrides.json'), 'utf8')) : {};
  for (const [name, [page, o0 = {}]] of Object.entries(SHOTS)) {
    if (filter && !name.includes(filter)) continue;
    const o = Object.assign({}, o0, overrides[name] || {});
    const file = path.join(dist, o.page || page);
    if (!fs.existsSync(file)) { console.log('skip (missing page)', name); continue; }
    const ctx = await b.newContext(o.desktop ? { viewport: { width: 1360, height: 850 }, deviceScaleFactor: 1.5 } : { viewport: { width: 390, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    await p.goto('file://' + file + (o.hash || ''));
    await p.waitForTimeout(300);
    if (o.tab) await p.click(`[data-tabs="${o.tab.split(':')[0]}"] [data-tab="${o.tab.split(':')[1]}"]`);
    if (o.scroll) await p.evaluate(y => window.scrollTo(0, y), o.scroll);
    if (o.scrollTo) await p.evaluate(sel => { const e = document.querySelector(sel); if (e) window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 70); }, o.scrollTo);
    await p.waitForTimeout(250);
    const buf = await p.screenshot();
    await sharp(buf).webp({ quality: o.desktop ? 80 : 82 }).toFile(path.join(out, name + '.webp'));
    console.log('shot', name);
    await ctx.close();
  }
  await b.close();
})();
