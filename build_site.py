# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "jinja2",
# ]
# ///


from jinja2 import Environment, FileSystemLoader

from pathlib import Path
from subprocess import run


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
        with open(self.dir / "discussion.adoc") as f:
            content = f.read()
        return content

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

    LANGUAGE_TO_EXTENSION = {
        "go": "go",
        "javascript": "js",
        "python": "py",
        "ruby": "rb",
        "rust": "rs",
    }

    def __init__(self, dir: Path) -> None:
        self.dir = dir

    def __repr__(self) -> str:
        return f"{type(self).__name__}({self.dir!r})"

    @property
    def language(self) -> str:
        return self.dir.name

    @property
    def extension(self) -> str:
        return self.LANGUAGE_TO_EXTENSION[self.language]

    @property
    def code(self) -> str:
        with open(self.dir / f"snippet.{self.extension}") as file:
            code = file.read()

        return code

    @property
    def output(self) -> str:
        with open(self.dir / "output.txt") as file:
            output = file.read()

        return output


class SiteBuilder:
    env = Environment(loader=FileSystemLoader("templates/"))
    comparison_template = env.get_template("comparison.adoc.jinja")
    index_template = env.get_template("index.adoc.jinja")
    comparisons_directory = Path("comparisons")
    # NOTE: When deploying from a branch, github pages only lets you deploy from / or docs/.
    output_directory = Path("docs")

    @property
    def comparisons(self) -> list[Comparison]:
        return [
            Comparison(Path(item))
            for item in self.comparisons_directory.iterdir()
            if item.is_dir()
        ]

    def build_index(self) -> None:
        raw_content = self.index_template.render(
            comparisons=[  # TODO: can i just pass self.comparisons?
                {
                    "title": comparison.title,
                    "filename": comparison.output_filename,
                }
                for comparison in self.comparisons
            ]
        )
        subprocess = run(
            "docker container run -i asciidoctor-tabs",
            capture_output=True,
            check=True,
            input=raw_content,
            shell=True,
            text=True,
        )
        with open(
            self.output_directory / "index.html", mode="w", encoding="utf-8"
        ) as rendered_index:
            rendered_index.write(subprocess.stdout)

    def build_comparisons(self) -> None:
        for comparison in self.comparisons:
            content = self.comparison_template.render(
                snippets=[
                    {
                        "language": snippet.language,
                        "code": snippet.code,
                        "output": snippet.output,
                    }
                    for snippet in comparison.snippets
                ],
                discussion=comparison.discussion,
            )

            subprocess = run(
                "docker container run -i asciidoctor-tabs",
                capture_output=True,
                check=True,
                input=content,
                shell=True,
                text=True,
            )
            with open(
                self.output_directory / comparison.output_filename,
                mode="w",
                encoding="utf-8",
            ) as output_file:
                output_file.write(subprocess.stdout)

    def build(self) -> None:
        self.build_comparisons()
        self.build_index()


def main() -> None:
    SiteBuilder().build()


if __name__ == "__main__":
    main()
