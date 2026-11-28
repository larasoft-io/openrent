// States gallery: the building blocks for empty, error and loading states, and a link to every page that has them.
const fs = require('fs');
const path = require('path');
const St = require('../../lib/states');

const NOTES = { loading: 'Skeleton shaped like the page', empty: 'First use or nothing to show', error: 'Load failed, with retry', offline: 'No signal, work is queued', partial: 'One source failed, the rest loaded' };

module.exports = {
  slug: 'states',
  render: ({ ui, shell, roles }) => {
    const { icon, card, pageHead, sectionHead, btn, badge } = ui;
    const dir = path.join(__dirname, '../../states');
    const order = shell.ROLE_ORDER.filter(id => roles[id] && fs.existsSync(path.join(dir, id + '.js')));

    const ctx = {};
    const rolePages = order.map(id => {
      const defs = require(path.join(dir, id + '.js'));
      const rows = Object.keys(defs).map(slug => {
        const kinds = Object.keys(defs[slug](ctx));
        return `<div class="row"><div class="row-main"><div class="row-title">${slug === 'index' ? 'Home' : slug.replace(/-/g, ' ').replace(/^./, c => c.toUpperCase())}</div><div class="cluster mt-1">${kinds.map(k => `<a class="chip" style="height:30px;padding:0 11px;font-size:12.5px" href="${id}/${slug}.html?state=${k}">${k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</div></div></div>`;
      }).join('');
      return `<section class="card role-${id}"><div class="card-head"><h3 class="inline"><span class="row-ico role" style="width:32px;height:32px;border-radius:10px">${icon(roles[id].icon || 'user', 16)}</span>${roles[id].label}</h3></div><div class="list mt-2">${rows}</div></section>`;
    }).join('');

    const block = (label, html, note) => `<div><div class="gallery-label"><span class="eyebrow">${label}</span>${note ? `<span class="micro faint">${note}</span>` : ''}</div>${html}</div>`;

    const body = `
${pageHead({ eyebrow: 'Design system', title: 'Empty, error and loading states', sub: 'What every screen shows before there is data, while it loads, and when something fails. The same blocks are used by every role, so a blank list or a failed load always looks and reads the same.' })}

${sectionHead('How we write them')}
<div class="grid sm2 lg3">${[
      ['message-square-text', 'Say what happened, plainly', '“We couldn’t load your payments”, not “Error 503”. No blame on the user.'],
      ['shield-check', 'Say what is safe', 'Rent, deposits and contracts are what people worry about. Tell them it is not affected.'],
      ['arrow-right', 'Always offer a next step', 'Try again, a way round it, or the first thing to do when a list is empty.'],
      ['hash', 'Give a reference', 'Every error shows a code to quote to support, and whether other services are up.'],
      ['layout-template', 'Skeletons match the page', 'Loading shows the shape of what is coming, so nothing jumps when it arrives.'],
      ['wifi-off', 'Keep working offline', 'Saved pages stay readable; actions queue on the device and send on reconnect.'],
    ].map(([ic, t, d]) => `<div class="card pad stack stack-sm"><span class="row-ico role">${icon(ic, 20)}</span><h3>${t}</h3><p class="small muted">${d}</p></div>`).join('')}</div>

${sectionHead('Building blocks')}
<div class="grid lg2" style="align-items:start">
  ${block('Empty · first use', St.empty({ icon: 'house-plus', dot: true, title: 'No properties yet', body: 'Add a home and we take it from listing to keys.', actions: [btn('Add a property', { variant: 'primary', icon: 'plus', toast: 'Opens the listing wizard (demo)' })] }), 'states.empty()')}
  ${block('Error · page failed to load', St.failure({ title: 'We couldn’t load your payments', body: 'Your direct debit for Tue 1 Dec is not affected.', ref: 'ERR-2411-PAY7', actions: [btn('Try again', { variant: 'primary', icon: 'refresh-cw', toast: 'Retrying… (demo)' })] }), 'states.failure()')}
  ${block('Empty · inside a card', card({ title: 'Upcoming viewings', body: St.empty({ compact: true, box: '', icon: 'calendar-days', title: 'No viewings booked', body: 'Applicants book from the listing. You confirm each slot.' }) }), 'compact')}
  ${block('All done', St.empty({ icon: 'circle-check-big', tone: 'ok', box: 'boxed', title: 'Your queue is clear', body: 'We’ll alert you the moment something needs you.' }), 'tone: ok')}
  ${block('Error · one card failed', card({ flush: true, body: St.failInline({ icon: 'landmark', title: 'Bank feed is delayed', body: 'Everything else on this page is up to date.' }).replace(/data-state-retry=""/, 'data-toast="Retrying… (demo)"') }), 'states.failInline()')}
  ${block('No search results', St.empty({ icon: 'search-x', tone: 'neutral', title: 'No one matches “Al Mansoori”', body: 'Try fewer words, or check the spelling.', actions: [btn('Clear search', { size: 'sm', icon: 'x', toast: 'Search cleared (demo)' })] }), 'tone: neutral')}
  ${block('Loading · list', `<div class="stack stack-sm">${St.sk.list(3, { pill: true })}</div>`, 'sk.list()')}
  ${block('Loading · figures and cards', `<div class="stack stack-sm">${St.sk.stats(2, 'g2')}${St.sk.card(2)}</div>`, 'sk.stats() · sk.card()')}
  ${block('Offline banner', `<div style="border-radius:14px;overflow:hidden">${St.netBanner()}</div><p class="micro faint mt-2">Appears under the top bar on every page when the device loses its connection, and confirms when it is back. Add <span class="code">?net=offline</span> to any page to see it.</p>`, 'live on every page')}
  ${block('Action failed', `<div class="callout danger">${icon('octagon-alert', 20)}<div class="grow"><h4>Payment didn’t go through</h4><p>Emirates NBD declined the debit card ending 4417. You haven’t been charged. Try another card, or pay by bank transfer.</p><div class="cluster">${btn('Try another card', { size: 'sm', toast: 'Card form (demo)' })}${badge('Ref PAY-2411-D51', 'danger')}</div></div></div>`, 'callout · danger')}
</div>

${sectionHead('See them on real pages')}
<p class="small muted" style="margin-top:-6px">Each of these pages has a preview switch at the top. Pick a state here or there; the address keeps it, so you can share a link to one state.</p>
<div class="grid lg2" style="align-items:start">${rolePages}</div>

${sectionHead('Full-page states')}
<div class="grid sm2 lg4">${[
      ['../404.html', 'door-open', 'Not found (404)', 'Broken or old links'],
      ['../500.html', 'server-crash', 'Server error (500)', 'When the service fails'],
      ['../offline.html', 'wifi-off', 'Offline', 'Fallback with saved documents'],
      ['../no-access.html', 'lock', 'No access (403)', 'Signed in as the wrong role'],
    ].map(([href, ic, t, d]) => `<a class="card pad link-card stack stack-sm" href="${href}"><span class="row-ico accent">${icon(ic, 20)}</span><h3>${t}</h3><p class="small muted">${d}</p></a>`).join('')}</div>
<p class="demo-note">${icon('info', 14)} ${Object.entries(NOTES).map(([k, v]) => `<b>${k[0].toUpperCase() + k.slice(1)}</b> ${v.toLowerCase()}`).join(' · ')}</p>`;
    return shell.plainPage({ title: 'States', body, back: 'index.html' });
  },
};
