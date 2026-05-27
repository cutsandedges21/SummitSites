"""
JARVIS HUD Theme for graphify graph.html
Usage:
    python apply_theme.py                         # graph.html -> graph_themed.html
    python apply_theme.py input.html output.html
"""

import json
import re
import sys
from pathlib import Path

# ── Palette ────────────────────────────────────────────────────────────────────
CYAN        = "#00d4ff"
CYAN_BRIGHT = "#00f5ff"
CYAN_DIM    = "#005f75"
CYAN_GLOW   = "rgba(0,212,255,0.4)"
BG          = "#010d14"
BG2         = "#020f1a"
ORANGE      = "#ff6b00"
GOLD        = "#ffb300"
TEXT        = "#b0eeff"
TEXT_DIM    = "rgba(176,238,255,0.55)"
BORDER      = "rgba(0,212,255,0.28)"
BORDER_HI   = "rgba(0,212,255,0.75)"

# One vivid neon per community — saturated, all glow nicely on black
COMMUNITY_PALETTE = [
    "#00d4ff",  # 0  primary cyan
    "#ff6b00",  # 1  Stark orange
    "#e8002d",  # 2  red alert
    "#00ffcc",  # 3  mint plasma
    "#7b2fff",  # 4  violet reactor
    "#00ff88",  # 5  neon green
    "#ff00cc",  # 6  plasma magenta
    "#ffe000",  # 7  arc gold
    "#00bfff",  # 8  deep sky
    "#c0ff00",  # 9  radar lime
    "#0080ff",  # 10 electric blue
    "#ff4466",  # 11 hot coral
    "#40ffb0",  # 12 arctic teal
    "#ff8800",  # 13 amber
    "#8080ff",  # 14 indigo pulse
    "#00ffe0",  # 15 ice aqua
]

FONTS_TAG = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Orbitron:wght@400;600;700;900&'
    'family=Share+Tech+Mono&'
    'family=Rajdhani:wght@300;400;500;600&display=swap" rel="stylesheet">'
)


# ── Step 1: patch RAW_NODES + LEGEND color data in-place ──────────────────────

def patch_node_data(html: str) -> str:
    """Rewrite RAW_NODES colors by community id before vis.js reads them."""

    def replace_nodes(m):
        nodes = json.loads(m.group(1))
        for n in nodes:
            cid = n.get("community", 0)
            col = COMMUNITY_PALETTE[cid % len(COMMUNITY_PALETTE)]
            n["color"] = {
                "background": col,
                "border":     col,
                "highlight":  {"background": "#ffffff", "border": col},
                "hover":      {"background": col,       "border": "#ffffff"},
            }
            old_font = n.get("font", {})
            n["font"] = {
                "size":        old_font.get("size", 12),
                "color":       "#c8f0ff",
                "face":        "Share Tech Mono, monospace",
                "strokeWidth": 3,
                "strokeColor": BG,
            }
        return "const RAW_NODES = " + json.dumps(nodes, separators=(",", ":")) + ";"

    html = re.sub(
        r"const RAW_NODES = (\[.*?\]);",
        replace_nodes,
        html,
        flags=re.DOTALL,
    )

    def replace_legend(m):
        legend = json.loads(m.group(1))
        for item in legend:
            cid = item.get("cid", 0)
            item["color"] = COMMUNITY_PALETTE[cid % len(COMMUNITY_PALETTE)]
        return "const LEGEND = " + json.dumps(legend, separators=(",", ":")) + ";"

    html = re.sub(
        r"const LEGEND = (\[.*?\]);",
        replace_legend,
        html,
        flags=re.DOTALL,
    )
    return html


# ── Step 2: patch vis.Network options inline ──────────────────────────────────

def patch_network_options(html: str) -> str:
    """Replace the existing vis.Network() options with JARVIS HUD options."""

    replacement = r"""new vis.Network(container, { nodes: nodesDS, edges: edgesDS }, {
  physics: {
    enabled: true,
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -80,
      centralGravity: 0.006,
      springLength: 140,
      springConstant: 0.06,
      damping: 0.5,
      avoidOverlap: 1.0,
    },
    stabilization: { iterations: 250, fit: true },
  },
  interaction: {
    hover: true,
    tooltipDelay: 80,
    hideEdgesOnDrag: false,
    navigationButtons: false,
    keyboard: false,
  },
  nodes: {
    shape: 'dot',
    borderWidth: 1.5,
    borderWidthSelected: 3,
    shadow: { enabled: true, size: 20, x: 0, y: 0 },
  },
  edges: {
    color: { color: 'rgba(0,212,255,0.30)', highlight: '#00f5ff', hover: '#00d4ff' },
    width: 1.2,
    smooth: { type: 'continuous', roundness: 0.2 },
    selectionWidth: 3,
    shadow: { enabled: true, color: 'rgba(0,212,255,0.25)', size: 8, x: 0, y: 0 },
  },
})"""

    html = re.sub(
        r"new vis\.Network\(container,\s*\{[^}]+\},\s*\{.*?\}\s*\);",
        replacement,
        html,
        flags=re.DOTALL,
    )
    return html


