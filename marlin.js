
async function createSiteCard(url) {
  const card = document.createElement('a')
  card.className = 'requinSite'
  card.href = url
  card.target = '_blank'
  card.rel = 'noopener noreferrer'

  card.innerHTML = `
    <div class="requinSite__screenshot-wrap">
      <div class="requinSite__skeleton"></div>
    </div>
    <div class="requinSite__body">
      <div class="requinSite__header">
        <div class="requinSite__title">Chargement…</div>
      </div>
      <p class="requinSite__description"></p>
      <div class="requinSite__url">${url}</div>
    </div>
  `

  try {
    const endpoint = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=true`
    const res = await fetch(endpoint)
    const json = await res.json()

    if (json.status !== 'success') {
      throw new Error('Microlink a renvoyé une erreur')
    }

    const data = json.data
    const title = data.title || url
    const description = data.description || ''
    const screenshotUrl = data.screenshot?.url || ''
    const faviconUrl = data.logo?.url || data.publisher?.image?.url || ''

    card.innerHTML = `
      <div class="requinSite__screenshot-wrap">
        ${screenshotUrl
          ? `<img class="requinSite__screenshot" src="${screenshotUrl}" alt="Capture d'écran de ${title}" loading="lazy">`
          : `<div class="requinSite__skeleton"></div>`}
      </div>
      <div class="requinSite__body">
        <div class="requinSite__header">
        <h2 class="requinSite__title">${title}</h2>
        ${faviconUrl ? `<img class="requinSite__favicon" src="${faviconUrl}" alt="">` : ''}
        </div>
        <p class="requinSite__description">${description}</p>
        <div class="requinSite__url">${url}</div>
      </div>
    `
  } catch (err) {
    card.classList.add('requinSite--error')
    card.innerHTML = `
      <div class="requinSite__screenshot-wrap">
        <div class="requinSite__skeleton"></div>
      </div>
      <div class="requinSite__body">
        <div class="requinSite__header">
          <div class="requinSite__title">Impossible de charger l'aperçu</div>
        </div>
        <p class="requinSite__description">Vérifie l'URL ou réessaie plus tard.</p>
        <div class="requinSite__url">${url}</div>
      </div>
    `
  }

  return card
}

const urls = [
  'https://lintermediaire.be',
  'https://bedetectives.be',
  'https://cauchie.be',
  'https://ecolestremy.be',
  'https://mancreations.be',
  'https://astonmartinantwerp.com',
  'https://baixjardins.be',
  'https://chalets-durbuy.be',
  'https://chasal.be/foire2026',
  'https://cqfd-bw.be',
  'https://dev.setupco.be',
  'https://emploi.cndg.be',
  'https://lebruncommunication.be',
  'https://lelaitdechimay.be',
  'https://mijnpasfoto.be',
  'https://racletteparty.be',
  'https://tiny-josephine.com',
  'https://atelier-immobilier.be',
  'https://bougard.be',
  'https://bougard.be/sud/fr',
  'https://bymycarprivilege.fr',
  'https://campagne.avocats.be',
  'https://charleroi-entreprendre.be',
  'https://dev.setupco.be',
  'https://distriboissons.be',
  'https://hall-and.be',
  'https://immotoma.be',
  'https://infrastructure-construction.be',
  'https://kmk-africa.com',
  'https://louyet.com',
  'https://louyetcarr.be',
  'https://louyetrent.be',
  'https://msgroupe.com',
  'https://notflo.be',
  'https://o2max.be',
  'https://offresexclusives.koesio-be.com',
  'https://secufire.be',
]

const container = document.getElementById('cards')
urls.forEach(async (url) => {
  const card = await createSiteCard(url)
  container.appendChild(card)
})