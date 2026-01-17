<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Needs · Research Consortium Platform</title>
  <meta name="description" content="Needs — what problems, resources, or expertise are being sought in the consortium." />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    :root{
      --bg:#0b0d12;
      --panel:#111522;
      --panel2:#0f1320;
      --text:#e9ecf2;
      --muted:#aab2c0;
      --line:rgba(255,255,255,.10);
      --line2:rgba(255,255,255,.16);

      --brand1:#7c3aed;
      --brand2:#22d3ee;

      --shadow: 0 18px 60px rgba(0,0,0,.45);
      --radius: 18px;
      --radius2: 14px;

      --max: 1080px;
    }

    *{ box-sizing:border-box; }
    html,body{ height:100%; }
    body{
      margin:0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      background:
        radial-gradient(900px 600px at 10% 10%, rgba(124,58,237,.18), transparent 55%),
        radial-gradient(900px 600px at 85% 20%, rgba(34,211,238,.14), transparent 55%),
        radial-gradient(700px 500px at 50% 95%, rgba(124,58,237,.10), transparent 55%),
        var(--bg);
      color: var(--text);
      line-height:1.6;
    }

    a{ color:inherit; text-decoration:none; }
    .wrap{ width:min(var(--max), calc(100% - 40px)); margin:0 auto; }

    /* Topbar */
    .topbar{
      position: sticky;
      top:0;
      z-index:10;
      background: rgba(11,13,18,.55);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--line);
    }
    .topbar__inner{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      padding: 14px 0;
    }
    .brand{
      display:flex;
      align-items:center;
      gap:10px;
      min-width: 220px;
    }
    .brand__mark{
      width: 14px;
      height: 14px;
      border-radius: 6px;
      background: linear-gradient(135deg, var(--brand1), var(--brand2));
      box-shadow: 0 0 0 4px rgba(124,58,237,.15);
    }
    .brand__name{
      font-weight:700;
      letter-spacing:.2px;
      font-size: .98rem;
      white-space:nowrap;
    }

    .nav{
      display:flex;
      gap:14px;
      flex-wrap:wrap;
      align-items:center;
      justify-content:center;
    }
    .nav a{
      color: var(--muted);
      font-weight:600;
      font-size:.92rem;
      padding:8px 10px;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: .18s ease;
    }
    .nav a:hover{
      color: var(--text);
      background: rgba(255,255,255,.04);
      border-color: var(--line);
    }
    .nav a.is-active{
      color: var(--text);
      background: rgba(255,255,255,.05);
      border-color: rgba(255,255,255,.18);
    }

    .topbar__cta{
      display:flex;
      gap:10px;
      align-items:center;
      justify-content:flex-end;
      min-width: 220px;
    }
    .btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      height: 38px;
      padding: 0 14px;
      border-radius: 12px;
      font-weight:700;
      font-size:.92rem;
      border: 1px solid var(--line2);
      background: rgba(255,255,255,.03);
      color: var(--text);
      transition:.18s ease;
      cursor:pointer;
      user-select:none;
    }
    .btn:hover{
      transform: translateY(-1px);
      border-color: rgba(255,255,255,.24);
      background: rgba(255,255,255,.05);
    }
    .btn--primary{
      border: 0;
      background: linear-gradient(135deg, rgba(124,58,237,.95), rgba(34,211,238,.95));
      color:#071018;
      box-shadow: 0 18px 45px rgba(124,58,237,.22);
    }
    .btn--primary:hover{ filter:saturate(1.05); }
    .btn--ghost{
      background: transparent;
      border-color: var(--line);
    }

    /* Page header */
    .page{
      padding: 34px 0 18px;
    }
    .pageHead{
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
      box-shadow: var(--shadow);
      overflow:hidden;
      position:relative;
    }
    .pageHead::before{
      content:"";
      position:absolute;
      inset:-2px;
      background:
        radial-gradient(700px 240px at 25% 0%, rgba(34,211,238,.20), transparent 55%),
        radial-gradient(700px 240px at 80% 0%, rgba(124,58,237,.20), transparent 55%);
      pointer-events:none;
      opacity:.7;
    }
    .pageHead > .inner{
      position:relative;
      padding: 22px 22px 18px;
    }
    .crumbs{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      align-items:center;
      color: var(--muted);
      font-weight:700;
      font-size:.86rem;
    }
    .crumbs a{ color: var(--muted); }
    .crumbs a:hover{ color: var(--text); }

    h1{
      margin: 10px 0 8px;
      font-size: 2.0rem;
      line-height:1.15;
      letter-spacing:-.4px;
    }
    .lead{
      margin:0;
      color: var(--muted);
      font-size: 1.02rem;
      max-width: 70ch;
    }

    .quickActions{
      margin-top: 14px;
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
    }

    /* Layout */
    .layout{
      margin-top: 14px;
      display:grid;
      grid-template-columns: 1fr 360px;
      gap: 14px;
      align-items:start;
    }

    /* Cards */
    .panel{
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: rgba(17,21,34,.45);
      padding: 16px;
      overflow:hidden;
      position:relative;
    }
    .panel::before{
      content:"";
      position:absolute;
      inset:-2px;
      background:
        radial-gradient(420px 140px at 10% 0%, rgba(124,58,237,.16), transparent 55%),
        radial-gradient(420px 140px at 90% 0%, rgba(34,211,238,.12), transparent 55%);
      opacity:.25;
      pointer-events:none;
    }
    .panel > *{ position:relative; }

    .panel h2{
      margin:0 0 8px;
      font-size: 1.15rem;
      letter-spacing:-.2px;
    }
    .panel p{
      margin:0 0 10px;
      color: var(--muted);
      font-size:.95rem;
    }

    .grid{
      display:grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 12px;
      margin-top: 12px;
    }
    .card{
      grid-column: span 6;
      border-radius: var(--radius2);
      border: 1px solid var(--line);
      background: rgba(17,21,34,.35);
      padding: 14px;
      transition: .18s ease;
      min-height: 120px;
    }
    .card:hover{
      transform: translateY(-2px);
      border-color: rgba(255,255,255,.22);
      background: rgba(17,21,34,.55);
    }
    .card h3{
      margin:0 0 6px;
      font-size: 1.0rem;
    }
    .card ul{
      margin:0;
      padding-left: 18px;
      color: var(--muted);
      font-size:.92rem;
    }
    .card li{ margin: 6px 0; }

    .hint{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
      color: var(--muted);
      font-size:.9rem;
      margin-top: 10px;
    }
    .tag{
      border:1px solid var(--line);
      background: rgba(255,255,255,.03);
      border-radius: 999px;
      padding: 6px 10px;
      font-weight:700;
    }

    /* Sidebar */
    .side{
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: rgba(17,21,34,.55);
      box-shadow: var(--shadow);
      padding: 16px;
    }
    .side h3{
      margin:0 0 10px;
      font-size: 1.02rem;
    }
    .side p{
      margin:0 0 12px;
      color: var(--muted);
      font-size:.93rem;
    }
    .side ol{
      margin:0;
      padding-left: 18px;
      color: var(--muted);
      font-size:.92rem;
    }
    .side li{ margin: 8px 0; }
    .kbd{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: .82rem;
      padding: 2px 6px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.03);
      color: var(--text);
    }

    /* Join CTA */
    .cta{
      margin-top: 14px;
      padding: 18px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(124,58,237,.20), rgba(34,211,238,.12));
      box-shadow: var(--shadow);
      position:relative;
      overflow:hidden;
    }
    .cta::before{
      content:"";
      position:absolute;
      inset:-2px;
      background: radial-gradient(700px 240px at 20% 30%, rgba(34,211,238,.16), transparent 60%);
      opacity:.6;
      pointer-events:none;
    }
    .cta__inner{
      position:relative;
      display:flex;
      gap:14px;
      align-items:center;
      justify-content:space-between;
      flex-wrap:wrap;
    }
    .cta h3{
      margin:0 0 4px;
      font-size: 1.1rem;
    }
    .cta p{
      margin:0;
      color: rgba(255,255,255,.86);
      font-weight:600;
      max-width: 70ch;
    }
    .cta__actions{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
    }

    /* Footer */
    footer{
      padding: 26px 0 46px;
      color: var(--muted);
      font-size: .9rem;
    }
    .footerCard{
      border-top: 1px solid var(--line);
      margin-top: 18px;
      padding-top: 14px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      flex-wrap:wrap;
    }
    .footerLinks{
      display:flex;
      gap:12px;
      flex-wrap:wrap;
      align-items:center;
    }
    .footerLinks a{
      color: var(--muted);
      font-weight:700;
      padding: 6px 8px;
      border-radius: 10px;
      border: 1px solid transparent;
    }
    .footerLinks a:hover{
      color: var(--text);
      border-color: var(--line);
      background: rgba(255,255,255,.03);
    }

    @media (max-width: 980px){
      .layout{ grid-template-columns: 1fr; }
      .brand, .topbar__cta{ min-width:auto; }
      .card{ grid-column: span 12; }
      h1{ font-size: 1.75rem; }
    }
  </style>
