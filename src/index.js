const dragable = target => {
  if (!target) return;
  const previousOffset = { x: 0, y: 0 };
  let originMouseX;
  let originMouseY;
  const onMousemove = e => {
    const { pageX, pageY } = e;
    const x = pageX - originMouseX + previousOffset.x;
    const y = pageY - originMouseY + previousOffset.y;
    target.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onMouseup = e => {
    previousOffset.x += e.pageX - originMouseX;
    previousOffset.y += e.pageY - originMouseY;
    window.removeEventListener('pointermove', onMousemove);
    window.removeEventListener('pointerup', onMouseup);
  };
  const onMousedown = e => {
    originMouseX = e.pageX;
    originMouseY = e.pageY;
    window.addEventListener('pointermove', onMousemove);
    window.addEventListener('pointerup', onMouseup);
  };
  const effect = () => {
    cleanUp(); // clean up before attach;
    target.addEventListener('pointerdown', onMousedown);
  };
  const cleanUp = () => {
    target.removeEventListener('pointerdown', onMousedown);
    window.removeEventListener('pointerup', onMouseup);
    window.removeEventListener('pointermove', onMousemove);
  };
  return [effect, cleanUp];
};
export default dragable;
