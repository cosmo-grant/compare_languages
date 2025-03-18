# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "jinja2",
# ]
# ///


from jinja2 import Environment, FileSystemLoader

from pathlib import Path


def main() -> None:
    language_to_extension = {
        "python": "py",
        "javascript": "js",
        "rust": "rs",
    }

    env = Environment(loader=FileSystemLoader("templates/"))
    comparison_template = env.get_template("base.html")
    index_template = env.get_template("index.html")

    comparisons = []

    for comparison_dir in Path("comparisons").iterdir():
        rendered_filename = f"{comparison_dir.name}.html"
        comparisons.append(
            {
                "title": comparison_dir.name.replace("_", " "),
                "filename": rendered_filename,
            }
        )

        # discussion.txt at top-level
        with open(comparison_dir / "discussion.txt") as file:
            discussion = file.read()

        snippets = []
        for (
            snippet_dir
        ) in comparison_dir.iterdir():  # all directories are snippet directories
            if not snippet_dir.is_dir():
                continue

            language = snippet_dir.name
            extension = language_to_extension[language]

            with open(
                snippet_dir / f"snippet.{extension}"
            ) as file:  # snippets at top-level too
                code = file.read()

            with open(snippet_dir / "output.txt") as file:
                output = file.read()

            snippets.append(
                {
                    "language": language,
                    "code": code,
                    "output": output,
                }
            )

        comparison_content = comparison_template.render(
            snippets=snippets,
            discussion=discussion,
        )

        with open(rendered_filename, mode="w", encoding="utf-8") as rendered:
            rendered.write(comparison_content)

    index_content = index_template.render(comparisons=comparisons)
    with open("static/index.html", mode="w", encoding="utf-8") as rendered_index:
        rendered_index.write(index_content)


if __name__ == "__main__":
    main()