# ── Step 3: patch afterDrawing to remove fill, only draw glow rings ───────────

def patch_after_drawing(html: str) -> str:
    """Replace the hyperedge afterDrawing block — keep it but make it JARVIS-style."""

    new_block = """network.on('afterDrawing', function(ctx) {
    // No hyperedges to draw — canvas stays clean.
});"""

    html = re.sub(
        r"network\.on\('afterDrawing'.*?\}\s*\}\s*\}\s*\)\s*;\s*</script>",
        new_block + "\n</script>",
        html,
        flags=re.DOTALL,
    )
    return html


# ── Step 4: inject node-shadow JS after stabilisation ────────────────────────

SHADOW_JS = """
<script id="jarvis-node-shadows">
// Apply per-node glowing shadow matching each node's community colour.
// Runs after stabilisation so the DataSet is fully populated.
(function waitForNetwork() {
  // vis.js exposes the Network instance on the container element
  var container = document.getElementById('graph');
  var net = container && container.__vis_network__;

  // Fallback: read from a globally-scoped var (works if page uses `var`)
  if (!net && typeof network !== 'undefined') net = network;

  if (!net) {
    // Try the container's internal reference (vis-network v9 stores it here)
    var divs = document.querySelectorAll('#graph');
    for (var i = 0; i < divs.length; i++) {
      var keys = Object.keys(divs[i]);
      for (var k = 0; k < keys.length; k++) {
        if (keys[k].startsWith('__vis') || keys[k].startsWith('_vis')) {
          net = divs[i][keys[k]]; break;
        }
      }
      if (net) break;
    }
  }

  if (!net || !net.body || !net.body.data || !net.body.data.nodes) {
    setTimeout(waitForNetwork, 200);
    return;
  }

  var updates = [];
  net.body.data.nodes.forEach(function(node) {
    var col = node.color && node.color.background ? node.color.background : '#00d4ff';
    updates.push({
      id: node.id,
      shadow: { enabled: true, color: col + 'cc', size: 22, x: 0, y: 0 },
    });
  });
  if (updates.length) net.body.data.nodes.update(updates);
})();
</script>
"""

# ── Step 5: CSS injection ─────────────────────────────────────────────────────

