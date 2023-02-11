const MATOMO_ID = "tahridev.matomo.cloud"

export const matomoInlineScript = `var _paq = window._paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="https://${MATOMO_ID}/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '1']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src='//cdn.matomo.cloud/${MATOMO_ID}/matomo.js'; s.parentNode.insertBefore(g,s);
})();`

export const tellMatomoAboutPageChange = (...args: any[]) => {
  const _paq = window._paq || []
  _paq.push(["setCustomUrl", window.location])
  _paq.push(["setDocumentTitle", document.title])
  _paq.push(["trackPageView"])
}
