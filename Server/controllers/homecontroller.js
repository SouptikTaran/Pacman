const color = require('colors');
const axios = require('axios');






const cheerio = require('cheerio');

// Function to check if the website is an eCommerce site based on the content of the <head> tag
async function isECommerce(url) {
  try {
    // Fetch the HTML content of the website
    console.log("dsff")
    const response = await axios.get(url);

    // Use Cheerio to parse the HTML and extract the content of the <head> tag
    const $ = cheerio.load(response.data);
    const headContent = $('meta').text();

    // Keywords associated with eCommerce
    const ecommerceKeywords = ['shop', 'store', 'buy', 'cart', 'checkout', 'product'];

    // Check if any of the keywords are present in the <head> content
    const isECommerce = ecommerceKeywords.some(keyword => headContent.includes(keyword));

    return isECommerce;
  } catch (error) {
    console.error('Error fetching website content:', error);
    return false; // Assuming an error means the website is not eCommerce
  }
}
const headers = {
    'User-Agent': 'Your User Agent', // Replace with your user agent
    'Authorization': 'Bearer YourAccessToken', // Replace with your access token if needed
    // Add any other headers as needed
  };
  
  // Define the Axios configuration object with headers
  const config = {
    headers: headers,
  };
// Example usage
const websiteUrl = 'https://www.myntra.com/'; // Replace with the actual URL
isECommerce(websiteUrl)
  .then(result => {
    console.log(`Is ${websiteUrl} an eCommerce site? ${result ? 'Yes' : 'No'}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });

module.exports.checkwebsite = async (req, res) => {
    try {
        const Url = 'https://www.myntra.com/shop/men';
        const websiteresponse = await axios.get(Url);
        const headers = {
            'User-Agent': 'Your User Agent', // Replace with your user agent
            'Authorization': 'Bearer YourAccessToken', // Replace with your access token if needed
            // Add any other headers as needed
          };
          
          // Define the Axios configuration object with headers
          const config = {
            headers: headers,
          };
        const $ = cheerio.load(websiteresponse.data);
        const headContent = $('meta').text();
        // console.o
        const ecommerceKeywords = ['shop', 'buy', 'store', 'purchase', 'order', 'checkout',
        'product', 'online', 'sale', 'retail', 'marketplace',
        'e-shop', 'e-store', 'catalog', 'cart', 'deal', 'discount',
        'shipping', 'delivery', 'add to cart', 'browse', 'inventory',
        'shopping', 'check out', 'shop now', 'get it now', 'limited stock', 'stock'];
        const isECommerce = ecommerceKeywords.some(keyword => headContent.includes(keyword));
        // const response = await manager.process('en', headContent);
        console.log(isECommerce);
        // console.log(response.answer);
        return res.status(200).json();
    } catch (error) {
        console.log(error);
    }
};