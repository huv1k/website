function setupCopyButtons() {
  const buttons = document.querySelectorAll('.copy-code-button');

  buttons.forEach((button) => {
    if (button.hasAttribute('data-listener-attached')) {
      return;
    }

    button.setAttribute('data-listener-attached', 'true');

    button.addEventListener('click', async () => {
      const pre = button.closest('pre');
      if (!pre) return;

      const code = pre.querySelector('code');
      if (!code) return;

      const textContent = code.textContent || '';

      try {
        await navigator.clipboard.writeText(textContent);

        const copyIcon = button.querySelector('.copy-icon');
        const checkIcon = button.querySelector('.check-icon');

        if (copyIcon && checkIcon) {
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          button.setAttribute('data-copied', 'true');

          setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            button.setAttribute('data-copied', 'false');
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    });
  });
}

setupCopyButtons();

document.addEventListener('astro:page-load', () => {
  setupCopyButtons();
});
