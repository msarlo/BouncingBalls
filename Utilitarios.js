export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
export function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  }