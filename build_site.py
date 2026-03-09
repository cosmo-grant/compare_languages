# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "jinja2",
# ]
# ///


from jinja2 import Environment, FileSystemLoader

from pathlib import Path


class Comparison:
    """
    A comparison between programming languages about a particular feature.

    A comparison consists of snippets for various languages, and a discussion.
    """

    def __init__(self, dir: Path) -> None:
        self.dir = dir

    def __repr__(self) -> str:
        return f"{type(self).__name__}({self.dir!r})"

    @property
    def discussion(self) -> str:
        return (self.dir / "discussion.html").read_text()

    @property
    def title(self) -> str:
        return self.dir.name.replace("_", " ")

    @property
    def snippets(self):
        return [Snippet(item) for item in self.dir.iterdir() if item.is_dir()]

    @property
    def output_filename(self) -> str:
        return f"{self.dir.name}.html"


class Snippet:
    """A code snippet and its output."""

    # used to set class="lang-..." for hljs
    EXTENSION_TO_HLJS_LANGUAGE = {
        ".go": "golang",
        ".js": "javascript",
        ".py": "python",
        ".rb": "ruby",
        ".rs": "rust",
    }

    def __init__(self, dir: Path) -> None:
        self.dir = dir

    def __repr__(self) -> str:
        return f"{type(self).__name__}({self.dir!r})"

    @property
    def title(self) -> str:
        return self.dir.name

    def _get_snippet_path(self) -> Path:
        snippet_paths = list(self.dir.glob("main.*"))
        assert len(snippet_paths) == 1, f"Expected exactly 1 file named main.* but found {len(snippet_paths)}."
        return snippet_paths[0]

    @property
    def language(self) -> str:
        return self.EXTENSION_TO_HLJS_LANGUAGE[self._get_snippet_path().suffix]

    @property
    def code(self) -> str:
        plain = self._get_snippet_path().read_text()
        return escape_html(plain)

    @property
    def output(self) -> str:
        plain = (self.dir / "output.txt").read_text()
        return escape_html(plain)


class SiteBuilder:
    env = Environment(loader=FileSystemLoader("templates/"))
    comparison_template = env.get_template("comparison.jinja")
    index_template = env.get_template("index.jinja")
    comparisons_directory = Path("comparisons")
    # NOTE: When deploying from a branch, github pages only lets you deploy from / or docs/.
    output_directory = Path("docs")

    @property
    def comparisons(self) -> list[Comparison]:
        return [Comparison(Path(item)) for item in self.comparisons_directory.iterdir() if item.is_dir()]

    def build_index(self) -> None:
        index_content = self.index_template.render(comparisons=self.comparisons)
        (self.output_directory / "index.html").write_text(index_content)

    def build_comparisons(self) -> None:
        for comparison in self.comparisons:
            comparison_content = self.comparison_template.render(comparison=comparison)
            (self.output_directory / comparison.output_filename).write_text(comparison_content)

    def build(self) -> None:
        self.build_comparisons()
        self.build_index()


def escape_html(plain: str) -> str:
    """I follow the mdn docs rule of thumb: escape &, then <; anything else is optional."""
    return plain.replace("&", "&amp;").replace("<", "&lt;")  # order matters


def main() -> None:
    SiteBuilder().build()


if __name__ == "__main__":
    main()
