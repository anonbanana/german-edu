/* =============================================================
   German Plus — interaksi situs
   ============================================================= */
(function () {
  'use strict';

  window.__gpJsReady = true;

  var HEADER = document.querySelector('.site-header');
  var NAV = document.getElementById('navMenu');
  var TOGGLE = document.querySelector('.nav-toggle');
  var WHATSAPP_NUMBER = '6282229809378';
  var EMAIL_ADDRESS = 'info@german-plus.com';

  /* ---------- Teks sesuai bahasa halaman (index.html = de, en.html = en) ---------- */
  var LANG = (document.documentElement.lang || 'de').toLowerCase().indexOf('en') === 0 ? 'en' : 'de';

  var M = LANG === 'id'
    ? {
        formIncomplete: 'Lengkapi kolom yang ditandai merah.',
        nameRequired: 'Masukkan nama Anda.',
        emailInvalid: 'Format email tidak benar.',
        contactRequired: 'Masukkan email atau nomor WhatsApp agar kami dapat menghubungi Anda.',
        messageRequired: 'Tulis pertanyaan Anda.',
        openingEmail: 'Membuka aplikasi email…',
        openingWhatsApp: 'Membuka WhatsApp…',
        greeting: 'Halo German Plus, saya ingin mengirim pertanyaan.',
        lName: 'Nama',
        lEmail: 'Email',
        lPhone: 'Telepon / WhatsApp',
        lInterest: 'Program diminati',
        lQuestion: 'Pertanyaan',
        subject: function (name) { return 'Pertanyaan dari ' + name + ' — german-plus.com'; }
      }
    : LANG === 'en'
    ? {
        formIncomplete: 'Please complete the fields marked in red.',
        nameRequired: 'Please enter your name.',
        emailInvalid: 'The e-mail format is not correct.',
        contactRequired: 'Please provide an e-mail or WhatsApp number so we can reach you.',
        messageRequired: 'Please write your question.',
        openingEmail: 'Opening your e-mail application…',
        openingWhatsApp: 'Opening WhatsApp…',
        greeting: 'Hello German Plus, I would like to send a question.',
        lName: 'Name',
        lEmail: 'E-mail',
        lPhone: 'Phone / WhatsApp',
        lInterest: 'Interested in',
        lQuestion: 'Question',
        subject: function (name) { return 'Question from ' + name + ' — german-plus.com'; }
      }
    : {
        formIncomplete: 'Bitte füllen Sie die rot markierten Felder aus.',
        nameRequired: 'Bitte geben Sie Ihren Namen ein.',
        emailInvalid: 'Das E-Mail-Format ist nicht korrekt.',
        contactRequired: 'Geben Sie E-Mail oder WhatsApp-Nummer an, damit wir Sie erreichen.',
        messageRequired: 'Schreiben Sie bitte Ihre Frage.',
        openingEmail: 'E-Mail-Programm wird geöffnet…',
        openingWhatsApp: 'WhatsApp wird geöffnet…',
        greeting: 'Hallo German Plus, ich möchte eine Frage senden.',
        lName: 'Name',
        lEmail: 'E-Mail',
        lPhone: 'Telefon / WhatsApp',
        lInterest: 'Interesse',
        lQuestion: 'Ihre Frage',
        subject: function (name) { return 'Ihre Frage von ' + name + ' — german-plus.com'; }
      };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tahun di footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Bayangan header saat scroll ---------- */
  var menuScrollY = 0;
  var closeMenu = function () {
    if (!NAV) return;
    NAV.classList.remove('is-open');
    if (TOGGLE) TOGGLE.setAttribute('aria-expanded', 'false');
  };

  var onScroll = function () {
    if (HEADER) HEADER.classList.toggle('is-stuck', window.scrollY > 8);
    // Tutup menu mobile ketika pengguna mulai menggulir halaman
    if (NAV && NAV.classList.contains('is-open') &&
        Math.abs(window.scrollY - menuScrollY) > 12) {
      closeMenu();
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  if (TOGGLE && NAV) {
    TOGGLE.addEventListener('click', function () {
      var open = NAV.classList.toggle('is-open');
      menuScrollY = window.scrollY;
      TOGGLE.setAttribute('aria-expanded', String(open));
    });

    NAV.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && NAV.classList.contains('is-open')) {
        closeMenu();
        TOGGLE.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* ---------- Ganti bahasa (DE <-> EN), posisi section dipertahankan ---------- */
  Array.prototype.slice.call(document.querySelectorAll('[data-lang-link]')).forEach(function (link) {
    link.addEventListener('click', function () {
      var base = link.getAttribute('href').split('#')[0];
      if (window.location.hash && window.location.hash.length > 1) {
        link.setAttribute('href', base + window.location.hash);
      }
    });
  });

  /* ---------- Scrollspy ---------- */
  var navLinks = NAV ? Array.prototype.slice.call(NAV.querySelectorAll('a[href^="#"]')) : [];
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Animasi reveal ----------
     Dilakukan lewat pengecekan posisi saat scroll (bukan IntersectionObserver)
     agar tidak ada elemen yang terlewat ketika halaman dijungkit cepat. */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  var revealPending = function () { return revealItems.length > 0; };

  var revealOnScroll = function () {
    if (!revealItems.length) return;
    var limit = window.innerHeight * 0.94;
    var still = [];
    for (var i = 0; i < revealItems.length; i++) {
      var el = revealItems[i];
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add('is-visible');
      } else {
        still.push(el);
      }
    }
    revealItems = still;
  };

  if (reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    revealItems = [];
  } else {
    var ticking = false;
    var requestReveal = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        revealOnScroll();
        ticking = false;
      });
    };

    revealOnScroll();
    window.addEventListener('scroll', requestReveal, { passive: true });
    window.addEventListener('resize', requestReveal);
    // Jaga-jaga: pastikan tidak ada elemen yang tersangkut tersembunyi
    window.addEventListener('load', function () {
      revealOnScroll();
      if (revealPending()) setTimeout(revealOnScroll, 600);
    });
  }

  /* ---------- Slot gambar: sembunyikan placeholder bila foto ada ---------- */
  Array.prototype.slice.call(document.querySelectorAll('img[data-fallback]')).forEach(function (img) {
    var slot = img.closest('.img-slot');
    if (!slot) return;

    var markLoaded = function () {
      if (img.naturalWidth > 0) {
        slot.classList.add('has-image');
      } else {
        img.classList.add('is-broken'); // file belum tersedia → tampilkan placeholder
      }
    };
    var markBroken = function () { img.classList.add('is-broken'); };

    if (img.complete) {
      // Sudah selesai dimuat (atau gagal) sebelum script ini berjalan
      img.naturalWidth > 0 ? markLoaded() : markBroken();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markBroken, { once: true });
    }
  });

  /* ---------- Formulir kontak ---------- */
  var form = document.getElementById('contactForm');
  var statusEl = document.getElementById('formStatus');

  if (form) {
    var setError = function (name, message) {
      var input = form.elements[name];
      var box = form.querySelector('[data-error-for="' + name + '"]');
      if (input && input.classList) input.classList.toggle('is-invalid', Boolean(message));
      if (box) box.textContent = message || '';
      return Boolean(message);
    };

    var buildMessage = function (data) {
      var lines = [
        M.greeting,
        '',
        M.lName + ': ' + data.name,
        M.lEmail + ': ' + (data.email || '-'),
        M.lPhone + ': ' + (data.phone || '-'),
        M.lInterest + ': ' + (data.interest.length ? data.interest.join('; ') : '-'),
        '',
        M.lQuestion + ':',
        data.message
      ];
      return lines.join('\n');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {
        name: (form.elements.name.value || '').trim(),
        email: (form.elements.email.value || '').trim(),
        phone: (form.elements.phone.value || '').trim(),
        message: (form.elements.message.value || '').trim(),
        interest: Array.prototype.slice
          .call(form.querySelectorAll('input[name="interest"]:checked'))
          .map(function (cb) { return cb.value; })
      };

      var invalid = false;
      invalid = setError('name', data.name ? '' : M.nameRequired) || invalid;

      var emailOk = !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      invalid = setError('email', emailOk ? '' : M.emailInvalid) || invalid;

      if (!data.email && !data.phone) {
        invalid = setError('email', M.contactRequired) || invalid;
      }

      invalid = setError('message', data.message ? '' : M.messageRequired) || invalid;

      if (invalid) {
        statusTone(M.formIncomplete, 'error');
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var channelBtn = e.submitter;
      var channel = channelBtn ? channelBtn.getAttribute('data-channel') : 'whatsapp';
      var text = buildMessage(data);

      if (channel === 'email') {
        var subject = M.subject(data.name);
        var mailto = 'mailto:' + EMAIL_ADDRESS +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(text);
        statusTone(M.openingEmail, 'ok');
        window.location.href = mailto;
      } else {
        var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
        statusTone(M.openingWhatsApp, 'ok');
        window.open(waUrl, '_blank', 'noopener');
      }
    });

    // Bersihkan error saat pengguna mengetik
    form.addEventListener('input', function (e) {
      var name = e.target && e.target.name;
      if (!name) return;
      setError(name, '');
      // Kolom e-mail juga menampung pesan "isi e-mail atau WhatsApp"
      if (name === 'phone') setError('email', '');
    });
  }

  function statusTone(message, tone) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-error', 'is-ok');
    if (tone) statusEl.classList.add(tone === 'error' ? 'is-error' : 'is-ok');
  }
})();
