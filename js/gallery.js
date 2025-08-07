import { typeAll, typeWriter } from './typewriter.js';
const galleryType = document.body.dataset.gallery;

const galleryItems = {art: [
  { src: "avocado-cave.jpg", title: "Avocado Cave" },
  { src: "big-bear-lake.jpg", title: "Big Bear Lake" },
  { src: "big-bear-lodge.jpg", title: "Big Bear Lodge" },
  { src: "crow.jpg", title: "Crow" },
  { src: "daabool.jpg", title: "Daabool" },
  { src: "final-boss.jpg", title: "Final Boss" },
  { src: "kasuga-lantern.jpg", title: "Kasuga Lantern" },
  { src: "amphitheater.jpg", title: "Amphitheater" },
  { src: "pink-land.jpg", title: "Pink Land" },
  { src: "tidepools.jpg", title: "Tidepools" },
  { src: "rachel.jpg", title: "Rachel" },
  { src: "stairs.jpg", title: "Stairs" },
  { src: "willow-tree.jpg", title: "Willow Tree" },
  { src: "wv-backyard.jpg", title: "Backyard" },
  { src: "dead-tree.jpg", title: "Dead Tree" },
], travel: [
  { src: "balboa-theater.jpg", title: "Balboa Theater"},
  { src: "big-bear-lake.jpg", title: "Big Bear Lake"},
  { src: "big-rock-in-yosemite.jpg", title: "Yosemite"},
  { src: "cedar-creek-falls.jpg", title: "Cedar Creek Falls"},
  { src: "chula-vista.jpg", title: "Chula Vista Streets"},
  { src: "half-dome.jpg", title: "Half Dome"},
  { src: "hoover-dam-bend.jpg", title: "Hoover Dam"},
  { src: "hoover-dam-bridge.jpg", title: "Hoover Daam"},
  { src: "hoover-dam.jpg", title: "Hoover Daaam!"},
  { src: "iron-mountain.jpg", title: "Iron Mountain"},
  { src: "la-mesa-secret-stairs.jpg", title: "La Mesa Secret Stairs"},
  { src: "lake-moraine.jpg", title: "Lake Moraine"},
  { src: "mesquite-dune-and-mountains.jpg", title: "Death Valley"},
  { src: "mesquite-sand-dunes.jpg", title: "Death Valley"},
  { src: "old-mission-dam.jpg", title: "Old Mission Dam"},
  // { src: "palm-trees-in-san-diego.jpg", title: ""},
  { src: "point-loma-lighthouse.jpg", title: "Point Loma"},
  { src: "qasr-al-harranah.jpg", title: "Qasr Al Harranah"},
  { src: "san-diego-skyline.jpg", title: "San Diego Skyline"},
  { src: "sun-rise-at-iron-mountain.jpg", title: "Iron Mountain"},
  { src: "sunrays-on-horizon.jpg", title: "Pacific Ocean"},
  { src: "top-ten-anime-characters.jpg", title: "Main Character"},
  { src: "ubehebe-crater.jpg", title: "Ubehebe Crater"},
],
};

const container = document.querySelector('.masonry');

const showImages = () => {
  galleryItems[galleryType].forEach((item, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'art-item';
    wrapper.style.animationDelay = `${i * 100}ms`;
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
  });
}

(async () => {
  await typeAll();
  await showImages();
})();
