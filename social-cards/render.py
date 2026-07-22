#!/usr/bin/env python3
# 灵性社媒卡片批量生成器 (免费 · 纯 HTML+CSS+Chrome 截图)
# 用法: python render.py
# 依赖: Google Chrome 已安装 (脚本自动探测路径)
# 输入: quotes.csv (theme, headline, quote, credit, caption)
# 输出: output/<序号>-<slug>-ig.png / -pin.png  +  output/captions.txt

import csv, os, sys, subprocess, re

BASE = os.path.dirname(os.path.abspath(__file__))
TPL_DIR = os.path.join(BASE, "templates")
OUT_DIR = os.path.join(BASE, "output")
QUOTES = os.path.join(BASE, "quotes.csv")
CHROME = None

# 平台尺寸: IG = 1080x1350 (4:5), Pinterest = 1000x1500 (2:3)
SIZES = {"ig": (1080, 1350), "pin": (1000, 1500)}


def find_chrome():
    candidates = [
        r"C:/Program Files/Google/Chrome/Application/chrome.exe",
        r"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    try:
        out = subprocess.run(
            ["powershell.exe", "-NoProfile", "-Command",
             "(Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\chrome.exe' -ErrorAction Stop).'(Default)'"],
            capture_output=True, text=True, timeout=15)
        p = out.stdout.strip()
        if p and os.path.exists(p):
            return p
    except Exception:
        pass
    return None


def render(html_path, out_png, w, h):
    url = "file:///" + html_path.replace("\\", "/")
    out_win = out_png.replace("\\", "/")
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
         "--no-sandbox", "--virtual-time-budget=4000",
         "--window-size=%dx%d" % (w, h), "--screenshot=%s" % out_win, url],
        capture_output=True, text=True, timeout=90)
    return os.path.exists(out_png)


def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:40] or "card"


def main():
    global CHROME
    CHROME = find_chrome()
    if not CHROME:
        print("ERROR: 没找到 Google Chrome。请先安装 Chrome。")
        sys.exit(1)

    if not os.path.exists(QUOTES):
        print("ERROR: 找不到 quotes.csv")
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(QUOTES, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    used_themes = set()
    caption_blocks = []

    for i, row in enumerate(rows, 1):
        theme = (row.get("theme") or "dark-glow").strip()
        headline = (row.get("headline") or "").strip()
        quote = (row.get("quote") or "").strip()
        credit = (row.get("credit") or "IS-MIND.COM").strip()
        caption = (row.get("caption") or "").strip()

        tpl = os.path.join(TPL_DIR, "tpl-%s.html" % theme)
        if not os.path.exists(tpl):
            print("SKIP 第%d行: 没有主题 '%s' 的模板" % (i, theme))
            continue
        used_themes.add(theme)

        base = "%02d-%s" % (i, slugify(quote))
        for plat, (w, h) in SIZES.items():
            with open(tpl, encoding="utf-8") as tf:
                html = tf.read()
            html = (html.replace("{{W}}", str(w)).replace("{{H}}", str(h))
                    .replace("{{HEADLINE}}", headline)
                    .replace("{{QUOTE}}", quote)
                    .replace("{{CREDIT}}", credit))
            tmp = os.path.join(OUT_DIR, "_tmp_%s.html" % plat)
            with open(tmp, "w", encoding="utf-8") as o:
                o.write(html)
            out = os.path.join(OUT_DIR, "%s-%s.png" % (base, plat))
            ok = render(tmp, out, w, h)
            print(("OK   " if ok else "FAIL ") + out)
            try:
                os.remove(tmp)
            except OSError:
                pass

        if caption:
            caption_blocks.append("%s\n%s" % (quote, caption))

    if caption_blocks:
        with open(os.path.join(OUT_DIR, "captions.txt"), "w", encoding="utf-8") as cf:
            cf.write("\n\n".join(caption_blocks))
        print("Wrote output/captions.txt")

    print("完成。使用主题: " + ", ".join(sorted(used_themes)))


if __name__ == "__main__":
    main()
