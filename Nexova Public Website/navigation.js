(() => {
  'use strict';

  const menus = [...document.querySelectorAll('[data-mobile-menu]')];

  menus.forEach((menu) => {
    const toggle = menu.querySelector('summary');

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.open = false;
      });
    });

    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    });

    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        toggle.focus();
      }
    });
  });

  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener('change', ({matches}) => {
    if (matches) menus.forEach((menu) => { menu.open = false; });
  });
})();
