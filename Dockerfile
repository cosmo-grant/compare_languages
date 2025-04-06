FROM asciidoctor/docker-asciidoctor:latest
RUN gem install --prerelease asciidoctor-tabs
ENTRYPOINT ["asciidoctor", "-r", "asciidoctor-tabs"]
CMD ["-"]
