import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { extensions as seedExtensions, manga as seedManga, type Extension, type Manga, type Status } from './data'
import './styles.css'

const nav = [
  { icon: '⌂', label: 'Overview' },
  { icon: '▤', label: 'My library' },
  { icon: '◷', label: 'Updates' },
  { icon: '✦', label: 'Extensions' },
]

const statusColors: Record<Status, string> = {
  Reading: 'purple',
  'Plan to read': 'gold',
  Completed: 'green',
  Paused: 'muted',
}

function Cover({ item, large = false }: { item: Manga; large?: boolean }) {
  return (
    <div className={`cover ${large ? 'cover-large' : ''}`} style={{ background: `linear-gradient(145deg, ${item.color}, #171827)` }}>
      <span className="cover-mark">M</span>
      <strong>{item.title}</strong>
      <small>{item.author}</small>
    </div>
  )
}

function App() {
  const [active, setActive] = useState('Overview')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'All' | Status>('All')
  const [toast, setToast] = useState('')
  const [exts, setExts] = useState<Extension[]>(seedExtensions)
  const [selected, setSelected] = useState<Manga>(seedManga[0])

  const filtered = useMemo(() => {
    return seedManga.filter((m) => {
      const matchesQuery = `${m.title} ${m.author} ${m.genres.join(' ')}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'All' || m.status === filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  const toggle = (name: string) => {
    setExts((current) => current.map((ext) => (ext.name === name ? { ...ext, enabled: !ext.enabled } : ext)))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">M</span>
          <span>MANGROVE</span>
        </div>

        <div className="side-label">Workspace</div>
        <nav className="nav">
          {nav.map((item) => (
            <button key={item.label} className={active === item.label ? 'active' : ''} onClick={() => setActive(item.label)}>
              <span>{item.icon}</span>
              {item.label}
              {item.label === 'Updates' && <b>3</b>}
            </button>
          ))}
        </nav>

        <div className="side-bottom">
          <div className="side-label">Your space</div>
          <button onClick={() => setToast('Collections are coming soon')}>
            <span>▦</span>Collections
          </button>
          <button onClick={() => setToast('Import your backup from Settings')}>
            <span>⇩</span>Import library
          </button>

          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>atharava205</strong>
              <small>Free plan</small>
            </div>
            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="breadcrumbs">
            Library <span>/</span> {active}
          </div>

          <div className="header-actions">
            <div className="search-box">
              <span>⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your library..." />
              <kbd>⌘ K</kbd>
            </div>
            <button className="icon-btn" onClick={() => setToast('No new notifications')}>♢</button>
            <button className="help-btn" onClick={() => setToast('Try enabling more sync sources')}>?</button>
          </div>
        </header>

        {active === 'Extensions' ? (
          <section className="extensions-section">
            <div className="extension-header">
              <div>
                <p className="eyebrow">SOURCE MARKETPLACE</p>
                <h1>Make your library <em>limitless.</em></h1>
                <p className="sub">Extensions connect Mangrove to the catalogs you trust.</p>
              </div>
              <button className="primary-btn">＋ Add extension</button>
            </div>

            <div className="section-head">
              <div>
                <h2>Installed extensions</h2>
                <p>{exts.filter((ext) => ext.enabled).length} active sources</p>
              </div>
              <button className="text-btn">Browse marketplace →</button>
            </div>

            <div className="extension-list">
              {exts.map((ext) => (
                <div className="extension-item" key={ext.name}>
                  <div className="extension-icon" style={{ background: ext.color }}>{ext.icon}</div>
                  <div className="extension-info">
                    <h3>
                      {ext.name}
                      <span>v{ext.version}</span>
                    </h3>
                    <p>{ext.description}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={ext.enabled} onChange={() => toggle(ext.name)} />
                    <i />
                  </label>
                </div>
              ))}
            </div>

            <div className="developer-card">
              <span className="dev-icon">⌘</span>
              <div>
                <h3>Build your own extension</h3>
                <p>Use the Mangrove adapter API to connect public catalog sources.</p>
              </div>
              <button className="secondary-btn">Read the docs →</button>
            </div>
          </section>
        ) : (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">MONDAY, SEPTEMBER 28, 2026</p>
                <h1>Good evening, <em>reader.</em></h1>
                <p className="sub">Your story continues here. Pick up where you left off.</p>
              </div>
              <button className="primary-btn" onClick={() => setToast('Opening your next chapter…')}>Continue reading <span>→</span></button>
            </section>

            <section className="stats-grid">
              <div>
                <span>Reading now</span>
                <strong>12</strong>
                <small className="up">↑ 2 this week</small>
              </div>
              <div>
                <span>Chapters read</span>
                <strong>284</strong>
                <small className="up">↑ 18 this week</small>
              </div>
              <div>
                <span>Library total</span>
                <strong>47</strong>
                <small>Across 3 extensions</small>
              </div>
              <div>
                <span>Reading streak</span>
                <strong>9 days</strong>
                <small className="fire">● Personal best</small>
              </div>
            </section>

            <section className="section-head">
              <div>
                <h2>{active === 'Updates' ? 'Recent updates' : active === 'My library' ? 'Your library' : 'Continue reading'}</h2>
                <p>{active === 'Updates' ? 'New chapters from your followed series.' : 'Jump back into your current series.'}</p>
              </div>
              <div className="filters">
                {(['All', 'Reading', 'Plan to read', 'Completed'] as const).map((f) => (
                  <button key={f} className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>
                    {f}
                  </button>
                ))}
              </div>
            </section>

            <div className="manga-grid">
              {filtered.slice(0, 4).map((item) => (
                <article className="manga-card" key={item.id} onClick={() => setSelected(item)}>
                  <Cover item={item} />
                  <div className="card-body">
                    <div className="card-title">
                      <h3>{item.title}</h3>
                      <button onClick={() => setToast(`${item.title} saved to favorites`)}>♡</button>
                    </div>
                    <p className="author">{item.author}</p>
                    <div className="progress-row">
                      <span className={`pill ${statusColors[item.status]}`}>{item.status}</span>
                      <span>{item.read}/{item.chapters} ch.</span>
                    </div>
                    <div className="progress-bar">
                      <i style={{ width: `${(item.read / item.chapters) * 100}%` }} />
                    </div>
                    <div className="card-foot">
                      <span>Updated {item.updated}</span>
                      <span>★ {item.rating}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && <div className="empty-state">No manga found. Try a different search.</div>}

            <section className="reader-preview">
              <div>
                <p className="eyebrow">CURRENT LEAD</p>
                <h2>
                  {selected.title}
                  <em>Chapter {selected.read + 1}</em>
                </h2>
                <p>{selected.description}</p>
                <button className="secondary-btn" onClick={() => setToast(`Opening ${selected.title}...`)}>Open chapter →</button>
              </div>
              <div className="stacked-covers">
                {seedManga.slice(1, 4).map((item) => (
                  <Cover key={item.id} item={item} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
