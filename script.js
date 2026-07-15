(function () {
  const stage = document.getElementById('stage');
  const chainLine = document.getElementById('chainLine');
  const bead = document.getElementById('bead');
  const stateValue = document.getElementById('stateValue');
  const hint = document.getElementById('hint');

  const REST_HEIGHT = 54;   // resting cord length, px
  const MAX_PULL = 60;      // how far the bead can be dragged, px
  const TOGGLE_THRESHOLD = 32; // how far you must pull before it counts

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isOn = false;
  let dragging = false;
  let startY = 0;
  let pulledBy = 0;
  let justToggledByDrag = false;

  function setChainHeight(px, animate) {
    chainLine.style.transition = animate
      ? `height ${prefersReducedMotion ? 150 : 480}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
      : 'none';
    chainLine.style.height = px + 'px';
  }

  function toggle() {
    isOn = !isOn;
    stage.classList.toggle('is-on', isOn);
    bead.setAttribute('aria-pressed', String(isOn));
    stateValue.textContent = isOn ? 'on' : 'off';
    if (hint && hint.style.opacity !== '0') hint.style.opacity = '0';
  }

  function onPointerDown(e) {
    dragging = true;
    startY = e.clientY;
    pulledBy = 0;
    bead.setPointerCapture(e.pointerId);
    setChainHeight(REST_HEIGHT, false);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const delta = e.clientY - startY;
    pulledBy = Math.min(Math.max(delta, 0), MAX_PULL);
    setChainHeight(REST_HEIGHT + pulledBy, false);
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    justToggledByDrag = pulledBy >= TOGGLE_THRESHOLD;
    if (justToggledByDrag) toggle();

    setChainHeight(REST_HEIGHT, true);
    pulledBy = 0;
  }

  // covers plain taps/clicks and keyboard activation (Enter / Space)
  function onClick() {
    if (justToggledByDrag) {
      justToggledByDrag = false;
      return;
    }
    setChainHeight(REST_HEIGHT + MAX_PULL * 0.7, true);
    window.setTimeout(() => {
      toggle();
      setChainHeight(REST_HEIGHT, true);
    }, prefersReducedMotion ? 60 : 220);
  }

  setChainHeight(REST_HEIGHT, false);
  bead.addEventListener('pointerdown', onPointerDown);
  bead.addEventListener('click', onClick);
})();