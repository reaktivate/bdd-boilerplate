// decodeHtml need to place to useEffect
// otherwise document will undefined

function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export default decodeHtml;
