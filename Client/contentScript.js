function highlightSponsoredWords() {
  const sponsoredWords = ["Sponsored", "promoted"];
  function highlightText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const replacedText = node.nodeValue.replace(
        new RegExp(`/(?:\d{1,2}\s*:\s*){1,3}\d{1,2}|(?:\d{1,2}\s*(?:days?|hours?|minutes?|seconds?|tage?|stunden?|minuten?|sekunden?|[a-zA-Z]{1,3}\.?)(?:\s*und)?\s*){2,4}`, "gi"),
        match => match ? `<span style="border: 5px solid red; border-image: animation: borderAnimation 4s infinite linear;">${match}</span>` : match
      );
      // if (replacedText !== node.nodeValue) {
      //   const newNode = document.createElement("span");
      //   newNode.innerHTML = replacedText;
      //   node.parentNode.insertBefore(newNode, node);
      //   node.parentNode.removeChild(node);
      // }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (const childNode of node.childNodes) {
        highlightText(childNode);
      }
    }
  }
  highlightText(document.body);
}
highlightSponsoredWords();
var maindomain;
function extractDomain(url) {
  // const domainRegex = new RegExp(/^(?:https?:\/\/)?(?:www\.)?([^\/.]+)/);
  const domainRegex = new RegExp(/(?:\d{1,2}\s*:\s*){1,3}\d{1,2}|(?:\d{1,2}\s*(?:days?|hours?|minutes?|seconds?|tage?|stunden?|minuten?|sekunden?|[a-zA-Z]{1,3}\.?)(?:\s*und)?\s*){2,4}/gi);
  // console.log(url);
  // console.log(domainRegex);
  const mat = url.match(domainRegex);
  return mat ? mat[1] : null;
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.message === "myMessage") {
    console.log("recieved message");
  }
  let c = 0;
  maindomain = message.message;
  maindomain = extractDomain(maindomain);
  // console.log(maindomain);
  let links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    // console.log(links[i].href);
    const domain = extractDomain(links[i].href);
    // console.log(domain);
    if (domain != maindomain && domain) {
      console.log(domain);
      c++;
    }
  }
  console.log(c);
  if (c >= links.length) {
    console.log("Website is harmful.");
  }
  else {
    console.log("Website is safe");
  }
});
let x = document.head;
var cwflag = 1;
const metaTags = x.querySelectorAll('meta');
const ecommerceKeywords = ['shop', 'buy', 'store', 'purchase', 'order', 'checkout',
  'product', 'online', 'sale', 'retail', 'marketplace',
  'e-shop', 'e-store', 'catalog', 'cart', 'deal', 'discount',
  'shipping', 'delivery', 'add to cart', 'browse', 'inventory',
  'shopping', 'check out', 'shop now', 'get it now', 'limited stock', 'stock'];
metaTags.forEach(metaTag => {
  let nameAttribute = metaTag.getAttribute('name');
  let contentAttribute = metaTag.getAttribute('content');
  if (nameAttribute) {

    nameAttribute = nameAttribute.toLowerCase();
    if (contentAttribute) {

      contentAttribute = contentAttribute.toLowerCase();
      const isECommerce = ecommerceKeywords.some(keyword => contentAttribute.includes(keyword));
      if (!isECommerce) {
        cwflag = 0;
        
      }
    }
  }
  console.log(`Meta Tag Name: ${nameAttribute}, Content: ${contentAttribute}`);
});
if(!cwflag){
  console.log("hhjv")
  chrome.runtime.sendMessage({checkwebsite: 0}, function(res){
    console.log(res)
  })
}