CSS = f"""
<style id="jarvis-hud-theme">
/* ═══════════════════════════════════════════════════════════════════════════
   JARVIS HUD — Stark Industries Knowledge Graph
   ═══════════════════════════════════════════════════════════════════════════ */

*, *::before, *::after {{ box-sizing: border-box; }}

html, body {{
  margin: 0; padding: 0;
  background: {BG} !important;
  color: {TEXT} !important;
  font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
  font-size: 14px;
  letter-spacing: 0.03em;
}}

/* ── Scan-line veil ──────────────────────────────────────────────────────── */
body::before {{
  content: '';
  position: fixed; inset: 0; z-index: 9998; pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px, transparent 2px,
    rgba(0,212,255,0.016) 2px, rgba(0,212,255,0.016) 4px
  );
  animation: scanMove 10s linear infinite;
}}
@keyframes scanMove {{
  to {{ background-position: 0 400px; }}
}}

/* ── Corner bracket HUD ──────────────────────────────────────────────────── */
body::after {{
  content: '';
  position: fixed; inset: 10px; z-index: 9997; pointer-events: none;
  background:
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) top    left  / 36px 2px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) top    left  / 2px 36px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) top    right / 36px 2px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) top    right / 2px 36px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) bottom left  / 36px 2px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) bottom left  / 2px 36px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) bottom right / 36px 2px no-repeat,
    linear-gradient({CYAN_BRIGHT},{CYAN_BRIGHT}) bottom right / 2px 36px no-repeat;
  animation: cornerBreathe 4s ease-in-out infinite alternate;
}}
@keyframes cornerBreathe {{
  from {{ opacity: 0.55; }}
  to   {{ opacity: 1.0;  filter: drop-shadow(0 0 5px {CYAN_BRIGHT}); }}
}}

/* ── Graph canvas ────────────────────────────────────────────────────────── */
#graph, .vis-network {{
  background:
    radial-gradient(ellipse at 35% 45%, rgba(0,100,160,0.14) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 65%, rgba(0,50,90,0.18)  0%, transparent 50%),
    {BG} !important;
}}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
#sidebar {{
  background: linear-gradient(180deg, #000f1e 0%, {BG} 100%) !important;
  border-left: 1px solid {BORDER} !important;
  width: 280px;
}}

/* ── Search ──────────────────────────────────────────────────────────────── */
#search-wrap {{ border-bottom: 1px solid {BORDER} !important; }}

#search {{
  background: rgba(0,212,255,0.05) !important;
  border: 1px solid {BORDER} !important;
  color: {TEXT} !important;
  font-family: 'Share Tech Mono', monospace !important;
  font-size: 12px !important;
  border-radius: 2px !important;
  outline: none !important;
  letter-spacing: 0.06em;
}}
#search::placeholder {{ color: {TEXT_DIM} !important; }}
#search:focus {{
  border-color: {CYAN_BRIGHT} !important;
  box-shadow: 0 0 8px {CYAN_GLOW} !important;
}}

#search-results {{ border-bottom: 1px solid {BORDER} !important; }}
.search-item {{ font-family: 'Share Tech Mono', monospace !important; font-size: 11px !important; color: {TEXT} !important; border-radius: 2px !important; }}
.search-item:hover {{ background: rgba(0,212,255,0.1) !important; }}

/* ── Info panel ──────────────────────────────────────────────────────────── */
#info-panel {{
  border-bottom: 1px solid {BORDER} !important;
  border-left: 3px solid {CYAN} !important;
}}
#info-panel h3 {{
  font-family: 'Orbitron', monospace !important;
  color: {CYAN} !important;
  font-size: 10px !important;
  letter-spacing: 0.2em !important;
  text-shadow: 0 0 8px {CYAN_GLOW};
}}
#info-content {{
  font-family: 'Rajdhani', sans-serif !important;
  color: {TEXT} !important;
  font-size: 13px !important;
}}
#info-content b {{ color: {CYAN_BRIGHT} !important; }}
#info-content .empty {{ color: {TEXT_DIM} !important; font-style: normal !important; font-family: 'Share Tech Mono', monospace !important; font-size: 11px !important; }}
.neighbor-link {{
  font-family: 'Share Tech Mono', monospace !important;
  font-size: 11px !important;
  color: {TEXT} !important;
  border-radius: 1px !important;
}}
.neighbor-link:hover {{ background: rgba(0,212,255,0.1) !important; }}

/* ── Legend ──────────────────────────────────────────────────────────────── */
#legend-wrap {{ border: none !important; }}
#legend-wrap h3 {{
  font-family: 'Orbitron', monospace !important;
  color: {CYAN} !important;
  font-size: 10px !important;
  letter-spacing: 0.2em !important;
  text-shadow: 0 0 8px {CYAN_GLOW};
}}

.legend-item {{
  font-family: 'Share Tech Mono', monospace !important;
  font-size: 11px !important;
  color: {TEXT} !important;
  border-radius: 2px !important;
  letter-spacing: 0.04em;
}}
.legend-item:hover {{ background: rgba(0,212,255,0.08) !important; }}
.legend-label {{ color: {TEXT} !important; }}
.legend-count  {{ color: {TEXT_DIM} !important; }}

/* ── Legend dot → HUD diamond indicator ─────────────────────────────────── */
.legend-dot {{
  width: 10px !important;
  height: 10px !important;
  border-radius: 2px !important;       /* square with slight rounding */
  transform: rotate(45deg) !important; /* diamond */
  flex-shrink: 0 !important;
  box-shadow: 0 0 6px currentColor, 0 0 12px currentColor !important;
  border: 1px solid rgba(255,255,255,0.4) !important;
}}

/* ── Checkboxes ──────────────────────────────────────────────────────────── */
.legend-cb, #select-all-cb {{
  appearance: none !important;
  -webkit-appearance: none !important;
  width: 13px !important;
  height: 13px !important;
  border: 1.5px solid {BORDER_HI} !important;
  border-radius: 2px !important;
  background: transparent !important;
  cursor: pointer !important;
  position: relative !important;
  flex-shrink: 0 !important;
}}
.legend-cb:checked, #select-all-cb:checked {{
  background: {CYAN} !important;
  border-color: {CYAN} !important;
  box-shadow: 0 0 6px {CYAN_GLOW} !important;
}}
.legend-cb:checked::after, #select-all-cb:checked::after {{
  content: '';
  position: absolute;
  left: 3px; top: 0px;
  width: 4px; height: 7px;
  border: solid {BG};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}}

#legend-controls label {{ color: {TEXT_DIM} !important; font-family: 'Share Tech Mono', monospace !important; font-size: 11px !important; }}
#legend-controls label:hover {{ color: {TEXT} !important; }}

/* ── Stats bar ───────────────────────────────────────────────────────────── */
#stats {{
  border-top: 1px solid {BORDER} !important;
  font-family: 'Share Tech Mono', monospace !important;
  font-size: 10px !important;
  color: {TEXT_DIM} !important;
  letter-spacing: 0.1em;
}}

/* ── Tooltip ─────────────────────────────────────────────────────────────── */
.vis-tooltip {{
  background: rgba(0,8,18,0.96) !important;
  border: 1px solid {CYAN} !important;
  color: {TEXT} !important;
  font-family: 'Share Tech Mono', monospace !important;
  font-size: 11px !important;
  border-radius: 2px !important;
  box-shadow: 0 0 14px {CYAN_GLOW} !important;
  padding: 7px 11px !important;
  letter-spacing: 0.05em;
}}

/* ── Scrollbars ──────────────────────────────────────────────────────────── */
::-webkit-scrollbar {{ width: 3px; background: {BG}; }}
::-webkit-scrollbar-thumb {{ background: {CYAN_DIM}; }}
::-webkit-scrollbar-thumb:hover {{ background: {CYAN}; }}

/* ── Top watermark ───────────────────────────────────────────────────────── */
#jv-wm {{
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 9996; pointer-events: none;
  font-family: 'Orbitron', monospace;
  font-size: 10px; font-weight: 900;
  letter-spacing: 0.4em; text-transform: uppercase;
  color: {CYAN}; text-shadow: 0 0 10px {CYAN_GLOW}, 0 0 24px {CYAN_GLOW};
  opacity: 0.7; white-space: nowrap;
}}

/* ── Bottom ticker ───────────────────────────────────────────────────────── */
#jv-tick {{
  position: fixed; bottom: 14px; left: 50%; transform: translateX(-50%);
  z-index: 9996; pointer-events: none;
  font-family: 'Share Tech Mono', monospace; font-size: 9px;
  color: {TEXT_DIM}; letter-spacing: 0.22em; text-transform: uppercase;
  white-space: nowrap; animation: tickAlpha 5s ease-in-out infinite alternate;
}}
@keyframes tickAlpha {{ from {{ opacity: 0.3; }} to {{ opacity: 0.7; }} }}

/* ── Arc reactor ─────────────────────────────────────────────────────────── */
#jv-arc {{
  position: fixed; bottom: 24px; right: 24px;
  width: 44px; height: 44px; z-index: 9996; pointer-events: none;
}}
#jv-arc::before {{
  content: ''; position: absolute; inset: 0; border-radius: 50%;
  border: 1.5px solid {CYAN};
  box-shadow: 0 0 10px {CYAN_GLOW}, inset 0 0 10px {CYAN_GLOW};
  animation: arcA 7s linear infinite;
}}
#jv-arc::after {{
  content: ''; position: absolute; inset: 10px; border-radius: 50%;
  border: 1.5px solid {GOLD}; opacity: 0.65;
  animation: arcA 3.5s linear infinite reverse;
}}
@keyframes arcA {{
  from {{ transform: rotate(0deg);   border-top-color: transparent; }}
  to   {{ transform: rotate(360deg); border-top-color: transparent; }}
}}

/* ── Ping dot ────────────────────────────────────────────────────────────── */
#jv-ping {{
  position: fixed; top: 22px; right: 20px;
  width: 7px; height: 7px; border-radius: 50%;
  background: {CYAN_BRIGHT}; box-shadow: 0 0 6px {CYAN_BRIGHT};
  z-index: 9997; animation: pingP 2s ease-in-out infinite; pointer-events: none;
}}
@keyframes pingP {{ 0%,100% {{ opacity: 1; transform: scale(1); }} 50% {{ opacity: 0.2; transform: scale(0.6); }} }}
</style>
"""

