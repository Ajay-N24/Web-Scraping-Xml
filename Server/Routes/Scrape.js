import express from 'express';
const router = express.Router();
import puppeteer from 'puppeteer';

router.post("/getData", async (req, res) => {
    const { urli } = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(urli);
    // Navigate the page to a URL
    // const url = 'https://skindulge.in/sitemap_products_1.xml?from=8003642196244&to=9430137209108';
    await page.goto(urli);

    const productLinks = await page.evaluate(() => {
        const links = [];
        const locElements = document.querySelectorAll('url > *:first-child');
        locElements.forEach(element => {
            const url1 = element.textContent;
            if (url1.includes('/products/')) { // filter for product links
                links.push(url1);
            }
        });
        return links;
    });
    console.log(productLinks);
    const productData = [];

    // Step 3: Visit the first 5 product pages and extract image and title
    for (let i = 0; i < Math.min(5, productLinks.length); i++) {
        const productLink = productLinks[i];
        await page.goto(productLink, { waitUntil: 'networkidle2' });

        // Step 4: Extract product image and title from the product page
        const data = await page.evaluate(() => {
            let title = document.querySelector('.prod__title h1');
            title = title ? title.textContent : null;
            const image = document.querySelector('img.f-img-loaded'); // Adjust selector based on site structure
            const imageSrc = image ? image.src : null;

            return {
                link: window.location.href,
                imageSrc,
                title
            };
        });

        productData.push(data);
    }

    console.log('Extracted Product Data:', productData);
    if (!productData) {
        res.status(200).json({ success: false })
    }
    else {
        res.json({
            success: true, message: productData
        })
    }
    await browser.close();

});
export default router;
