/**
 * Academic Reference: JavaScript DOM Manipulation & Event Handling (Weeks 4-5)
 * Course: Web Technologies Laboratory (CO2)
 */

export function demonstrateDomManipulation() {
  const container = document.createElement('div');
  container.className = 'catalogue-item';

  const heading = document.createElement('h3');
  heading.textContent = 'Dynamic Product Item';
  container.appendChild(heading);

  return container;
}

export function handleEventBubbling(parentEl, childEl, logCallback) {
  parentEl.addEventListener('click', (event) => {
    logCallback('Parent listener executed (Bubbling Phase)');
  }, false);

  childEl.addEventListener('click', (event) => {
    logCallback('Child element clicked');
  }, false);
}
