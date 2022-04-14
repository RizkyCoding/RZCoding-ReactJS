var programming_languages = [
	"python",
	"pascal",
	"javascript",
	"java",
        "c",
	"fortran",
	"typescript",
	"swift",
	"go",
	"csharp",
	"kotlin",
	"php",
        "ruby"
]

function randomWord() {
  return programming_languages[Math.floor(Math.random() * programming_languages.length)]
}

export { randomWord }
