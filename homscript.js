document.addEventListener('DOMContentLoaded', () => {
  const hearts = [];
  const body = document.body;
  const heartButtonContainer = document.getElementById('heart-button-container');
  const bottomButton = document.getElementById('bottom-button');
  const imageOverlay = document.getElementById('image-overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayDescription = document.getElementById('overlay-description');

  // Photo frame click handler
  function setupPhotoFrameListeners() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
      frame.addEventListener('click', () => {
        const img = frame.querySelector('img');
        const description = frame.dataset.description;
        
        overlayImage.src = img.src;
        overlayDescription.textContent = description;
        imageOverlay.style.display = 'flex';
      });
    });
  }

  // Close overlay when clicking anywhere on the overlay
  imageOverlay.addEventListener('click', (e) => {
    if (e.target === imageOverlay) {
      imageOverlay.style.display = 'none';
    }
  });

  // Existing heart creation function
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💜';

    // Randomize horizontal position near sides, but not completely at the edges
    const horizontalPosition = Math.random() < 0.5 
      ? `${Math.random() * 20}%`   // Left side
      : `${80 + Math.random() * 20}%`;  // Right side
    
    heart.style.left = horizontalPosition;
    heart.style.animationDuration = `${Math.random() * 5 + 3}s`;
    heart.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    
    body.appendChild(heart);
    hearts.push(heart);

    heart.addEventListener('animationend', () => {
      heart.remove();
      hearts.shift();

      // Check if hearts have reached 75 lines and button doesn't exist
      if (hearts.length >= 75 && !document.getElementById('heart-button')) {
        createHeartButton();
      }
    });
  }

  function createHeartButton() {
    const heartButton = document.createElement('button');
    heartButton.id = 'heart-button';
    heartButton.classList.add('heart-shaped-button');
    heartButton.innerHTML = 'Clique aqui';
    heartButton.addEventListener('click', () => {
      alert('Eu te amo! ❤️');
    });
    heartButtonContainer.appendChild(heartButton);
  }

  // Add click event to the bottom button
  bottomButton.addEventListener('click', () => {
    alert('Eu te amo! ❤️');
  });

  // Create hearts continuously without stopping
  setInterval(createHeart, 300);

  // Setup photo frame click listeners
  setupPhotoFrameListeners();
});