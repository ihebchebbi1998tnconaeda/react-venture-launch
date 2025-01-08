export const playTickSound = () => {
  const audio = new Audio('/addedcart.mp3');
  audio.volume = 0.3;
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
};

export const playDropSound = () => {
  const audio = new Audio('/drop-sound.mp3');
  audio.volume = 0.3;
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
};