const galleryType = document.body.dataset.gallery;

const galleryItems = {art: [
  { src: "avocado-cave.jpg", title: "Avocado Cave" },
  { src: "big-bear-lake.jpg", title: "Big Bear Lake" },
  { src: "big-bear-lodge.jpg", title: "Big Bear Lodge" },
  { src: "crow.jpg", title: "Crow" },
  { src: "daabool.jpg", title: "Daabool" },
  { src: "final-boss.jpg", title: "Final Boss" },
  { src: "kasuga-lantern.jpg", title: "Kasuga Lantern" },
  { src: "lebanon-amphitheater.jpg", title: "Amphitheater" },
  { src: "pink-land.jpg", title: "Pink Land" },
  { src: "point-loma-tidepools.jpg", title: "Tidepools" },
  { src: "rachel.jpg", title: "Rachel" },
  { src: "stairs.jpg", title: "Stairs" },
  { src: "willow-tree.jpg", title: "Willow Tree" },
  { src: "wv-backyard.jpg", title: "Backyard" },
  { src: "dead-tree.jpg", title: "Dead Tree" },
], travel: [
  { src: "balboa-theater.jpg", title: ""},
  { src: "big-bear-lake.jpg", title: ""},
  { src: "big-rock-in-yosemite.jpg", title: ""},
  { src: "cedar-creek-falls.jpg", title: ""},
  { src: "chula-vista.jpg", title: ""},
  { src: "couple-on-half-dome.jpg", title: ""},
  { src: "hoover-dam-bend.jpg", title: ""},
  { src: "hoover-dam-bridge.jpg", title: ""},
  { src: "hoover-dam.jpg", title: ""},
  { src: "iron-mountain.jpg", title: ""},
  { src: "la-mesa-secret-stairs.jpg", title: ""},
  { src: "lake-moraine.jpg", title: ""},
  { src: "mesquite-dune-and-mountains.jpg", title: ""},
  { src: "mesquite-sand-dunes.jpg", title: ""},
  { src: "old-mission-dam.jpg", title: ""},
  { src: "palm-trees-in-san-diego.jpg", title: ""},
  { src: "point-loma-lighthouse.jpg", title: ""},
  { src: "qasr-al-harranah.jpg", title: ""},
  { src: "san-diego-skyline.jpg", title: ""},
  { src: "sun-rise-at-iron-mountain.jpg", title: ""},
  { src: "sunrays-on-horizon.jpg", title: ""},
  { src: "top-ten-anime-characters.jpg", title: ""},
  { src: "ubehebe-crater.jpg", title: ""},
],
};

const container = document.querySelector('.masonry');

const showImages = () => {
  galleryItems[galleryType].forEach((item, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'art-item';
    const img = document.createElement('img');
    img.src = `assets/images/${galleryType}-photos/${item.src}`;
    
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
        item.style.animationDelay = `${i * 100}ms`;
      });
    }, i * 150);
  });
}

// (async () => {
  // await showImages();
showImages();
// })();