</head>

<body>
  <!-- Topbar -->
  <header class="topbar">
    <div class="wrap topbar__inner">
      <a class="brand" href="./contact.html" aria-label="Home">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__name">Research Consortium Platform</span>
      </a>

      <nav class="nav" aria-label="Primary navigation">
        <a class="is-active" href="./needs.html">Needs</a>
        <a href="./capabilities.html">Capabilities</a>
        <a href="./collaboration.html">Collaboration</a>
        <a href="./governance.html">Governance</a>
      </nav>

      <div class="topbar__cta">
        <a class="btn btn--ghost" href="./contact.html#how">How it works</a>
        <a class="btn btn--primary" href="#join">Join</a>
      </div>
    </div>
  </header>

  <main class="wrap page">
    <!-- Page header -->
    <section class="pageHead">
      <div class="inner">
        <div class="crumbs">
          <a href="./contact.html">Home</a>
          <span aria-hidden="true">›</span>
          <span>Needs</span>
        </div>

        <h1>Needs</h1>
        <p class="lead">
          Post what you’re looking for—datasets, expertise, equipment access, clinical partners, funding gaps, replication help, or pilot participants.
          Keep it concrete, time-bounded, and easy to respond to.
        </p>

        <div class="quickActions">
          <a class="btn btn--primary" href="#post">Post a need</a>
          <a class="btn" href="#examples">See examples</a>
        </div>

        <div class="hint" aria-label="Tags">
          <span class="tag">BCI</span>
          <span class="tag">EEG / iEEG</span>
          <span class="tag">Neural decoding</span>
          <span class="tag">Clinical</span>
          <span class="tag">Hardware</span>
        </div>
      </div>
    </section>

    <!-- Main layout -->
    <section class="layout" id="post">
      <!-- Main panel -->
      <div class="panel">
        <h2>How to write a good “Need”</h2>
        <p>Use this structure so others can answer quickly.</p>

        <div class="grid" id="examples">
          <div class="card">
            <h3>1) Title + outcome</h3>
            <ul>
              <li>“Need: EEG dataset for SSVEP benchmark (500+ subjects)”</li>
              <li>State the target metric / deliverable</li>
              <li>Give a deadline if real</li>
            </ul>
          </div>

          <div class="card">
            <h3>2) Context</h3>
            <ul>
              <li>1–2 sentences: what project & why now</li>
              <li>Current status (pilot / IRB / prototype)</li>
              <li>Constraints (device type, sampling rate, etc.)</li>
            </ul>
          </div>

          <div class="card">
            <h3>3) What you need</h3>
            <ul>
              <li>Data / tool / facility / participant access</li>
              <li>Expertise: ML, signal processing, clinical, hardware</li>
              <li>Quantity + format + acceptance criteria</li>
            </ul>
          </div>

          <div class="card">
            <h3>4) What you offer</h3>
            <ul>
              <li>Authorship / acknowledgement expectations</li>
              <li>Funding / compute / lab time / co-dev support</li>
              <li>Clear next step (call, email, issue)</li>
            </ul>
          </div>
        </div>

        <div style="margin-top:14px;">
          <h2>Where to post (current MVP)</h2>
          <p>
            For now we keep “Needs” as a living GitHub document so it’s transparent and versioned.
            In Step 3 we’ll make this smoother (form-like UX + structured fields).
          </p>

          <div class="quickActions">
            <a class="btn btn--primary" href="./needs.md">Open needs.md</a>
            <a class="btn" href="https://github.com/zhouzixuan602-dev/zhouzixuan602-dev.github.io" target="_blank" rel="noreferrer">
              View repository
            </a>
          </div>

          <p style="margin-top:10px; color:var(--muted); font-size:.92rem;">
            Tip: If you’re editing in GitHub, use short sections and bullet points. Think “issue template”, not a paper.
          </p>
        </div>

        <!-- Join CTA -->
        <section class="cta" id="join" aria-label="Join call to action">
          <div class="cta__inner">
            <div>
              <h3>Join the consortium</h3>
              <p>
                Share your needs or capabilities and let the network match you to collaborators.
                We’ll start with a simple email-based intake, then evolve into structured forms.
              </p>
            </div>

            <div class="cta__actions">
              <a class="btn btn--primary"
                 href="mailto:zhouzixuan602@gmail.com?subject=Need%20posted%20-%20Research%20Consortium&body=Hi%20Zixuan%2C%0A%0AI%20want%20to%20post%20a%20Need.%0A%0ATitle%3A%0ADeadline%3A%0AContext%3A%0AWhat%20I%20need%3A%0AWhat%20I%20offer%3A%0AContact%3A%0A%0AThanks!">
                Email this need
              </a>
              <a class="btn" href="./contact.html">Back to home</a>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer>
          <div class="footerCard">
            <div>
              <b>Open by default</b> · Co-development over competition · Built on GitHub Pages
            </div>
            <div class="footerLinks">
              <a href="https://github.com/zhouzixuan602-dev/zhouzixuan602-dev.github.io" target="_blank" rel="noreferrer">Repository</a>
              <a href="./contact.html#modules">Modules</a>
              <a href="#join">Join</a>
            </div>
          </div>
        </footer>
      </div>

    <!-- Sidebar -->
<aside class="side" aria-label="Posting checklist">
  <h3>Posting checklist</h3>

  <p>
    Write your post like an <strong>actionable task</strong> — it greatly improves matching and follow-up.
  </p>

  <ol>
    <li>
      One-sentence title with a <strong>clear outcome</strong>
    </li>
    <li>
      Specify <span class="kbd">Inputs</span> / <span class="kbd">Outputs</span> / <span class="kbd">Acceptance criteria</span>
    </li>
    <li>
      State your <strong>availability</strong> and preferred response channel
    </li>
    <li>
      Clarify what you can offer (authorship, funding, resources, access)
    </li>
  </ol>

  <p style="margin-top:12px;">
    Next (Step&nbsp;3): we will turn <code>needs.md</code> into a more
    <em>form-like experience</em> — while keeping it open, versioned, and auditable.
  </p>
</aside>