# ── Step 6: HUD overlay JS ────────────────────────────────────────────────────

HUD_JS = """
<script id="jarvis-hud-overlay">
(function () {
  function injectHUD() {
    if (document.getElementById('jv-wm')) return;

    function el(tag, id, text) {
      var d = document.createElement(tag);
      d.id = id;
      if (text) d.textContent = text;
      document.body.appendChild(d);
      return d;
    }

    el('div', 'jv-wm',   'STARK INDUSTRIES  ·  KNOWLEDGE GRAPH  ·  J.A.R.V.I.S.');
    el('div', 'jv-arc');
    el('div', 'jv-ping');

    var tick = el('div', 'jv-tick', '');
    var msgs = [
      'SYSTEM ONLINE  ·  THREAT LEVEL: NONE  ·  ALL SYSTEMS NOMINAL',
      'SCANNING NETWORK TOPOLOGY  ·  30 NODES  ·  31 EDGES MAPPED',
      'STARK TECH  ·  PROBABILITY ENGINE ACTIVE  ·  STANDING BY',
      'SUIT INTEGRITY: 100%  ·  ARC REACTOR: OPTIMAL  ·  READY',
      'ANALYSIS COMPLETE  ·  NO ANOMALIES DETECTED  ·  PROCEED',
    ];
    var mi = 0;
    tick.textContent = msgs[0];
    setInterval(function () { mi = (mi + 1) % msgs.length; tick.textContent = msgs[mi]; }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHUD);
  } else {
    injectHUD();
  }
})();
</script>
"""


