<!-- =========================
  PLAN MARATHON – OBJECTIF 3h10
  GitHub Pages ready • HTML+CSS only • No JS
========================= -->

<style>
:root{
  --bg: #ffffff; --fg:#111; --muted:#666; --border:#e5e7eb;
  --ef:#c8facc; --am:#add8ff; --seuil:#fff3b3; --vo2:#ffb3b3; --fun:#e7d1ff;
  --accent:#2563eb; --ok:#16a34a; --warn:#d97706; --danger:#dc2626;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0b0f14; --fg:#e6edf3; --muted:#9aa4ae; --border:#1f2937;
    --ef:#12371a; --am:#0d2e47; --seuil:#3b3006; --vo2:#3d1111; --fun:#2b1d3a;
    --accent:#60a5fa;
  }
}
.marathon-wrap{font: 16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji"; color:var(--fg); background:var(--bg); border:1px solid var(--border); border-radius:14px; padding:20px; box-shadow:0 6px 20px rgba(0,0,0,.05)}
h1,h2{margin:.2em 0 .6em}
.badge{display:inline-block; padding:.2em .6em; border-radius:999px; font-weight:700; font-size:.9em; border:1px solid var(--border)}
.badge.ef{background:var(--ef)} .badge.am{background:var(--am)}
.badge.seuil{background:var(--seuil)} .badge.vo2{background:var(--vo2)}
.badge.fun{background:var(--fun)}
.legend{display:flex; gap:.5rem; flex-wrap:wrap; margin:.6rem 0 1rem}
.card{border:1px solid var(--border); border-radius:12px; padding:12px; margin:.7rem 0; background:linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,.3));}
@media (prefers-color-scheme: dark){ .card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));} }
.small{color:var(--muted); font-size:.95em}

/* Filter bar (checkbox hack) */
.filters{display:flex; flex-wrap:wrap; gap:.6rem; align-items:center; margin:.8rem 0 1rem}
.filter{user-select:none; display:inline-flex; align-items:center; gap:.45rem; padding:.35rem .6rem; border:1px solid var(--border); border-radius:999px; cursor:pointer; transition:.15s transform}
.filter:hover{transform:translateY(-1px)}
.filters input{display:none}
.filter .dot{width:.8em; height:.8em; border-radius:50%}
.dot.ef{background:var(--ef)} .dot.am{background:var(--am)} .dot.seuil{background:var(--seuil)}
.dot.vo2{background:var(--vo2)} .dot.fun{background:var(--fun)}
.filters input:not(:checked)+.filter{opacity:.55}

/* Table */
.table{width:100%; border-collapse:separate; border-spacing:0; overflow:hidden; border-radius:14px; border:1px solid var(--border)}
.table th,.table td{padding:10px 12px; border-bottom:1px solid var(--border); vertical-align:top}
.table thead th{position:sticky; top:0; background:var(--bg); z-index:1; font-weight:800; text-transform:uppercase; letter-spacing:.02em; font-size:.85em}
.table tr:last-child td{border-bottom:none}
.tag{display:inline-flex; align-items:center; gap:.35rem; font-weight:700; padding:.25rem .55rem; border-radius:999px; border:1px solid var(--border)}
.tag.ef{background:var(--ef)} .tag.am{background:var(--am)}
.tag.seuil{background:var(--seuil)} .tag.vo2{background:var(--vo2)} .tag.fun{background:var(--fun)}
.session{border-radius:10px; padding:8px 10px; border:1px dashed transparent}
.session.ef{background:var(--ef)} .session.am{background:var(--am)}
.session.seuil{background:var(--seuil)} .session.vo2{background:var(--vo2)}
.session.fun{background:var(--fun)}

/* Hover coach tooltip */
.coach{position:relative; cursor:help; white-space:nowrap; border-bottom:1px dotted var(--muted)}
.coach:hover::after{
  content: attr(data-tip);
  position:absolute; left:0; top:100%; margin-top:.35rem;
  background:var(--bg); color:var(--fg); border:1px solid var(--border);
  padding:.45rem .6rem; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,.12);
  width:max-content; max-width:36ch; white-space:normal; z-index:2
}

/* Filtering logic */
#f-ef:not(:checked) ~ .plan .session.ef{opacity:.18}
#f-am:not(:checked) ~ .plan .session.am{opacity:.18}
#f-seuil:not(:checked) ~ .plan .session.seuil{opacity:.18}
#f-vo2:not(:checked) ~ .plan .session.vo2{opacity:.18}
#f-fun:not(:checked) ~ .plan .session.fun{opacity:.18}

