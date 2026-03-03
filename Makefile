.PHONY: format build

build: format
	uv run build_site.py

format:
	uv tool run ruff format --exclude comparisons/**.py
	npx prettier --write .

preview:
	npx live-server docs

view:
	xdg-open https://cosmo-grant.github.io/compare_languages/
