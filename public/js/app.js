const CATEGORY_ORDER = ["Ontbijt", "Hapjes", "Drank", "Voorgerecht", "Hoofdgerecht", "Dessert"];
const CATEGORY_ICON = {
  Ontbijt: "🥐",
  Hapjes: "🫒",
  Drank: "🥂",
  Voorgerecht: "🍽️",
  Hoofdgerecht: "🍲",
  Dessert: "🍮",
};

async function loadData() {
  const res = await fetch('data/recipes.json');
  return res.json();
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on')) node[k.toLowerCase()] = v;
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) node.appendChild(c);
  return node;
}

function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + Math.round(255 * percent)));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * percent)));
  const b = Math.max(0, Math.min(255, (n & 0xff) + Math.round(255 * percent)));
  return `rgb(${r},${g},${b})`;
}

function photoGradient(color) {
  return `linear-gradient(135deg, ${shade(color, 0.14)}, ${shade(color, -0.12)})`;
}

function recipeCard(r, color) {
  const card = el('button', { class: 'recipe-card', type: 'button' });

  const photo = el('div', { class: 'dish-photo', style: `background:${photoGradient(color)}` });
  if (r.meta?.moeilijkheid) {
    photo.appendChild(el('span', { class: `level-badge level-${r.meta.moeilijkheid}` }, [document.createTextNode(r.meta.moeilijkheid)]));
  }
  photo.appendChild(el('span', { class: 'watermark' }, [document.createTextNode(r.id)]));
  card.appendChild(photo);

  const row = el('div', { class: 'dish-row' });
  row.appendChild(el('h3', {}, [document.createTextNode(r.title)]));
  if (r.meta?.bereidingstijd) {
    row.appendChild(el('span', { class: 'time-badge' }, [document.createTextNode(r.meta.bereidingstijd)]));
  }
  card.appendChild(row);

  card.appendChild(el('p', { class: 'dish-desc' }, [document.createTextNode(r.description)]));

  const foot = el('div', { class: 'dish-foot' });
  foot.appendChild(el('span', {}, [document.createTextNode(`${CATEGORY_ICON[r.category] || ''} ${r.category}`.trim())]));
  if (r.meta?.porties) {
    foot.appendChild(el('span', { class: 'dot' }, [document.createTextNode('·')]));
    foot.appendChild(el('span', {}, [document.createTextNode(r.meta.porties)]));
  }
  card.appendChild(foot);

  return card;
}

async function renderIndex() {
  const data = await loadData();
  const app = document.getElementById('categories');
  app.innerHTML = '';

  const tabs = el('div', { class: 'filter-tabs' });
  const grid = el('div', { class: 'recipe-grid' });
  const empty = el('p', { class: 'empty-cat' }, [document.createTextNode('nog geen recepten in deze categorie')]);
  empty.style.display = 'none';

  function draw(activeCat) {
    grid.innerHTML = '';
    const recipes = activeCat ? data.recipes.filter(r => r.category === activeCat) : data.recipes;
    empty.style.display = recipes.length === 0 ? '' : 'none';
    for (const r of recipes) {
      const color = data.categories[r.category]?.color || '#333';
      grid.appendChild(recipeCard(r, color));
      grid.lastChild.onclick = () => navigate(r.slug);
    }
  }

  function setActive(btn) {
    tabs.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  }

  const allTab = el('button', { class: 'filter-tab is-active', type: 'button' }, [document.createTextNode('Alle gerechten')]);
  allTab.onclick = () => { setActive(allTab); draw(null); };
  tabs.appendChild(allTab);

  for (const cat of CATEGORY_ORDER) {
    const tab = el('button', { class: 'filter-tab', type: 'button' }, [document.createTextNode(cat)]);
    tab.onclick = () => { setActive(tab); draw(cat); };
    tabs.appendChild(tab);
  }

  app.appendChild(tabs);
  app.appendChild(grid);
  app.appendChild(empty);
  draw(null);
}

