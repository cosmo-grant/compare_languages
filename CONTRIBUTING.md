# CONTRIBUTING.md

## How to add a comparison

Create a directory in `comparisons/` something like

```
my_cool_comparison
├── discussion.html
├── node
│   ├── main.js
│   └── output.txt
└── python
    ├── main.py
    └── output.txt
```

## How to check the comparisons

Use [snippet-checker](https://github.com/cosmo-grant/snippet-checker).

`uv tool run snippet-checker output comparisons`

## How to generate the site

`uv run build_site.py`

## How to publish the site

`git push`.

The site is served from `docs/` via github pages.
