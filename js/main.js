// هذا الملف يدير سلوك الواجهة مثل القائمة والحركات البسيطة
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// فتح واغلاق القائمة في الجوال
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedHamburger = hamburger.contains(event.target);
    if (!clickedInsideMenu && !clickedHamburger) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

// اضافة ظل للهيدر عند النزول في الصفحة
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// تمييز رابط الصفحة الحالية في القائمة
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage);
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// تشغيل حركة بسيطة للعناصر عند ظهورها
const animationTargets = document.querySelectorAll('.card, .feature-card, .package-card, .testimonial-card');
if (animationTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
        }
      });
    },
    { threshold: 0.1 }
  );

  animationTargets.forEach((el) => observer.observe(el));
}

// تحريك عدادات الارقام
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
      return;
    }
    element.textContent = Math.floor(current);
  }, 16);
}

const statsSections = document.querySelectorAll('.stats-section');
if (statsSections.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('[data-count]').forEach((counter) => {
          animateCounter(counter, parseInt(counter.dataset.count, 10));
        });
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  statsSections.forEach((section) => counterObserver.observe(section));
}

// فتح سؤال واحد فقط في صفحة الاسئلة
const accordions = document.querySelectorAll('.accordion');
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accordion = button.parentElement;
    const isActive = accordion.classList.contains('active');
    accordions.forEach((acc) => acc.classList.remove('active'));
    if (!isActive) accordion.classList.add('active');
  });
});

// تخصيص رسائل التحقق في النماذج باللغة العربية
const forms = document.querySelectorAll('form');

function getArabicValidationMessage(field) {
  const fieldLabel = field.closest('.form-group')?.querySelector('label')?.textContent?.trim() || 'هذا الحقل';

  if (field.validity.valueMissing) {
    return `الرجاء تعبئة حقل ${fieldLabel}.`;
  }

  if (field.validity.typeMismatch) {
    if (field.type === 'email') {
      return 'الرجاء إدخال بريد إلكتروني صحيح.';
    }
    if (field.type === 'url') {
      return 'الرجاء إدخال رابط صحيح.';
    }
  }

  if (field.validity.patternMismatch) {
    return `الرجاء إدخال قيمة صحيحة في حقل ${fieldLabel}.`;
  }

  if (field.validity.tooShort) {
    return `الحد الأدنى لحقل ${fieldLabel} هو ${field.minLength} أحرف.`;
  }

  if (field.validity.tooLong) {
    return `الحد الأقصى لحقل ${fieldLabel} هو ${field.maxLength} حرفًا.`;
  }

  if (field.validity.rangeUnderflow) {
    return `القيمة في حقل ${fieldLabel} يجب ألا تقل عن ${field.min}.`;
  }

  if (field.validity.rangeOverflow) {
    return `القيمة في حقل ${fieldLabel} يجب ألا تزيد عن ${field.max}.`;
  }

  if (field.validity.badInput) {
    return `الرجاء إدخال قيمة صالحة في حقل ${fieldLabel}.`;
  }

  return '';
}

function getEnglishValidationMessage(field) {
  const fieldLabel = field.closest('.form-group')?.querySelector('label')?.textContent?.trim() || 'this field';

  if (field.validity.valueMissing) {
    return `Please fill out ${fieldLabel}.`;
  }

  if (field.validity.typeMismatch) {
    if (field.type === 'email') {
      return 'Please enter a valid email address.';
    }
    if (field.type === 'url') {
      return 'Please enter a valid URL.';
    }
  }

  if (field.validity.patternMismatch) {
    return `Please enter a valid value in ${fieldLabel}.`;
  }

  if (field.validity.tooShort) {
    return `The minimum length for ${fieldLabel} is ${field.minLength} characters.`;
  }

  if (field.validity.tooLong) {
    return `The maximum length for ${fieldLabel} is ${field.maxLength} characters.`;
  }

  if (field.validity.rangeUnderflow) {
    return `The value in ${fieldLabel} must be at least ${field.min}.`;
  }

  if (field.validity.rangeOverflow) {
    return `The value in ${fieldLabel} must not exceed ${field.max}.`;
  }

  if (field.validity.badInput) {
    return `Please enter a valid value in ${fieldLabel}.`;
  }

  return '';
}

function getValidationMessage(field) {
  const pageLanguage = document.documentElement.lang || 'ar';
  if (pageLanguage.startsWith('en')) {
    return getEnglishValidationMessage(field);
  }
  return getArabicValidationMessage(field);
}

forms.forEach((form) => {
  const fields = form.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    field.addEventListener('invalid', () => {
      field.setCustomValidity(getValidationMessage(field));
    });

    field.addEventListener('input', () => {
      field.setCustomValidity('');
    });

    field.addEventListener('change', () => {
      field.setCustomValidity('');
    });
  });
});
