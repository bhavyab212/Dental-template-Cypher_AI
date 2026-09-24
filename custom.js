/* Site customizations — runs after Framer hydration (and re-enforces via observer) */
(function () {
  'use strict';

  var X_URL = 'https://x.com/Priyans90072914';
  var IN_URL = 'https://www.linkedin.com/in/priyansh-razz-293154372/';
  var IG_URL = 'https://www.instagram.com/thepriyansh06';
  var WA_URL = 'https://wa.me/919080083202';
  var CYPHER_URL = 'https://www.cypherai.in/';
  var EMAIL_OLD = 'glowdent@gmail.com';
  var EMAIL_NEW = 'info@dentel.com';

  /* ---------- 1. Social + credit links ---------- */
  function fixLinks() {
    var anchors = document.querySelectorAll('a[href]');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      var h = a.getAttribute('href');
      if (!h) continue;
      if (h.indexOf('x.com/alevweb') !== -1) {
        if (a.href !== X_URL) a.href = X_URL;
      } else if (h === 'https://www.linkedin.com/' || h === 'https://www.linkedin.com') {
        if (a.href !== IN_URL) a.href = IN_URL;
      } else if (h.indexOf('facebook.com/alevweb') !== -1) {
        if (a.href !== IG_URL) a.href = IG_URL;
      } else if (h.indexOf('framer.com/@alev-web') !== -1) {
        if (a.href !== CYPHER_URL) a.href = CYPHER_URL;
      } else if (h.indexOf('wa.me/') !== -1 || h.indexOf('whatsapp.com/') !== -1 || h.indexOf('api.whatsapp.com/') !== -1) {
        if (a.href !== WA_URL) a.href = WA_URL;
      } else if (h.toLowerCase().indexOf('glowdent@gmail.com') !== -1) {
        a.setAttribute('href', h.replace(/glowdent@gmail\.com/i, EMAIL_NEW));
      }
    }
  }

  /* ---------- 1b. Contact email text -> generic address ---------- */
  function fixEmail() {
    if (!document.body || document.body.textContent.indexOf(EMAIL_OLD) === -1) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) {
      if (n.nodeValue && n.nodeValue.indexOf(EMAIL_OLD) !== -1) nodes.push(n);
    }
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].nodeValue = nodes[i].nodeValue.split(EMAIL_OLD).join(EMAIL_NEW);
    }
  }

  /* ---------- 1d. Browser tab title ---------- */
  function fixTitle() {
    if (document.title !== 'Dental Clinic') document.title = 'Dental Clinic';
  }

  /* ---------- 1c. Copyright brand -> Cypher AI ---------- */
  function fixRights() {
    if (!document.body || document.body.textContent.indexOf('GlowDent') === -1) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) {
      if (n.nodeValue && n.nodeValue.indexOf('GlowDent') !== -1) nodes.push(n);
    }
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].nodeValue = nodes[i].nodeValue.split('GlowDent').join('Cypher AI');
    }
  }

  /* ---------- 2. Footer credit -> Cypher AI ---------- */
  function fixCredit() {
    var ps = document.querySelectorAll('p');
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      if (p.querySelector('.cypher-credit')) continue;
      var t = (p.innerText || '').replace(/\s+/g, ' ').trim();
      if (/^Website By/i.test(t)) {
        p.innerHTML =
          'Website By ' +
          '<a class="cypher-credit" href="' + CYPHER_URL + '" target="_blank" rel="noopener" title="Visit Cypher AI">' +
          '<img class="cypher-credit-logo" src="/cypher-ai-logo.png" alt="Cypher AI logo" />' +
          '<span class="cypher-credit-text">Cypher AI</span></a>';
      }
    }
  }

  /* ---------- 3. Booking redesign ---------- */
  var DOCTORS = [
    'Dr. Xyz',
    'Dr. Sophia Miller',
    'Dr. Daniel Wilson',
    'Dr. Michael Carter',
    'Dr. Olivia Brown',
    'Dr. James Anderson'
  ];
  var SERVICES = [
    'Teeth Whitening',
    'Dental Implants',
    'Root Canal',
    'Braces Treatment',
    'Oral Surgery'
  ];

  function bookingHTML() {
    var docOpts = ['<option value="">Select one...</option>'];
    for (var i = 0; i < DOCTORS.length; i++) {
      docOpts.push('<option value="' + DOCTORS[i] + '"' + (i === 0 ? ' selected' : '') + '>' + DOCTORS[i] + '</option>');
    }
    var svcOpts = ['<option value="">Select one...</option>'];
    for (var j = 0; j < SERVICES.length; j++) {
      svcOpts.push('<option value="' + SERVICES[j] + '">' + SERVICES[j] + '</option>');
    }
    return (
      '<div class="bk-wrap">' +
        '<div class="bk-card bk-doc">' +
          '<div class="bk-doc-top">' +
            '<div class="bk-doc-id">' +
              '<div class="bk-avatar">DX</div>' +
              '<div class="bk-doc-meta">' +
                '<div class="bk-doc-name">Dr. Xyz ' +
                '<svg class="bk-verified" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#1a9e54"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
                '<div class="bk-doc-spec">MDS &ndash; Pediatric Dentist</div>' +
                '<div class="bk-tags"><span>Dentist</span><span>Pediatric Dentistry</span><span>Dental Surgery</span></div>' +
                '<div class="bk-norate">No ratings yet</div>' +
              '</div>' +
            '</div>' +
            '<div class="bk-fee">' +
              '<small>Consultation</small><b>&#8377;100</b><small>at this clinic</small>' +
              '<span class="bk-inclinic">In-clinic</span>' +
              '<a class="bk-profile" href="./contact">View profile</a>' +
            '</div>' +
          '</div>' +
          '<div class="bk-ch-line">Consulting hours at Dental Clinic</div>' +
          '<div class="bk-ch-line2"><b>Mon &ndash; Sat</b><span>09:00 AM &ndash; 01:30 PM</span></div>' +
          '<div class="bk-slotbox">' +
            '<div class="bk-days-row">' +
              '<button class="bk-nav" id="bkPrev" type="button" aria-label="Previous days">&#8249;</button>' +
              '<div class="bk-days" id="bkDays"></div>' +
              '<button class="bk-nav" id="bkNext" type="button" aria-label="Next days">&#8250;</button>' +
            '</div>' +
            '<div class="bk-group"><h4>Morning</h4><div class="bk-slots" id="bkMorning"></div></div>' +
            '<div class="bk-group"><h4>Afternoon</h4><div class="bk-slots" id="bkAfternoon"></div></div>' +
          '</div>' +
          '<div class="bk-confirm" id="bkConfirm" hidden>' +
  '<div><small>Selected slot</small><b id=\"bkSelText\"></b></div>' +
  '<button class=\"bk-go\" id=\"bkGo\" type=\"button\"><span>Confirm Appointment</span><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 17L17 7M17 7H8M17 7v9\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button>' +
'</div>' +
'<div class=\"bk-done\" id=\"bkDone\" hidden>' +
  '<div class=\"bk-check\"><svg width=\"34\" height=\"34\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"#1a9e54\"/><path d=\"M8 12.5l2.7 2.7L16 9.5\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></div>' +
  '<h3>Appointment Confirmed!</h3>' +
  '<p id=\"bkDoneText\"></p>' +
  '<button class=\"bk-new\" id=\"bkNew\" type=\"button\">Choose another slot</button>' +
'</div>' +
          '<p class=\"bk-note\">Ratings and reviews shown belong to the doctor across DocIndia &mdash; they are not a rating of Dental Clinic.</p>' +
        '</div>' +
      '</div>'
    );
  }

  /* --- slot picker state --- */
  var bkDays = [];
  var bkSelectedDay = 0;
  var bkSelectedSlot = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmtTime(h, m) {
    var ap = h >= 12 ? 'pm' : 'am';
    var hh = h % 12; if (hh === 0) hh = 12;
    return pad(hh) + ':' + pad(m) + ' ' + ap;
  }
  function fmtTime12(h, m) {
    var ap = h >= 12 ? 'PM' : 'AM';
    var hh = h % 12; if (hh === 0) hh = 12;
    return pad(hh) + ':' + pad(m) + ' ' + ap;
  }

  function buildDays() {
    var names = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var today = new Date();
    bkDays = [];
    for (var i = 0; i < 14; i++) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      var isSun = d.getDay() === 0;
      bkDays.push({
        date: d,
        dow: names[d.getDay()],
        num: d.getDate(),
        iso: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()),
        slots: isSun ? 0 : 18
      });
    }
    bkSelectedDay = 0;
    if (bkDays[0].slots === 0) bkSelectedDay = 1;
  }

  function slotTimes() {
    var times = [];
    var h, m;
    for (h = 9; h <= 11; h++) { for (m = 0; m < 60; m += 15) times.push([h, m, 'm']); }
    for (h = 12; h <= 13; h++) { for (m = 0; m < 60; m += 15) { if (h === 13 && m > 15) break; times.push([h, m, 'a']); } }
    return times;
  }

  function isBooked(dayIdx, slotIdx) {
    return ((dayIdx * 7 + slotIdx * 13) % 7 === 0);
  }

  function renderDays() {
    var box = document.getElementById('bkDays');
    if (!box) return;
    var html = '';
    for (var i = 0; i < bkDays.length; i++) {
      (function (i) {
        var d = bkDays[i];
        var cls = 'bk-day' + (i === bkSelectedDay ? ' sel' : '') + (d.slots === 0 ? ' empty' : '');
        var sub = d.slots === 0 ? 'No slots' : d.slots + ' slots';
        html += '<button type="button" class="' + cls + '" data-day="' + i + '"' + (d.slots === 0 ? ' disabled' : '') + '>' +
          '<span class="bk-dow">' + d.dow + '</span><span class="bk-dnum">' + d.num + '</span>' +
          '<span class="bk-dsub">' + sub + '</span></button>';
      })(i);
    }
    box.innerHTML = html;
    var btns = box.querySelectorAll('[data-day]');
    for (var k = 0; k < btns.length; k++) {
      btns[k].addEventListener('click', function () {
        bkSelectedDay = parseInt(this.getAttribute('data-day'), 10);
        bkSelectedSlot = null;
        renderDays();
        renderSlots();
      });
    }
  }

  function renderSlots() {
    var mBox = document.getElementById('bkMorning');
    var aBox = document.getElementById('bkAfternoon');
    if (!mBox || !aBox) return;
    var times = slotTimes();
    var mHtml = '', aHtml = '';
    for (var i = 0; i < times.length; i++) {
      var t = times[i];
      var label = fmtTime(t[0], t[1]);
      var booked = isBooked(bkSelectedDay, i);
      var sel = bkSelectedSlot === i ? ' sel' : '';
      var b = '<button type="button" class="bk-slot' + sel + '" data-slot="' + i + '"' + (booked ? ' disabled' : '') + '>' + label + '</button>';
      if (t[2] === 'm') mHtml += b; else aHtml += b;
    }
    mBox.innerHTML = mHtml;
    aBox.innerHTML = aHtml;
    var all = mBox.querySelectorAll('[data-slot]');
    var all2 = aBox.querySelectorAll('[data-slot]');
    var bind = function (btn) {
      btn.addEventListener('click', function () {
        bkSelectedSlot = parseInt(this.getAttribute('data-slot'), 10);
        var tt = slotTimes()[bkSelectedSlot];
        var timeEl = document.getElementById('bkTime');
        var dateEl = document.getElementById('bkDate');
        var docEl = document.getElementById('bkDoctor');
        if (timeEl) {
          timeEl.value = fmtTime12(tt[0], tt[1]);
          timeEl.classList.remove('bk-flash');
          void timeEl.offsetWidth;
          timeEl.classList.add('bk-flash');
        }
        if (dateEl) dateEl.value = bkDays[bkSelectedDay].iso;
        if (docEl) docEl.value = 'Dr. Xyz';
        renderSlots();
      });
    };
    for (var a = 0; a < all.length; a++) bind(all[a]);
    for (var c = 0; c < all2.length; c++) bind(all2[c]);
    updateConfirm();
  }

  function bindBooking() {
    var prev = document.getElementById('bkPrev');
    var next = document.getElementById('bkNext');
    var days = document.getElementById('bkDays');
    if (prev && days) prev.addEventListener('click', function () { days.scrollBy({ left: -220, behavior: 'smooth' }); });
    if (next && days) next.addEventListener('click', function () { days.scrollBy({ left: 220, behavior: 'smooth' }); });

    var form = document.getElementById('bkForm');
    if (form && !form.dataset.bound) {
      form.dataset.bound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var err = document.getElementById('bkError');
        var get = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
        var name = get('bkName'), phone = get('bkPhone'), email = get('bkEmail'),
            date = get('bkDate'), doc = get('bkDoctor'), svc = get('bkService'),
            time = get('bkTime'), msg = get('bkMsg');
        var problems = [];
        if (name.length < 2) problems.push('full name');
        if (phone.replace(/\D/g, '').length < 7) problems.push('phone number');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push('email');
        if (!date) problems.push('preferred date');
        if (!doc) problems.push('doctor');
        if (!svc) problems.push('service');
        if (!time) problems.push('time slot (pick one below)');
        if (msg.length < 2) problems.push('message');
        if (problems.length) {
          err.hidden = false;
          err.textContent = 'Please complete: ' + problems.join(', ') + '.';
          err.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        err.hidden = true;
        var d = new Date(date + 'T00:00:00');
        var nice = d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        document.getElementById('bkSummary').textContent =
          name + ' — ' + svc + ' with ' + doc + ' on ' + nice + ' at ' + time + '. We will confirm shortly on ' + phone + '.';
        form.hidden = true;
        var s = document.getElementById('bkSuccess');
        s.hidden = false;
        s.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
    var again = document.getElementById('bkAgain');
    if (again && !again.dataset.bound) {
      again.dataset.bound = '1';
      again.addEventListener('click', function () {
        var form2 = document.getElementById('bkForm');
        form2.reset();
        var docEl = document.getElementById('bkDoctor');
        if (docEl) docEl.value = 'Dr. Xyz';
        bkSelectedSlot = null;
        renderSlots();
        document.getElementById('bkSuccess').hidden = true;
        form2.hidden = false;
      });
    }
  }

  function updateConfirm() {
    var bar = document.getElementById('bkConfirm');
    if (!bar || !bkDays.length) return;
    if (bkSelectedSlot === null || bkSelectedSlot === undefined) { bar.hidden = true; return; }
    var d = bkDays[bkSelectedDay], tt = slotTimes()[bkSelectedSlot];
    var nice = d.date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
    var label = document.getElementById('bkSelText');
    if (label) label.textContent = nice + ' \u00B7 ' + fmtTime12(tt[0], tt[1]);
    var done = document.getElementById('bkDone');
    if (done) done.hidden = true;
    bar.hidden = false;
  }

  function bindConfirm() {
    var go = document.getElementById('bkGo');
    if (go && !go.dataset.bound) {
      go.dataset.bound = '1';
      go.addEventListener('click', function () {
        if (bkSelectedSlot === null || bkSelectedSlot === undefined) return;
        var d = bkDays[bkSelectedDay], tt = slotTimes()[bkSelectedSlot];
        var nice = d.date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
        var p = document.getElementById('bkDoneText');
        if (p) p.textContent = 'Dr. Xyz \u00B7 ' + nice + ' at ' + fmtTime12(tt[0], tt[1]) + ' \u00B7 Consultation \u20B9 100 (pay at clinic). Please arrive 10 minutes early.';
        var done = document.getElementById('bkDone');
        if (done) { done.hidden = false; done.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      });
    }
    var nw = document.getElementById('bkNew');
    if (nw && !nw.dataset.bound) {
      nw.dataset.bound = '1';
      nw.addEventListener('click', function () {
        bkSelectedSlot = null;
        var done2 = document.getElementById('bkDone');
        if (done2) done2.hidden = true;
        renderSlots();
      });
    }
  }

  function ensureBooking() {
    if (document.querySelector('.bk-wrap')) return;
    var cta = document.querySelector('section[data-framer-name="CTA"]');
    var tmp = document.createElement('div');
    tmp.innerHTML = bookingHTML();
    var node = tmp.firstChild;
    if (cta) {
      var container = cta.querySelector('[data-framer-name="Container"]') || cta;
      container.appendChild(node);
    } else {
      var main = document.getElementById('main') || document.body;
      main.appendChild(node);
    }
    buildDays();
    renderDays();
    renderSlots();
    bindBooking();
    bindConfirm();
  }

  /* ---------- 4. FlavorFit visual tags ---------- */
  function ffTag() {
    var els = document.querySelectorAll('a, button');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.closest('.bk-wrap')) continue;
      if (el.classList.contains('ff-cta') || el.classList.contains('ff-nav-dark')) continue;
      var t = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (/^Book\s/i.test(t)) el.classList.add('ff-cta');
      else if (/^Contact us/i.test(t)) {
        // dark pill ONLY for the header nav button - footer links stay plain
        if (el.closest('nav')) el.classList.add('ff-nav-dark');
        else el.classList.remove('ff-nav-dark');
      }
    }
    var svc = document.querySelector('section[data-framer-name="Service Section"]');
    if (svc) {
      var sc = svc.querySelectorAll('[data-framer-name="Vertical Container"]');
      for (var a = 0; a < sc.length; a++) sc[a].classList.add('ff-card');
    }
    // NOTE: blog Columns intentionally NOT tagged ff-card - its radius/overflow
    // rules break the card's layered background (white panel artifact on hover)
    var about = document.querySelector('section[data-framer-name="About Section"]');
    if (about) {
      var st = about.querySelectorAll('[data-framer-name="Statistic Item"]');
      for (var s2 = 0; s2 < st.length; s2++) st[s2].classList.add('ff-stat', 'ff-stat-' + ((s2 % 4) + 1));
    }
    var serials = document.querySelectorAll('[data-framer-name="Serial"]');
    for (var s = 0; s < serials.length; s++) {
      var tile = serials[s].parentElement, guard = 0;
      while (tile && guard < 4 && !tile.querySelector('[data-framer-name="Title"]')) {
        tile = tile.parentElement;
        guard++;
      }
      if (tile && !tile.classList.contains('ff-tile')) {
        tile.classList.add('ff-tile', 'ff-tile-' + ((s % 4) + 1));
      }
    }
  }

  /* ---------- 5. Stats count-up: 0 -> target every time scrolled into view ---------- */
  var STAT_TARGETS = [98, 5000, 96];

  function statNodes() {
    var item = document.querySelector('[data-framer-name="Statistic Item"]');
    if (!item) return [];
    var out = [];
    var kids = item.children;
    for (var i = 0; i < kids.length && i < STAT_TARGETS.length; i++) {
      var wrap = kids[i].querySelector('[data-framer-name="Wrapper"]');
      if (!wrap) continue;
      var h1s = wrap.querySelectorAll('h1');
      if (!h1s.length) continue;
      out.push({ idx: i, target: STAT_TARGETS[i] });
    }
    return out;
  }

  function statValue(idx) {
    var item = document.querySelector('[data-framer-name="Statistic Item"]');
    if (!item || !item.children[idx]) return null;
    var h1s = item.children[idx].querySelectorAll('[data-framer-name="Wrapper"] h1');
    if (!h1s.length) return null;
    return (h1s[h1s.length - 1].textContent || '').trim();
  }

  function statWrite(idx, val) {
    var item = document.querySelector('[data-framer-name="Statistic Item"]');
    if (!item || !item.children[idx]) return false;
    var h1s = item.children[idx].querySelectorAll('[data-framer-name="Wrapper"] h1');
    if (!h1s.length) return false;
    h1s[h1s.length - 1].textContent = val;
    return true;
  }

  var statToken = 0;
  function animateStat(idx, target, token, dur) {
    var t0 = null;
    function frame(ts) {
      if (token !== statToken) return;
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      if (!statWrite(idx, String(Math.round(target * e)))) return;
      if (p < 1) requestAnimationFrame(frame);
      else statWrite(idx, String(target));
    }
    statWrite(idx, '0');
    requestAnimationFrame(frame);
  }

  function watchStats() {
    var item = document.querySelector('[data-framer-name="Statistic Item"]');
    if (!item || item.dataset.statWatched || !window.IntersectionObserver) return;
    item.dataset.statWatched = '1';
    var busy = false;
    var io = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (!entries[k].isIntersecting || busy) continue;
        busy = true;
        var nodes = statNodes();
        if (!nodes.length) { busy = false; continue; }
        var first = statValue(nodes[0].idx);
        setTimeout(function () {
          var now = statValue(nodes[0].idx);
          var my = ++statToken;
          if (now === first) {
            // value static: Framer trigger dead or already final -> play our 0 -> N
            for (var i = 0; i < nodes.length; i++) animateStat(nodes[i].idx, nodes[i].target, my, 1600);
          }
          // else Framer is counting live right now -> let it finish, skip replay this entry
          setTimeout(function () { if (my === statToken) busy = false; }, 1800);
        }, 700);
      }
    }, { threshold: 0.4 });
    io.observe(item);
  }

  /* ---------- 6. Dental pins on mobile teeth image (restore desktop markings) ---------- */
  function ensureDentalPins() {
    var host = document.querySelector('.framer-1ozqpfs');
    if (!host || host.querySelector('.dental-pins')) return;
    var spots = [
      { n: '01', x: 30, y: 38, t: 'Cavities' },
      { n: '02', x: 71, y: 38, t: 'Gingivitis' },
      { n: '03', x: 26, y: 57, t: 'Plaque' },
      { n: '04', x: 74, y: 57, t: 'Sensitivity' },
      { n: '05', x: 36, y: 71, t: 'Crowding' },
      { n: '06', x: 60, y: 71, t: 'Staining' }
    ];
    host.style.position = 'relative';
    var wrap = document.createElement('div');
    wrap.className = 'dental-pins';
    wrap.setAttribute('aria-hidden', 'false');
    for (var i = 0; i < spots.length; i++) {
      (function (s) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dental-pin';
        b.style.left = s.x + '%';
        b.style.top = s.y + '%';
        b.textContent = s.n;
        b.title = s.t;
        b.setAttribute('aria-label', s.n + ' ' + s.t);
        b.addEventListener('click', function () {
          var sec = document.querySelector('section[data-framer-name="Section"]');
          if (!sec) return;
          var titles = sec.querySelectorAll('[data-framer-name="Title"]');
          for (var k = 0; k < titles.length; k++) {
            if ((titles[k].innerText || '').indexOf(s.t) !== -1) {
              titles[k].scrollIntoView({ behavior: 'smooth', block: 'center' });
              break;
            }
          }
        });
        wrap.appendChild(b);
      })(spots[i]);
    }
    host.appendChild(wrap);
  }

  /* ---------- run ---------- */
  var scheduled = false;
  function applyAll() {
    try {
      fixLinks();
      fixEmail();
      fixRights();
      fixTitle();
      fixCredit();
      ffTag();
      ensureBooking();
      ensureDentalPins();
      watchStats();
    } catch (e) { /* never break host page */ }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () { scheduled = false; applyAll(); }, 400);
  }

  applyAll();
  document.addEventListener('DOMContentLoaded', applyAll);
  window.addEventListener('load', applyAll);
  setTimeout(applyAll, 2000);
  setTimeout(applyAll, 5000);
  setTimeout(applyAll, 10000);
  if (window.MutationObserver) {
    new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