# ── Transforms ────────────────────────────────────────────────────────────────

def inject_fonts(html: str) -> str:
    if "fonts.googleapis.com" not in html:
        html = html.replace("<head>", "<head>\n" + FONTS_TAG, 1)
    return html


def inject_css(html: str) -> str:
    html = re.sub(r'<style id="jarvis-hud-theme">.*?</style>', '', html, flags=re.DOTALL)
    return html.replace("</head>", CSS + "\n</head>", 1)


def inject_hud_js(html: str) -> str:
    html = re.sub(r'<script id="jarvis-hud-overlay">.*?</script>', '', html, flags=re.DOTALL)
    return html.replace("</body>", HUD_JS + "\n</body>", 1)


def inject_shadow_js(html: str) -> str:
    html = re.sub(r'<script id="jarvis-node-shadows">.*?</script>', '', html, flags=re.DOTALL)
    return html.replace("</body>", SHADOW_JS + "\n</body>", 1)


def patch_legend_dot_inline(html: str) -> str:
    """Replace the inline legend-dot background style with the JARVIS palette colour."""

    def replacer(m):
        # m.group(1) is the original colour like #4E79A7
        cid_match = re.search(r'"cid"\s*:\s*(\d+)', html[:m.start()])
        # Find which cid this legend dot belongs to by scanning backwards
        # from the match position to the nearest LEGEND item
        pos = m.start()
        preceding = html[:pos]
        cid_hits = list(re.finditer(r'"cid"\s*:\s*(\d+)', preceding))
        if cid_hits:
            cid = int(cid_hits[-1].group(1))
            col = COMMUNITY_PALETTE[cid % len(COMMUNITY_PALETTE)]
        else:
            col = m.group(1)  # fallback, keep original
        return f'style="background:{col}"'

    # This regex finds the inline style on legend dots generated by the JS
    # They are injected via JS so CSS is the reliable fix — we handle it in CSS
    return html


def set_title(html: str) -> str:
    def fix(m):
        t = m.group(1)
        return f"<title>J.A.R.V.I.S. // {t}</title>" if "J.A.R.V.I.S" not in t else m.group(0)
    return re.sub(r"<title>(.*?)</title>", fix, html, flags=re.IGNORECASE | re.DOTALL)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    src = Path(args[0]) if args else Path(__file__).parent / "graph.html"
    dst = Path(args[1]) if len(args) > 1 else src.parent / "graph_themed.html"

    print(f"[jarvis] Reading  : {src}")
    html = src.read_text(encoding="utf-8")
    n0 = len(html)

    html = patch_node_data(html)       # colours baked into RAW_NODES + LEGEND JSON
    html = patch_network_options(html) # vis.js physics / edge / node options
    html = patch_after_drawing(html)   # remove the indigo ellipse hyperedge overlay
    html = inject_fonts(html)
    html = inject_css(html)
    html = inject_shadow_js(html)      # apply per-node glow shadow after stabilisation
    html = inject_hud_js(html)         # HUD overlay elements
    html = set_title(html)

    dst.write_text(html, encoding="utf-8")
    print(f"[jarvis] Writing  : {dst}")
    print(f"[jarvis] +{len(html)-n0:,} bytes  ->  open file:///{dst.as_posix()}")


if __name__ == "__main__":
    main()
