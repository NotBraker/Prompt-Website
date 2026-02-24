from pathlib import Path

root = Path(r'C:\Users\johan\OneDrive\Desktop\Big Projects\Prompt Website')
files = [root / 'index.html'] + list((root / 'pages').glob('*.html'))

# Exact lines to strip — desktop nav <li> entries
nav_removals = [
    '        <li><a href="pages/categories.html">Categories</a></li>\n',
    '        <li><a href="categories.html">Categories</a></li>\n',
    '        <li><a href="categories.html" class="active">Categories</a></li>\n',
]

# Mobile menu links
mob_removals = [
    '    <a href="pages/categories.html" role="menuitem">🗂️ Categories</a>\n',
    '    <a href="categories.html" role="menuitem">🗂️ Categories</a>\n',
]

changed = []
for fp in files:
    s = fp.read_text(encoding='utf-8')
    t = s
    for r in nav_removals + mob_removals:
        t = t.replace(r, '')
    if t != s:
        fp.write_text(t, encoding='utf-8')
        changed.append(fp.name)

print('Changed:', changed)

