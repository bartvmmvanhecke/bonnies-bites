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
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) node.appendChild(c);
  return node;
}

async function renderIndex() {
  const data = await loadData();
  const mount = document.getElementById('categories');
  mount.innerHTML = '';

  for (const cat of CATEGORY_ORDER) {
    const color = data.categories[cat]?.color || '#333';
    const recipes = data.recipes.filter(r => r.category === cat);

    const block = el('div', { class: 'category-block' });
    const head = el('div', { class: 'category-head' });
    const dot = el('span', { class: 'category-dot', style: `--dot:${color}` }, [document.createTextNode(CATEGORY_ICON[cat] || '')]);
    head.appendChild(dot);
    head.appendChild(el('h2', {}, [document.createTextNode(cat.toLowerCase())]));
    head.appendChild(el('span', { class: 'category-count' }, [document.createTextNode(`${recipes.length} recept${recipes.length === 1 ? '' : 'en'}`)]));
    block.appendChild(head);

    if (recipes.length === 0) {
      block.appendChild(el('p', { class: 'empty-cat' }, [document.createTextNode('nog geen recepten in deze categorie')]));
    } else {
      const grid = el('div', { class: 'recipe-grid' });
      for (const r of recipes) {
        const card = el('a', { class: 'recipe-card', href: `recipe.html?slug=${r.slug}` });
        card.appendChild(el('span', { class: 'num', style: `--accent-card:${color}` }, [document.createTextNode(r.id)]));
        card.appendChild(el('h3', {}, [document.createTextNode(r.title.toLowerCase())]));
        card.appendChild(el('p', { class: 'desc' }, [document.createTextNode(r.description)]));
        grid.appendChild(card);
      }
      block.appendChild(grid);
    }
    mount.appendChild(block);
  }
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
  document.documentElement.style.setProperty('--accent', color);

  const panel = el('div', { class: 'title-panel' });
  const colorblock = el('div', { class: 'colorblock', style: `background:${color}` });
  colorblock.appendChild(el('span', { class: 'icon-watermark' }, [document.createTextNode(CATEGORY_ICON[r.category] || '')]));
  colorblock.appendChild(el('span', { class: 'id' }, [document.createTextNode(r.id)]));
  colorblock.appendChild(el('span', { class: 'cat' }, [document.createTextNode(`${CATEGORY_ICON[r.category] || ''} ${r.category}`)]));
  panel.appendChild(colorblock);
  const textblock = el('div', { class: 'textblock' });
  textblock.appendChild(el('h1', {}, [document.createTextNode(r.title.toLowerCase())]));
  textblock.appendChild(el('p', { class: 'description' }, [document.createTextNode(r.description)]));
  panel.appendChild(textblock);
  mount.appendChild(panel);

  const meta = el('div', { class: 'meta-strip' });
  for (const [label, val] of Object.entries(r.meta || {})) {
    const cell = el('div', {});
    cell.appendChild(el('div', { class: 'label' }, [document.createTextNode(label)]));
    cell.appendChild(el('div', { class: 'val' }, [document.createTextNode(val)]));
    meta.appendChild(cell);
  }
  mount.appendChild(meta);

  const ingSection = el('section', { class: 'block' });
  ingSection.appendChild(el('h2', {}, [document.createTextNode('ingrediënten')]));
  const table = el('table', { class: 'ingredients' });
  for (const ing of r.ingredients) {
    const row = el('tr');
    row.appendChild(el('td', {}, [document.createTextNode(ing.amount)]));
    row.appendChild(el('td', {}, [document.createTextNode(ing.naam)]));
    table.appendChild(row);
  }
  ingSection.appendChild(table);
  mount.appendChild(ingSection);

  const stepSection = el('section', { class: 'block' });
  stepSection.appendChild(el('h2', {}, [document.createTextNode('bereiding')]));
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
  mount.appendChild(stepSection);

  if (r.tips && r.tips.length) {
    const tipSection = el('section', { class: 'block' });
    tipSection.appendChild(el('h2', {}, [document.createTextNode('tips & variaties')]));
    const tipsWrap = el('div', { class: 'tips' });
    for (const t of r.tips) {
      const tip = el('div', { class: 'tip' });
      tip.appendChild(el('div', { class: 'label' }, [document.createTextNode(t.label)]));
      tip.appendChild(el('p', {}, [document.createTextNode(t.tekst)]));
      tipsWrap.appendChild(tip);
    }
    tipSection.appendChild(tipsWrap);
    mount.appendChild(tipSection);
  }

  mount.appendChild(el('a', { class: 'back-link', href: 'index.html' }, [document.createTextNode('← terug naar alle recepten')]));
}