/* Responsive */
@media (max-width:880px){
  .table th:nth-child(3), .table td:nth-child(3){display:none} /* cache Jour 2 sur petits écrans pour compacter */
}
@media (max-width:640px){
  .table thead{display:none}
  .table tr{display:block; border-bottom:1px solid var(--border); padding:12px}
  .table td{display:block; border:none; padding:6px 0}
  .mobile-h{font-weight:700; text-transform:uppercase; color:var(--muted); font-size:.8em}
}
</style>

<div class="marathon-wrap">

<h1>🏃 Plan Marathon 12 Semaines – Objectif <span class="coach" data-tip="Allure cible : 4:25–4:30/km, soit ≈3:10 sur marathon si nutrition/météo OK.">3h10</span></h1>

<div class="card">
  <strong>Allures de référence</strong><br>
  <span class="badge ef">EF 5:15–5:30/km</span>
  <span class="badge am">AM 4:25–4:30/km</span>
  <span class="badge seuil">Seuil 4:10–4:15/km</span>
  <span class="badge vo2">VO₂ 3:40–3:50/km</span>
  <span class="badge fun">Ludique = Fartlek / Côtes</span>
  <div class="small" style="margin-top:.4rem">🎯 Tendon d’Achille : 2×/sem <em>excentriques mollets</em> + 2×/sem <em>gainage/fessiers</em>. VFC basse = alléger EF ou décaler l’intense.</div>
</div>

<h2>🎛️ Filtres (clique pour (dé)cocher)</h2>
<div class="filters">
  <input id="f-ef" type="checkbox" checked>
  <label class="filter" for="f-ef"><span class="dot ef"></span> EF</label>

  <input id="f-am" type="checkbox" checked>
  <label class="filter" for="f-am"><span class="dot am"></span> AM</label>

  <input id="f-seuil" type="checkbox" checked>
  <label class="filter" for="f-seuil"><span class="dot seuil"></span> Seuil</label>

  <input id="f-vo2" type="checkbox" checked>
  <label class="filter" for="f-vo2"><span class="dot vo2"></span> VO₂</label>

  <input id="f-fun" type="checkbox" checked>
  <label class="filter" for="f-fun"><span class="dot fun"></span> Ludique</label>
</div>