async function renderRecipe() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const data = await loadData();
  const r = data.recipes.find(x => x.slug === slug);
  const mount = document.getElementById('recipe-mount');

  if (!r) {
    mount.innerHTML = '<p style="padding:3rem 1.5rem;">Recept niet gevonden. <a href="index.html">Terug naar overzicht</a>.</p>';
    return;
  }

  const color = data.categories[r.category]?.color || '#333';
  document.title = `${r.title} — bonnie's bites`;
  document.documentElement.style.setProperty('--accent-cat', color);

  const wrap = el('div', { class: 'wrap' });

  const hero = el('div', { class: 'detail-hero' });
  const photo = el('div', { class: 'detail-photo', style: `background:${photoGradient(color)}` });
  if (r.meta?.moeilijkheid) {
    photo.appendChild(el('span', { class: `level-badge level-${r.meta.moeilijkheid}` }, [document.createTextNode(r.meta.moeilijkheid)]));
  }
  photo.appendChild(el('span', { class: 'watermark' }, [document.createTextNode(r.id)]));
  hero.appendChild(photo);

  const text = el('div', { class: 'detail-text' });
  text.appendChild(el('span', { class: 'cat-eyebrow' }, [document.createTextNode(`${CATEGORY_ICON[r.category] || ''} ${r.category}`.trim())]));
  text.appendChild(el('h1', {}, [document.createTextNode(r.title)]));
  text.appendChild(el('p', { class: 'description' }, [document.createTextNode(r.description)]));
  hero.appendChild(text);
  wrap.appendChild(hero);

  wrap.appendChild(el('button', { class: 'back-link', type: 'button', onClick: () => (window.location.href = 'index.html') }, [document.createTextNode('← terug naar alle recepten')]));

  const chips = el('div', { class: 'meta-chips' });
  for (const [label, val] of Object.entries(r.meta || {})) {
    const chip = el('div', { class: 'meta-chip' });
    chip.appendChild(el('div', { class: 'label' }, [document.createTextNode(label)]));
    chip.appendChild(el('div', { class: 'val' }, [document.createTextNode(val)]));
    chips.appendChild(chip);
  }
  wrap.appendChild(chips);

  const ingSection = el('section', { class: 'block' });
  ingSection.appendChild(el('h2', {}, [document.createTextNode('Ingrediënten')]));
  const table = el('table', { class: 'ingredients' });
  for (const ing of r.ingredients) {
    const row = el('tr');
    row.appendChild(el('td', {}, [document.createTextNode(ing.amount)]));
    row.appendChild(el('td', {}, [document.createTextNode(ing.naam)]));
    table.appendChild(row);
  }
  ingSection.appendChild(table);
  wrap.appendChild(ingSection);

  const stepSection = el('section', { class: 'block' });
  stepSection.appendChild(el('h2', {}, [document.createTextNode('Bereiding')]));
  const stepsWrap = el('div', { class: 'steps' });
  r.stappen.forEach((s, i) => {
    const step = el('div', { class: 'step' });
    step.appendChild(el('div', { class: 'n' }, [document.createTextNode(String(i + 1).padStart(2, '0'))]));
    const body = el('div');
    body.appendChild(el('h3', {}, [document.createTextNode(s.titel)]));
    body.appendChild(el('p', {}, [document.createTextNode(s.tekst)]));
    step.appendChild(body);
    stepsWrap.appendChild(step);
  });
  stepSection.appendChild(stepsWrap);
  wrap.appendChild(stepSection);

  if (r.tips && r.tips.length) {
    const tipSection = el('section', { class: 'block' });
    tipSection.appendChild(el('h2', {}, [document.createTextNode('Tips & variaties')]));
    const tipsWrap = el('div', { class: 'tips' });
    for (const t of r.tips) {
      const tip = el('div', { class: 'tip' });
      tip.appendChild(el('div', { class: 'label' }, [document.createTextNode(t.label)]));
      tip.appendChild(el('p', {}, [document.createTextNode(t.tekst)]));
      tipsWrap.appendChild(tip);
    }
    tipSection.appendChild(tipsWrap);
    wrap.appendChild(tipSection);
  }

  mount.appendChild(wrap);
}

function navigate(slug) {
  window.location.href = `recipe.html?slug=${slug}`;
}
