// ===== Small, dependency-free charts (single-hue, hover tooltips, table view) =====

let chartTip;
function tipShow(e, text) {
  if (!chartTip) { chartTip = document.createElement('div'); chartTip.className = 'chart-tip'; chartTip.setAttribute('role', 'status'); document.body.appendChild(chartTip); }
  chartTip.textContent = text;
  chartTip.style.display = 'block';
  const r = (e.currentTarget || e.target).getBoundingClientRect();
  const x = e.clientX ?? (r.left + r.width / 2), y = e.clientY ?? r.top;
  chartTip.style.left = Math.min(window.innerWidth - chartTip.offsetWidth - 8, Math.max(8, x + 12)) + 'px';
  chartTip.style.top = Math.max(8, y - chartTip.offsetHeight - 10) + 'px';
}
function tipHide() { if (chartTip) chartTip.style.display = 'none'; }
function bindTips(root) {
  root.querySelectorAll('[data-tip]').forEach(el => {
    el.addEventListener('pointermove', e => tipShow(e, el.dataset.tip));
    el.addEventListener('pointerleave', tipHide);
    el.addEventListener('focus', e => tipShow(e, el.dataset.tip));
    el.addEventListener('blur', tipHide);
  });
}

// Horizontal bar chart. rows: [{label, value, tip?}]
function barChart(el, rows, { unit = '', caption = '' } = {}) {
  const max = Math.max(1, ...rows.map(r => r.value));
  el.innerHTML = `<div class="hbars" role="img" aria-label="${esc(caption)}">
    ${rows.map(r => `<div class="hb-row" tabindex="0" data-tip="${esc(r.tip || `${r.label}: ${r.value}${unit ? ' ' + unit : ''}`)}">
      <span class="hb-label">${esc(r.label)}</span>
      <span class="hb-track"><span class="hb-bar" style="width:${(r.value / max * 100).toFixed(1)}%"></span><span class="hb-val">${r.value}</span></span>
    </div>`).join('')}
  </div>
  <details class="chart-table"><summary>Show as table</summary>
    <table><thead><tr><th>${esc(caption || 'Item')}</th><th>${esc(unit || 'Value')}</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${esc(r.label)}</td><td>${r.value}</td></tr>`).join('')}</tbody></table></details>`;
  bindTips(el);
}

// Weekly timetable grid: who is in on which day
function timetableGrid(el, doctors) {
  const days = DAY_ORDER;
  const todayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date(todayPK() + 'T00:00:00').getDay()];
  const list = doctors.filter(isBookable);
  el.innerHTML = `<div class="tt-wrap"><table class="tt">
    <thead><tr><th scope="col">Doctor</th>${days.map(d => `<th scope="col" class="${d === todayKey ? 'today' : ''}">${DAY_NAMES[d]}</th>`).join('')}</tr></thead>
    <tbody>${list.map(d => `<tr><th scope="row"><a class="plain" href="doctor.html?id=${d.id}">${esc(d.name)}</a><small>${esc(d.specialty)}</small></th>
      ${days.map(k => { const s = d.schedule[k];
        return s ? `<td class="${k === todayKey ? 'today' : ''}"><a class="tt-cell" href="book.html?doctor=${d.id}" data-tip="${esc(`${d.name} · ${DAY_FULL[k]} ${fmtTime(s[0])} – ${fmtTime(s[1])}`)}">${fmtTime(s[0]).replace(':00', '')}–${fmtTime(s[1]).replace(':00', '')}</a></td>`
                 : `<td class="off ${k === todayKey ? 'today' : ''}"><span aria-label="Off">·</span></td>`; }).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
  bindTips(el);
}

// Weekly OPD hours per doctor/specialty, from the timetable
function weeklyHours(d) {
  return Object.values(d.schedule || {}).reduce((t, [a, b]) => {
    const [h1, m1] = a.split(':').map(Number), [h2, m2] = b.split(':').map(Number);
    return t + Math.max(0, (h2 * 60 + m2 - h1 * 60 - m1) / 60);
  }, 0);
}
