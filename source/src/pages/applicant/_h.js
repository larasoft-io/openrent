// Shared bits for the applicant (incoming tenant) journey: Arjun & Neha Mehta → Executive Towers K 1807
const ui = require('../../lib/ui');
const { icon } = ui;
const { P } = require('../../lib/data');

const p = P.p4;
const B = '../../';
// Same journey steps the manager sees on the tenancy page (manager/tenancy.html)
const STEPS = [{ label: 'Offer' }, { label: 'Referencing' }, { label: 'Deposit' }, { label: 'Contract', icon: 'pen-line' }, { label: 'Ejari', icon: 'file-check' }, { label: 'Move-in', icon: 'key-round' }, { label: 'Home', icon: 'house' }];
const NOW = 3;
const task = (state, title, d, end = '') => `<div class="mg-task ${state}"><span class="ck">${icon((state === 'block' || state === 'lock') ? 'lock' : state === 'now' ? 'circle-dot' : state === 'wait' ? 'hourglass' : 'check', 13)}</span><div class="grow"><b>${title}</b>${d ? `<span class="d">${d}</span>` : ''}</div>${end}</div>`;

module.exports = { p, B, STEPS, NOW, task };
