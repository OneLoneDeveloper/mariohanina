// typeWriter function (type letters one by one)
const typeWriter = (element, txt, speed = 50, delay = 100) => new Promise(res => {
  let i = 0;
  const cursor = Object.assign(document.createElement("span"), { className: "blinking-cursor", textContent: "|" });
  element.append(cursor);
  (function type() {
    if (i < txt.length) {
      element.insertBefore(document.createTextNode(txt[i]), cursor);
      const ch = txt[i++];
      setTimeout(type, ch === "," ? speed * 5 : ch === "." ? speed * 10 : speed);
    } else {
      setTimeout(() => { cursor.remove(); res(); }, delay);
    }
  })();
});

// Animate all elements that have a data-typewriter attribute one by one.
async function typeAll() {
  const elements = document.querySelectorAll('[data-typewriter]');
  for (const el of elements) {
    const text = el.dataset.typewriter;
    await typeWriter(el, text, 30, 60);
  }
}

typeAll();