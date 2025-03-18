# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "jinja2",
# ]
# ///


from jinja2 import Environment, FileSystemLoader


def main() -> None:
    env = Environment(loader=FileSystemLoader("templates/"))
    template = env.get_template("base.html")
    content = template.render(
        snippets=[
            {
                "language": "python",
                "code": "for i in range(3)",
                "output": "0 1 2",
            },
            {
                "language": "javascript",
                "code": "for (let i == 0;)",
                "output": "2 2 2",
            },
        ],
        discussion="blah blah",
    )

    with open("rendered.html", mode="w", encoding="utf-8") as rendered:
        rendered.write(content)


if __name__ == "__main__":
    main()
