// load-content.js - Dynamically loads portfolio content from content.json
(function () {
  'use strict';

  function applyContent(data) {
    if (!data) return;

    // 1. Sidebar
    if (data.sidebar) {
      var brandEl = document.querySelector('.sidebar .navbar-brand');
      if (brandEl && data.sidebar.brand) brandEl.textContent = data.sidebar.brand;

      var footerEl = document.querySelector('.sidebar-footer');
      if (footerEl) {
        var socialHtml = '';
        if (data.sidebar.facebook) {
          socialHtml += '<a class="btn" href="' + data.sidebar.facebook + '" target="_blank"><i class="fab fa-facebook-f"></i></a> ';
        }
        if (data.sidebar.linkedin && data.sidebar.linkedin !== '#') {
          socialHtml += '<a class="btn" href="' + data.sidebar.linkedin + '" target="_blank"><i class="fab fa-linkedin-in"></i></a> ';
        }
        if (data.sidebar.github && data.sidebar.github !== '#') {
          socialHtml += '<a class="btn" href="' + data.sidebar.github + '" target="_blank"><i class="fab fa-github"></i></a> ';
        }
        if (data.sidebar.instagram && data.sidebar.instagram !== '#') {
          socialHtml += '<a class="btn" href="' + data.sidebar.instagram + '" target="_blank"><i class="fab fa-instagram"></i></a> ';
        }
        if (socialHtml) footerEl.innerHTML = socialHtml;
      }
    }

    // 2. Hire Me & CV
    var mailtoHref = 'mailto:' + (data.hireMe && data.hireMe.email ? data.hireMe.email : 'songzism@yahoo.com') +
      '?subject=Job%20Inquiry%20%2F%20Hiring&body=Hi%20Richard%2C%0A%0AWe%20are%20interested%20in%20working%20with%20you.%0A%0AProject%20%2F%20Position%20Details%3A%0A-%20Scope%20of%20work%3A%0A-%20Timeline%3A%0A-%20Budget%3A%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D';

    var hireMeTop = document.querySelector('.large-btn a[href^="mailto:"]');
    if (hireMeTop) hireMeTop.setAttribute('href', mailtoHref);

    var hireMeAbout = document.querySelector('.about a.btn[href^="mailto:"], .about a.btn[href="#"]');
    if (hireMeAbout) hireMeAbout.setAttribute('href', mailtoHref);

    if (data.hireMe && data.hireMe.cvLink) {
      var cvBtn = document.querySelector('.large-btn a[href*="drive.google"]');
      if (cvBtn) cvBtn.setAttribute('href', data.hireMe.cvLink);
    }

    // 3. About Section
    if (data.about) {
      var profileImg = document.getElementById('about-profile-img') || document.querySelector('.about .row:first-of-type img');
      if (profileImg && data.about.profileImage) profileImg.src = data.about.profileImage;

      var techImg = document.getElementById('about-tech-img') || document.querySelector('.about .row:nth-of-type(2) img');
      if (techImg && data.about.techSkillsImage) techImg.src = data.about.techSkillsImage;

      var bioP = document.getElementById('about-bio-text') || document.querySelector('.about .row:first-of-type .col-md-6.col-lg-7 p');
      if (bioP && data.about.bio) bioP.textContent = data.about.bio;

      var headingH4 = document.getElementById('about-heading-text') || document.querySelector('.about h4:first-of-type');
      if (headingH4 && data.about.heading) headingH4.textContent = data.about.heading;

      var subP = document.getElementById('about-subtext') || document.querySelector('.about .row:nth-of-type(2) .col-md-6.col-lg-7 p');
      if (subP && data.about.subText) subP.innerHTML = data.about.subText.replace(/\n\n/g, '<br><br>');
    }

    // 4. Skills
    if (Array.isArray(data.skills) && data.skills.length > 0) {
      var skillNameEls = document.querySelectorAll('.skills .skill-name');
      var progressBars = document.querySelectorAll('.skills .progress-bar');
      data.skills.forEach(function (sk, index) {
        if (skillNameEls[index]) {
          var pTags = skillNameEls[index].querySelectorAll('p');
          if (pTags[0]) pTags[0].textContent = sk.name;
          if (pTags[1]) pTags[1].textContent = sk.percent + '%';
        }
        if (progressBars[index]) {
          progressBars[index].setAttribute('aria-valuenow', sk.percent);
          progressBars[index].style.width = sk.percent + '%';
        }
      });
    }

    // 5. Contact Info
    if (data.contact) {
      var contactInfo = document.querySelector('.contact-info');
      if (contactInfo) {
        var userEl = contactInfo.querySelector('p:nth-child(1)');
        if (userEl && data.contact.name) userEl.innerHTML = '<i class="fa fa-user"></i>' + data.contact.name;

        var tagEl = contactInfo.querySelector('p:nth-child(2)');
        if (tagEl && data.contact.role) tagEl.innerHTML = '<i class="fa fa-tag"></i>' + data.contact.role;

        var emailEl = contactInfo.querySelector('p:nth-child(3)');
        if (emailEl && data.contact.email) {
          emailEl.innerHTML = '<i class="fa fa-envelope"></i><a href="mailto:' + data.contact.email + '">' + data.contact.email + '</a>';
        }

        var phoneEl = contactInfo.querySelector('p:nth-child(4)');
        if (phoneEl && data.contact.phone) {
          var cleanPhone = data.contact.phone.replace(/[^0-9+]/g, '');
          phoneEl.innerHTML = '<i class="fa fa-phone"></i><a href="tel:' + cleanPhone + '">' + data.contact.phone + '</a>';
        }

        var mapEl = contactInfo.querySelector('p:nth-child(5)');
        if (mapEl && data.contact.location) {
          mapEl.innerHTML = '<i class="fa fa-map-marker"></i>' + data.contact.location;
        }

        var contactSocial = contactInfo.querySelector('.social');
        if (contactSocial) {
          var cSocialHtml = '';
          if (data.contact.facebook) {
            cSocialHtml += '<a class="btn" href="' + data.contact.facebook + '" target="_blank"><i class="fab fa-facebook-f"></i></a> ';
          }
          if (data.contact.linkedin && data.contact.linkedin !== '#') {
            cSocialHtml += '<a class="btn" href="' + data.contact.linkedin + '" target="_blank"><i class="fab fa-linkedin-in"></i></a> ';
          }
          if (cSocialHtml) contactSocial.innerHTML = cSocialHtml;
        }
      }
    }

    // 6. Footer
    if (data.footer && data.footer.copyright) {
      var footerP = document.querySelector('.footer p');
      if (footerP) footerP.textContent = data.footer.copyright;
    }

    // 7. Portfolio (If dynamic list is provided)
    if (Array.isArray(data.portfolio) && data.portfolio.length > 0) {
      var portfolioContainer = document.querySelector('.portfolio-container');
      if (portfolioContainer) {
        var itemsHtml = '';
        data.portfolio.forEach(function (item) {
          itemsHtml += '<div class="col-lg-4 col-md-6 portfolio-item ' + (item.category || 'web-dev') + '">\n' +
            '  <div class="portfolio-wrap">\n' +
            '    <figure>\n' +
            '      <img src="' + item.image + '" class="img-fluid" alt="' + item.title + '">\n' +
            '      <a href="' + item.image + '" data-lightbox="portfolio" data-title="' + item.title + '" class="link-preview" title="Preview"><i class="fa fa-eye"></i></a>\n' +
            '      <a href="' + (item.url || '#') + '" target="_blank" class="link-details" title="More Details"><i class="fa fa-link"></i></a>\n' +
            '      <a class="portfolio-title" href="' + (item.url || '#') + '" target="_blank">' + item.title + '<span>' + (item.categoryLabel || 'Web Development') + '</span></a>\n' +
            '    </figure>\n' +
            '  </div>\n' +
            '</div>\n';
        });
        portfolioContainer.innerHTML = itemsHtml;

        // If Isotope is loaded, refresh layout
        if (window.jQuery && typeof jQuery.fn.isotope === 'function') {
          try {
            jQuery('.portfolio-container').isotope('reloadItems').isotope({ sortBy: 'original-order' });
          } catch (e) {
            // Isotope handles initial load in main.js
          }
        }
      }
    }
  }

  // Fetch content.json with cache buster
  fetch('content.json?v=' + Date.now())
    .then(function (res) {
      if (!res.ok) throw new Error('content.json not found');
      return res.json();
    })
    .then(function (data) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          applyContent(data);
        });
      } else {
        applyContent(data);
      }
    })
    .catch(function (err) {
      console.warn('Using default HTML content (content.json fetch note):', err.message);
    });
})();
