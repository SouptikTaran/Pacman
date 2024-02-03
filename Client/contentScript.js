
// document.querySelectorAll('a')

// const images = document.getElementsByTagName('img');
// for (let i = 0; i < images.length; i++) {
//   const src = images[i].getAttribute('src');
//   const alt = images[i].getAttribute('alt');
//   if (src) {
//     // alert(`The source of image ${i+1} is **${src}** and the alternate text is **${alt}**`);
//     images[i].style.backgroundColor = 'red';
//     images[i].style.border = '2px solid red';
//   }
// }


// const links = document.querySelectorAll('a');

// for (let i = 0; i < links.length; i++) {
//   links[i].addEventListener('click', (event) => {
//     links[i].style.border = '5px solid green';
//     event.preventDefault();
//     const currentHostname = window.location.hostname;
//     const linkHostname = new URL(event.target.href).hostname;
//     console.log("Link Hostname: " + linkHostname + "\nCurrent Hostname: " + currentHostname);
    
//     const hostnameRegex = /^https?:\/\/(?:[a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/;
//     if (hostnameRegex.test(event.target.href) && currentHostname === linkHostname) {
//       alert('Hi');
//       window.location.href = event.target.href;
//     } else {
//       alert('Link is from a different website. Action blocked.');
//     }
//   });
// }


function highlightSponsoredWords() {
  // List of sponsored words (customize as needed)
  const sponsoredWords = ["Sponsored", "promoted"];

  // Helper function to replace matched words with highlighted version
  function highlightText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const replacedText = node.nodeValue.replace(
        new RegExp(`\\b(${sponsoredWords.join("|")})\\b`, "gi"),
        match => match ? `<span style="border: 5px solid red">${match}</span>`: match
      );

      // Check if the text was actually replaced
      if (replacedText !== node.nodeValue) {
        const newNode = document.createElement("span");
        newNode.innerHTML = replacedText;

        // Insert the new node before the original text node
        node.parentNode.insertBefore(newNode, node);

        // Remove the original text node
        node.parentNode.removeChild(node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Recursively process child nodes
      for (const childNode of node.childNodes) {
        highlightText(childNode);
      }
    }
  }

  // Start processing from the body element
  highlightText(document.body);
}
highlightSponsoredWords();