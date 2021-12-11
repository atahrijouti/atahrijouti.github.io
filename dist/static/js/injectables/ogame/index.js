;(function() {
  const baseUrl = "https://tahri.dev/static/js/injectables/ogame/"
  const fileNames = ["show-nearby"]

  const scripts = fileNames.map(name => {
    const script = document.createElement("script")
    script.src = `${baseUrl}${name}.js`
    return script
  })
  document.head.append(...scripts)
})()
