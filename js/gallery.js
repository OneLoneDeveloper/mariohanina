const galleryItems = [
  { src: "assets/images/art-photos/avocado-cave.jpg", title: "Avocado Cave" },
  { src: "assets/images/art-photos/big-bear-lake.jpg", title: "Big Bear Lake" },
  { src: "assets/images/art-photos/big-bear-lodge.jpg", title: "Big Bear Lodge" },
  { src: "assets/images/art-photos/crow.jpg", title: "Crow" },
  { src: "assets/images/art-photos/daabool.jpg", title: "Daabool" },
  { src: "assets/images/art-photos/final-boss.jpg", title: "Final Boss" },
  { src: "assets/images/art-photos/kasuga-lantern.jpg", title: "Kasuga Lantern" },
  { src: "assets/images/art-photos/lebanon-amphitheater.jpg", title: "Amphitheater" },
  { src: "assets/images/art-photos/pink-land.jpg", title: "Pink Land" },
  { src: "assets/images/art-photos/point-loma-tidepools.jpg", title: "Tidepools" },
  { src: "assets/images/art-photos/rachel.jpg", title: "Rachel" },
  { src: "assets/images/art-photos/stairs.jpg", title: "Stairs" },
  { src: "assets/images/art-photos/willow-tree.jpg", title: "Willow Tree" },
  { src: "assets/images/art-photos/wv-backyard.jpg", title: "Backyard" },
  { src: "assets/images/art-photos/dead-tree.jpg", title: "Dead Tree" },
];

const container = document.querySelector('.masonry');

const showImages = () => {
  galleryItems.forEach((item, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'art-item';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    img.loading = "lazy";

    img.addEventListener('click', () => {
      const full = document.createElement('div');
      full.className = 'fullscreen-img';
      full.innerHTML = `<img src="${img.src}">`;
      full.addEventListener('click', () => full.remove());
      document.body.append(full);
    });

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `“${item.title}”`;

    wrapper.appendChild(img);
    wrapper.appendChild(label);
    container.appendChild(wrapper);

    setTimeout(() => {
      document.querySelectorAll('.art-item').forEach((item, i) => {
        item.style.animationDelay = `${i * 150}ms`;
      });
    }, i * 150);
  });
}

(async () => {
  await typeWriter(document.querySelector("#back-link"), "<-- Go back");
  await typeWriter(document.querySelector("#heading-1"), "My Art Gallery");
  await showImages();
})();
