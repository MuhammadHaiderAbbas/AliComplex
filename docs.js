// ===== Documents: letterhead, payslip, letters, organisation chart =====
// Used by the website (team / letterhead pages) and the staff panel (printing).

const LOGO_SVG = `<svg viewBox="0 0 114 120" aria-hidden="true"><rect x="38" y="8" width="38" height="104" rx="11" fill="currentColor"/><rect x="6" y="38" width="102" height="40" rx="11" fill="currentColor"/><path class="lg-sw" d="M83 9c19 6 21 30 2 50C68 76 54 90 52 113c-6-20 3-36 20-52 16-15 22-35 11-52z" fill="#14b3c4"/><circle cx="54" cy="31" r="9.5" fill="#fff"/><path d="M17 54c14-5 33-5 47-11 7-3 13-8 17-14-3 12-12 21-22 28-10 7-16 17-19 31-1 6-2 12 0 19-8-13-8-29 0-41-6-6-13-9-23-12z" fill="#fff"/></svg>`;

function money(n) { return Number(n || 0).toLocaleString('en-PK'); }

// 72415 -> "Seventy-Two Thousand Four Hundred Fifteen Rupees Only"
function amountInWords(n) {
  n = Math.round(Number(n) || 0);
  if (n === 0) return 'Zero Rupees Only';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = x => x < 20 ? ones[x] : tens[Math.floor(x / 10)] + (x % 10 ? '-' + ones[x % 10] : '');
  const three = x => (x >= 100 ? ones[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : '');
  const parts = [];
  [[1e9, 'Billion'], [1e6, 'Million'], [1e3, 'Thousand']].forEach(([v, w]) => { if (n >= v) { parts.push(three(Math.floor(n / v)) + ' ' + w); n %= v; } });
  if (n) parts.push(three(n));
  return parts.join(' ') + ' Rupees Only';
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function periodLabel(p) { const [y, m] = p.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; }
function fyFor(p) { const [y, m] = p.split('-').map(Number); const s = m >= 7 ? y : y - 1; return `${s}-${String(s + 1).slice(2)}`; } // Pakistan FY: July–June
function longDate(d) { return new Date(String(d).slice(0, 10) + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }

// ---------- letterhead ----------
function letterheadHTML(content, opts = {}) {
  const H = typeof HOSPITAL !== 'undefined' ? HOSPITAL : {};
  const web = (H.website || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const contacts = [H.phone1, H.phone2, web, H.email, H.address].filter(Boolean);
  return `<div class="lh-page" data-no-tr>
    <div class="lh-bar"></div>
    <div class="lh-watermark">${LOGO_SVG}</div>
    <header class="lh-head">
      <div class="lh-brand"><img class="lh-lockup" src="brand/logo-horizontal.svg" alt="${esc(H.legal_name || 'Ali Medical Complex')}">
        ${H.legal_name && H.legal_name !== 'Ali Medical Complex' ? `<div class="lh-name">${esc(H.legal_name)}</div>` : ''}</div>
      <ul class="lh-contact">${contacts.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    </header>
    <main class="lh-body">${content}</main>
    <footer class="lh-foot">${opts.footer ? opts.footer : ''}</footer>
  </div>`;
}
function verifyFooter(ref, code) {
  const H = typeof HOSPITAL !== 'undefined' ? HOSPITAL : {};
  const url = (H.website || '').replace(/\/?$/, '/') + 'verify.html';
  return `${ref ? `Ref: <b>${esc(ref)}</b> · ` : ''}Verify this document at <b>${esc(url.replace(/^https?:\/\//, ''))}</b> using code <b>${esc(code || '— (draft) —')}</b>`;
}

// ---------- payslip ----------
// Layout follows the common Pakistani salary-slip format: details grid, then
// Pay & Allowances | Others Allowances | Deductions, then Gross Pay and Net Amount.
const OTHER_ALLOW = /medical|fuel|driver|dvr|conveyance|transport|arrear|overtime|big city|disl|other|incentive/i;
const PS_STD = {
  pay: [['Basic', /^basic/i], ['HRA', /hra|house/i], ['Utility', /utilit/i], ['Adhoc 15%', /adhoc|ad-hoc/i], ['Eid Bonus', /bonus/i]],
  oth: [['Fuel & Dvr Allowance', /fuel|dvr|driver/i], ['Medical Allowance', /medical/i], ['Disl/Big City Allce', /disl|big city/i], ['Arrears', /arrear/i], ['Others Add', /^others? add/i]],
  ded: [['Income Tax', /tax/i], ['Provident Fund', /provident|\bpf\b/i], ['Misc. Deduction', /misc/i], ['Adv/Loan', /adv|loan/i], ['Others Ded', /^others? ded/i], ['Incremental Difference', /increment/i]]
};
// Put lines into the sample's fixed rows (shown as 0 when empty); anything else is added below them
function psColumn(lines, std) {
  const used = new Set();
  const rows = std.map(([label, re]) => {
    const hits = lines.filter((x, k) => !used.has(k) && re.test(x.name) && used.add(k));
    return { name: label, amount: hits.reduce((t, x) => t + Number(x.amount || 0), 0) };
  });
  lines.forEach((x, k) => { if (!used.has(k)) rows.push({ name: x.name, amount: Number(x.amount || 0) }); });
  return rows;
}
function payslipHTML(s) {
  const d = s.data;
  const otherRe = new RegExp(PS_STD.oth.map(([, r]) => r.source).join('|') + '|conveyance|transport|overtime|incentive', 'i');
  const pay = psColumn(d.earnings.filter(x => !otherRe.test(x.name)), PS_STD.pay);
  const oth = psColumn(d.earnings.filter(x => otherRe.test(x.name)), PS_STD.oth);
  const ded = psColumn(d.deductions, PS_STD.ded);
  const rows = Math.max(pay.length, oth.length, ded.length);
  const n = x => x ? esc(x.name) : '', a = x => x ? String(Math.round(x.amount)) : '';
  let body = '';
  for (let i = 0; i < rows; i++) body += `<tr><td class="lbl">${n(pay[i])}</td><td class="amt i">${a(pay[i])}</td><td class="lbl">${n(oth[i])}</td><td class="amt">${a(oth[i])}</td><td class="lbl">${n(ded[i])}</td><td class="amt">${a(ded[i])}</td></tr>`;
  const stamp = s.status === 'void' ? '<span class="ps-stamp">VOID</span>' : s.status === 'draft' ? '<span class="ps-stamp">DRAFT</span>' : '';
  const [mon, yr] = String(d.period_label).split(' ');
  const title = `Salary Slip for the Month of ${esc(mon)}${d.title_note ? ' ' + esc(d.title_note) : ''}, ${esc(yr)}`;
  return `<div class="ps-page" data-no-tr>
    ${stamp}
    <div class="ps-logo"><img src="brand/logo-stacked.svg" alt="Ali Medical Complex"></div>
    <div class="ps-title">${title}</div>
    <table class="ps">
      <colgroup><col style="width:18%"><col style="width:10%"><col style="width:22%"><col style="width:12%"><col style="width:19%"><col style="width:19%"></colgroup>
      <tr><th rowspan="2" class="hd">Name and<br>Designation:</th><td rowspan="2" colspan="3" class="val">${esc(d.name)}${d.designation ? ', ' + esc(d.designation) : ''}</td><th class="hd">BPS:</th><td class="val">${esc(d.bps || '0')}</td></tr>
      <tr><th class="hd">Stage:</th><td class="val">${esc(d.stage || '0')}</td></tr>
      <tr><th class="hd">DOJ</th><td colspan="3" class="val">${d.join_date ? new Date(d.join_date + 'T00:00:00').toLocaleDateString('en-US') : ''}</td><th class="hd">Days:</th><td class="val">${d.days_attended ?? d.working_days ?? ''}</td></tr>
      <tr><th class="hd">Branch</th><td colspan="3" class="val">${esc(d.department || '')}</td><th class="hd">Emp. Code:</th><td class="val">${esc(d.emp_code)}</td></tr>
      <tr><th class="hd">A/C #</th><td colspan="5" class="acc">${esc(d.bank_account || '')}</td></tr>
      <tr class="cols"><th>Pay &amp; Allowances</th><th>Amount</th><th>Others Allowances</th><th>Amount</th><th>Deductions</th><th>Amount</th></tr>
      ${body}
      <tr class="tot"><th colspan="5">Gross Pay</th><td class="val">${Math.round(d.gross)}</td></tr>
      <tr class="tot"><th colspan="5">Net Amount</th><td class="val">${Math.round(d.net)}</td></tr>
      <tr><td colspan="6" class="blank"><span class="ps-note">This is a system-generated payslip and does not require a signature or stamp.</span>${s.verify_code ? `<span class="ps-verify">Verification code ${esc(s.verify_code)}</span>` : ''}</td></tr>
    </table>
  </div>`;
}

// ---------- letters ----------
const nl2p = t => esc(t || '').split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

function signatureBlock(d) {
  return `<div class="sig">
    <p>${esc(d.closing || 'Yours faithfully,')}</p>
    <div class="sign-line" style="margin-top:46px"></div>
    <b>${esc(d.sign_name || '')}</b><br>${esc(d.sign_title || '')}<br>${esc(d.employer || '')}
    ${d.sign_phone ? `<br>Telephone: ${esc(d.sign_phone)}` : ''}${d.sign_email ? `<br>Email: ${esc(d.sign_email)}` : ''}
  </div>`;
}

function generalLetterHTML(d, ref, code, status) {
  return letterheadHTML(`
    ${status === 'void' ? '<div class="doc-title"><span class="void">VOID</span></div>' : ''}
    <div class="ltr-top"><div>${d.to_name || d.to_lines ? `To<br><b>${esc(d.to_name || '')}</b><br>${esc(d.to_lines || '').replace(/\n/g, '<br>')}` : ''}</div>
      <div class="ltr-date">${ref ? `Ref: ${esc(ref)}<br>` : ''}<b>${longDate(d.date)}</b></div></div>
    ${d.subject ? `<p class="subj">Subject: ${esc(d.subject)}</p>` : ''}
    ${d.salutation ? `<p>${esc(d.salutation)}</p>` : ''}
    ${nl2p(d.body)}
    ${signatureBlock(d)}
  `, { footer: verifyFooter(ref, code) });
}

function referenceLetterHTML(d, ref, code, status) {
  const duties = (d.duties || '').split('\n').map(x => x.trim()).filter(Boolean);
  return letterheadHTML(`
    ${status === 'void' ? '<div class="doc-title"><span class="void">VOID</span></div>' : ''}
    <div class="ltr-top"><div>To Whom It May Concern</div><div class="ltr-date">${ref ? `Ref: ${esc(ref)}<br>` : ''}<b>${longDate(d.date)}</b></div></div>
    <p class="subj">Re: Employment Verification for ${esc(d.employee_name)}</p>
    <p>This letter confirms that ${esc(d.employee_name)}${d.cnic ? `, holder of CNIC/Passport No. ${esc(d.cnic)},` : ''} ${d.end_date ? 'was' : 'is'} employed by ${esc(d.employer)} as ${esc(d.title)} from ${longDate(d.start_date)} to ${d.end_date ? longDate(d.end_date) : 'the present'}.
      The employment ${d.end_date ? 'was' : 'is'} ${esc(d.emp_type.toLowerCase())}, averaging ${esc(d.hours)} hours per week${d.salary ? `, and the employee ${d.end_date ? 'received' : 'receives'} a gross salary of PKR ${money(d.salary)} per ${esc(d.salary_per || 'month')}` : ''}.</p>
    <h4>Employment Details</h4>
    <table class="kv">
      <tr><th>Employer</th><td>${esc(d.employer)}</td></tr>
      <tr><th>Business address</th><td>${esc(d.address)}</td></tr>
      <tr><th>Employee</th><td>${esc(d.employee_name)}</td></tr>
      <tr><th>Official position title</th><td>${esc(d.title)}</td></tr>
      <tr><th>Employment period</th><td>${longDate(d.start_date)} to ${d.end_date ? longDate(d.end_date) : 'Present'}</td></tr>
      <tr><th>Hours and employment type</th><td>${esc(d.emp_type)}, ${esc(d.hours)} hours per week</td></tr>
      ${d.salary ? `<tr><th>Gross remuneration</th><td>PKR ${money(d.salary)} per ${esc(d.salary_per || 'month')}</td></tr>` : ''}
      ${d.supervisor ? `<tr><th>Immediate supervisor</th><td>${esc(d.supervisor)}</td></tr>` : ''}
      <tr><th>Referee</th><td>${esc([d.sign_name, d.sign_title, d.sign_phone, d.sign_email].filter(Boolean).join(', '))}</td></tr>
    </table>
    ${duties.length ? `<h4>Primary Duties and Responsibilities</h4><p>Throughout the above employment, ${esc(d.employee_name)} performed the following duties:</p>
      <ul class="duties">${duties.map(x => `<li>${esc(x.replace(/^[-•*]\s*/, ''))}</li>`).join('')}</ul>` : ''}
    ${d.supervisor || d.manages ? `<h4>Reporting and Organisational Structure</h4>
      <p>${d.supervisor ? `${esc(d.employee_name)} reported to ${esc(d.supervisor)}.` : ''}
      ${d.manages ? ` The employee managed or coordinated the following positions/functions: ${esc(d.manages)}.` : ''}
      ${d.clinical_lead ? ` ${esc(d.clinical_lead)} retained responsibility for clinical governance and professional clinical supervision.` : ''}
      ${d.attach_chart ? ' An organisation chart confirming these relationships is attached to this letter.' : ''}</p>` : ''}
    <h4>Confirmation</h4>
    <p>I confirm that the information in this letter is true and correct and is based on the employer's employment, payroll and operational records.
      ${duties.length ? `${esc(d.employee_name)} performed the duties described above during the stated period of employment.` : ''}</p>
    <p>Should further information be required, please contact me using the details below.</p>
    ${signatureBlock(d)}
  `, { footer: verifyFooter(ref, code) });
}

// ---------- organisation chart ----------
// Drawn as a real tree with connector lines and arrows. Each person has a layout for the people under them:
//   row    – side by side under a horizontal line (arrows down)
//   column – a list under them with a bracket line (arrows right)
//   stack  – blocks placed one below the other (used by connectors)
// "junction" entries are connectors only: they draw lines but no box.
const GRP_LABEL = { leadership: 'Management', clinical: 'Clinical Services', allied: 'Allied Health', nursing: 'Nursing', admin: 'Administration & Finance', support: 'Support Services', group: '', junction: '', staff: '' };
const isPerson = p => p && p.grp !== 'group' && p.grp !== 'junction';

function orgTree(list) {
  const by = {}; list.forEach(p => (by[p.parent_id ?? 'root'] = by[p.parent_id ?? 'root'] || []).push(p));
  const ids = new Set(list.map(p => p.id));
  const roots = list.filter(p => p.parent_id == null || !ids.has(p.parent_id));
  const kids = p => (by[p.id] || []).sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
  return { roots, kids };
}
let OC_AVATARS = false;
function personCard(p, cls = '') {
  if (p.grp === 'junction') return '';
  if (p.grp === 'group') return `<div class="oc-card oc-group ${cls}"><b>${esc(p.name)}</b></div>`;
  const av = OC_AVATARS && typeof avatarHTML === 'function';
  return `<div class="oc-card oc-${esc(p.grp)} ${cls} ${av ? 'has-av' : ''}">${av ? avatarHTML(p, 'oc-av') : ''}<b>${esc(p.name)}</b>${p.role ? `<span>${esc(p.role)}</span>` : ''}${p.qualification ? `<small>${esc(p.qualification)}</small>` : ''}</div>`;
}
function ocNode(p, kids, depth = 0) {
  const ch = kids(p), junction = p.grp === 'junction';
  const lay = p.layout || 'column';
  const box = personCard(p, depth < 2 ? 'lg' : (ch.length ? 'head' : 'sm'));
  if (!ch.length) return `<div class="t-node">${box}</div>`;
  const label = p.child_label ? `<div class="t-label">${esc(p.child_label)}</div>` : '';
  let inner;
  if (lay === 'row') inner = `<div class="t-row ${ch.length === 1 ? 'one' : ''}">${ch.map(c => `<div class="t-cell ${c.grp === 'junction' ? 'jn' : ''} ${c.grp === 'junction' && (c.layout || 'column') === 'column' ? 'jcol' : ''} ${c.grp !== 'junction' && (c.layout || 'column') === 'column' && kids(c).length ? 'lcol' : ''}">${ocNode(c, kids, depth + 1)}</div>`).join('')}</div>`;
  else if (lay === 'rail') {
    // first child hangs below the line; the rest go down a rail on the right with arrows pointing left
    const [top, ...rest] = ch;
    const items = rest.flatMap(r => r.grp === 'junction' ? kids(r) : [r]);
    inner = `<div class="rail-top">${ocNode(top, kids, depth + 1)}</div><div class="rail-col">${items.map(c => `<div class="rail-item">${ocNode(c, kids, depth + 1)}</div>`).join('')}</div>`;
  }
  else if (lay === 'stack') inner = `<div class="t-stack">${ch.map(c => `<div class="t-block">${ocNode(c, kids, depth + 1)}</div>`).join('')}</div>`;
  else inner = `<div class="t-col">${ch.map(c => `<div class="t-item">${ocNode(c, kids, depth + 1)}</div>`).join('')}</div>`;
  return `<div class="t-node lay-${lay} ${junction ? 'junction' : ''}">${box}${junction ? '' : '<div class="t-stem"></div>'}${label}${inner}</div>`;
}
// Simple indented list (used on small phone screens)
function orgListHTML(list) {
  const { roots, kids } = orgTree(list);
  const li = p => { const ch = kids(p);
    const sub = ch.length ? `<ul class="oc-list">${ch.map(li).join('')}</ul>` : '';
    return p.grp === 'junction' ? ch.map(li).join('') : `<li>${personCard(p, 'sm')}${sub}</li>`; };
  return `<ul class="oc-list oc-root">${roots.map(li).join('')}</ul>`;
}
function orgChartHTML(list, opts = {}) {
  OC_AVATARS = !!opts.avatars;
  if (!list.length) return '<p class="muted">No team members to show yet.</p>';
  const { roots, kids } = orgTree(list);
  return `<div class="tree-fit"><div class="tree">${roots.map(r => ocNode(r, kids)).join('')}</div></div>
    ${opts.list === false ? '' : `<div class="tree-list">${orgListHTML(list)}</div>`}`;
}
// Shrink a drawn chart so it fits its container width
function fitOrgChart(root = document) {
  root.querySelectorAll('.tree-fit').forEach(w => {
    const t = w.firstElementChild; if (!t) return;
    t.style.zoom = 1;
    const need = t.scrollWidth, have = w.clientWidth;
    let z = need > have ? have / need : 1;
    const maxH = Number(w.dataset.maxh || 0);
    if (maxH && t.scrollHeight * z > maxH) z = maxH / t.scrollHeight;
    t.style.zoom = z.toFixed(3);
  });
}
window.addEventListener('resize', () => fitOrgChart());
// People a person manages: their own reports, looking through connectors and team headings
function directReports(team, id) {
  const out = [];
  const walk = pid => team.filter(t => t.parent_id === pid).sort((a, b) => a.sort_order - b.sort_order).forEach(t => t.grp === 'junction' ? walk(t.id) : out.push(t));
  walk(id); return out;
}
// The person someone reports to, skipping connectors and team headings
function managerOf(team, person) {
  let p = team.find(t => t.id === person.parent_id);
  while (p && !isPerson(p)) p = team.find(t => t.id === p.parent_id);
  return p || null;
}
