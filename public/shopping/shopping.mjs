const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

// Turns a product data object into HTML.
function renderProductCard(product) {
    // Create the article element
    const article = document.createElement('article');    
    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;
    article.appendChild(img);
    
    // Product details container
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';
    
    // Product name
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = product.name;
    detailsDiv.appendChild(nameHeading);
    
    // Product description
    const descPara = document.createElement('p');
    descPara.textContent = product.description;
    detailsDiv.appendChild(descPara);
    
    // Price
    const pricePara = document.createElement('p');
    pricePara.className = 'price';
    pricePara.textContent = `${product.price}`;
    detailsDiv.appendChild(pricePara);
    
    // Button container
    const buttonDiv = document.createElement('div');
    
    // Buy button
    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Add to cart';
    buyButton.addEventListener('click', function() {
        product.numInCart++;
        rerenderAllProducts();
        rerenderCart();
    });
    
    buttonDiv.appendChild(buyButton);
    
    if (product.numInCart > 0) {
        const numInCartSpan = document.createElement('span');
        numInCartSpan.className = 'num-in-cart';
        numInCartSpan.textContent = `${product.numInCart} in cart`;
        buttonDiv.appendChild(numInCartSpan);
    }
    
    detailsDiv.appendChild(buttonDiv);
    article.appendChild(detailsDiv);    
    return article;
}


// Recreates all product cards.
function rerenderAllProducts() {
    const productListSection = document.querySelector('.product-list');
    productListSection.innerHTML = '';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Search results';
    productListSection.appendChild(heading);
    
    // Filter products
    for (let i = 0; i < PRODUCTS.length; i++) {
        const product = PRODUCTS[i];
        if (shouldProductBeVisible(product)) {
            const productCard = renderProductCard(product);
            productListSection.appendChild(productCard);
        }
    }
}

// Recreates all cart panel info.
function rerenderCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';
    
    // Add items that are in the cart
    for (let i = 0; i < PRODUCTS.length; i++) {
        const product = PRODUCTS[i];
        if (product.numInCart > 0) {
            const productText = document.createElement('p');
            productText.textContent = `${product.name} x${product.numInCart}`;
            cartItemsDiv.appendChild(productText);
            
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            
            removeButton.addEventListener('click', function() {
                if (product.numInCart > 0) {
                    product.numInCart--;
                    rerenderAllProducts();
                    rerenderCart();
                }
            });
            
            cartItemsDiv.appendChild(removeButton);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

// Returns whether a product should be visible based on the current values of the price filters.
function shouldProductBeVisible(product) {
    let minPrice = 0;
    if (minPriceInput.value !== "") {
        minPrice = parseFloat(minPriceInput.value);
    }
    
    let maxPrice = Infinity;
    if (maxPriceInput.value !== "") {
        maxPrice = parseFloat(maxPriceInput.value);
    }
    
    return product.price >= minPrice && product.price <= maxPrice;
}

minPriceInput.addEventListener('input', rerenderAllProducts);
maxPriceInput.addEventListener('input', rerenderAllProducts);
minPriceInput.addEventListener('change', rerenderAllProducts);
maxPriceInput.addEventListener('change', rerenderAllProducts);

window.addEventListener('DOMContentLoaded', () => {
    rerenderAllProducts();
    rerenderCart();
});
