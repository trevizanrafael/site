document.addEventListener('DOMContentLoaded', () => {
  const championCards = document.querySelectorAll('.champion-card');
  
  championCards.forEach(card => {
    card.addEventListener('click', () => {
      const wikiLink = card.getAttribute('data-wiki');
      if (wikiLink) {
        window.open(wikiLink, '_blank');
      }
    });
  });
});