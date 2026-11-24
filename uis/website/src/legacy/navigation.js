// Mobile menu behaviour (ported from Nexova_Public_Website/navigation.js).
// Call after the menu is in the DOM; returns a cleanup function.
export function initMobileMenus(root = document) {
  const controller = new AbortController();
  const { signal } = controller;
  const menus = [...root.querySelectorAll('[data-mobile-menu]')];

  menus.forEach((menu) => {
    const toggle = menu.querySelector('summary');

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.open = false;
      }, { signal });
    });

    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    }, { signal });

    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        toggle.focus();
      }
    }, { signal });
  });

  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener('change', ({ matches }) => {
    if (matches) menus.forEach((menu) => { menu.open = false; });
  }, { signal });

  return () => controller.abort();
}