<div class="plan">
<table class="table">
  <thead>
    <tr>
      <th>Semaine</th>
      <th>Jour 1 🟢 EF</th>
      <th>Jour 2 🔴 Fractionné / Ludique</th>
      <th>Jour 3 🟡🔵 Seuil / AM</th>
      <th>Jour 4 🏔️ Longue</th>
      <th>Coach 💬</th>
    </tr>
  </thead>

  <!-- ===== S1–S4 Base ===== -->
  <tr>
    <td><strong>S1</strong></td>
    <td><div class="session ef">45' EF</div></td>
    <td><div class="session vo2">6×400m @3:45/km • r90"</div></td>
    <td><div class="session am">2×10' @AM • r3' + EF 45'</div></td>
    <td><div class="session am">18 km</div></td>
    <td><span class="coach" data-tip="Démarre en contrôle. Technique + souffle. Si VFC basse, enlève 1×400m.">Calme et propre.</span></td>
  </tr>

  <tr>
    <td><strong>S2</strong></td>
    <td><div class="session ef">45' EF</div></td>
    <td><div class="session fun">Fartlek 5×2' rapide / 2' EF</div></td>
    <td><div class="session am">2×10' @AM • r3' + EF 45'</div></td>
    <td><div class="session am">18 km</div></td>
    <td><span class="coach" data-tip="Séance fun = relâche + variation d’allure.">Varie pour progresser.</span></td>
  </tr>

  <tr>
    <td><strong>S3</strong></td>
    <td><div class="session ef">50' EF</div></td>
    <td><div class="session vo2">6×400m @3:45/km • r90"</div></td>
    <td><div class="session am">2×12' @AM • r3' + EF 50'</div></td>
    <td><div class="session am">20 km (2×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Premiers blocs AM en longue : hydrate-toi tôt (toutes les 15').">AM en douceur.</span></td>
  </tr>

  <tr>
    <td><strong>S4</strong></td>
    <td><div class="session ef">50' EF</div></td>
    <td><div class="session fun">Côtes 8×30" fort / desc. EF</div></td>
    <td><div class="session am">2×12' @AM • r3' + EF 50'</div></td>
    <td><div class="session am">20 km (2×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Côtes = force/résilience. Reste propre en appuis pour l’Achille.">Force sans casser.</span></td>
  </tr>

  <!-- ===== S5–S8 Spécifique ===== -->
  <tr>
    <td><strong>S5</strong></td>
    <td><div class="session ef">50' EF</div></td>
    <td><div class="session vo2">5×1000m @3:45–3:50 • r2'</div></td>
    <td><div class="session am">3×12' @AM • r3' + EF 50–55'</div></td>
    <td><div class="session am">24 km (2×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Spécifique : mets en place ta routine de gels & boisson.">Routine course.</span></td>
  </tr>

  <tr>
    <td><strong>S6</strong></td>
    <td><div class="session ef">50' EF</div></td>
    <td><div class="session fun">Fartlek 10×1' rapide / 1' EF</div></td>
    <td><div class="session am">3×12' @AM • r3' + EF 50–55'</div></td>
    <td><div class="session am">24 km (2×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Vitesse courte = économie de course. Reste facile.">Économie ++</span></td>
  </tr>

  <tr>
    <td><strong>S7</strong></td>
    <td><div class="session ef">50' EF</div></td>
    <td><div class="session vo2">4×1200m @3:45–3:50 • r2'</div></td>
    <td><div class="session am">3×12–15' @AM • r3' + EF 55'</div></td>
    <td><div class="session am">26 km (2×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Monter le volume sans crispation. Si tiraillement, coupe 1 bloc.">Volume maîtrisé.</span></td>
  </tr>

  <tr>
    <td><strong>S8</strong></td>
    <td><div class="session ef">50–55' EF</div></td>
    <td><div class="session fun">Côtes 10×20" rapide / desc. EF</div></td>
    <td><div class="session am">3×15' @AM • r3' + EF 55'</div></td>
    <td><div class="session am">28 km (3×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Pic de charge : dors bien, ravitaille-toi, écoute VFC.">Pic contrôlé.</span></td>
  </tr>

  <!-- ===== S9–S10 Pic ===== -->
  <tr>
    <td><strong>S9</strong></td>
    <td><div class="session ef">50–55' EF</div></td>
    <td><div class="session fun">Fartlek 5×3' rapide / 2' EF</div></td>
    <td><div class="session am">3×15' @AM • r3' + EF 55'</div></td>
    <td><div class="session am">28–30 km (3×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Simulation course : tenue, gels, timing boissons.">Répétition générale.</span></td>
  </tr>

  <tr>
    <td><strong>S10</strong></td>
    <td><div class="session ef">50–55' EF</div></td>
    <td><div class="session vo2">4×1200m @3:45–3:50 • r2'</div></td>
    <td><div class="session am">3×15' @AM • r3' + EF 55'</div></td>
    <td><div class="session am">30 km (3×5 km @AM)</div></td>
    <td><span class="coach" data-tip="Dernier gros : confiance. Le travail est fait.">Confiance totale.</span></td>
  </tr>

  <!-- ===== S11–S12 Affûtage ===== -->
  <tr>
    <td><strong>S11</strong></td>
    <td><div class="session ef">40–45' EF</div></td>
    <td><div class="session fun">Fartlek 8×1' rapide / 1' EF</div></td>
    <td><div class="session am">2×10' @AM • r3' + EF 45'</div></td>
    <td><div class="session am">20 km</div></td>
    <td><span class="coach" data-tip="Fraîcheur>Volume. Allège si besoin, garde des jambes vives.">Fraîcheur d’abord.</span></td>
  </tr>

  <tr>
    <td><strong>S12</strong></td>
    <td><div class="session ef">40' EF</div></td>
    <td><div class="session vo2">4×400m @VO₂ • r90"</div></td>
    <td><div class="session am">2×10' @AM • r3' + EF 40'</div></td>
    <td><div class="session am">15 km progressif @AM</div></td>
    <td><span class="coach" data-tip="Sourire, confiance, respirations calmes. Prépare ton plan de course.">Prêt pour le jour J.</span></td>
  </tr>

</table>
</div>

<div class="card">
  <strong>Conseils course</strong>
  <ul>
    <li>Échauffement : 10' EF + mobilité à chaque séance.</li>
    <li>Longues : test <em>gels</em> toutes les 30–35', eau ttes 15'.</li>
    <li>Jour J : démarre <span class="badge am">+5–10s/km</span> les 5 premiers km puis cale à 4:25–4:30/km.</li>
    <li>VFC basse, chaleur ou tiraillement Achille : transforme l’intense en <span class="badge ef">EF</span> ou coupe 1 bloc. La constance gagne.</li>
  </ul>
</div>

<p class="small">Made with ❤️ pour ta prépa. Bon marathon !</p>
</div>
