document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('mainImage');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const productName = document.getElementById('productName');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const suggestionsGrid = document.getElementById('suggestionsGrid');

    // Example: Get product ID from URL (this is just a placeholder)
    const productId = new URLSearchParams(window.location.search).get('id');

    // WhatsApp number
    const whatsappNumber = '919316137613'; // Replace with your WhatsApp number

    // Fetch product data
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(item => item.id == productId);
            
            if (product) {
                // Populate product details
                mainImage.src = product.image;
                productName.textContent = product.name;
                productDescription.textContent = product.description;
                productPrice.textContent = product.price;
                buyNowBtn.href = `https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.price)})%20-%20${encodeURIComponent(product.description)}`;

                // Create thumbnails for additional images
                product.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image;
                    if (index === 0) img.classList.add('active');
                    img.addEventListener('click', () => {
                        mainImage.src = image;
                        document.querySelectorAll('.thumbnails img').forEach(thumb => thumb.classList.remove('active'));
                        img.classList.add('active');
                    });
                    thumbnailsContainer.appendChild(img);
                });

                // Display product suggestions
                const similarProducts = products.filter(item => item.category === product.category && item.id != productId);
                similarProducts.forEach(similarProduct => {
                    const suggestionHTML = `
                        <div class="product-card">
                            <img src="${similarProduct.image}" alt="${similarProduct.name}">
                            <h3>${similarProduct.name}</h3>
                            <p>${similarProduct.price}</p>
                            <a href="product-detail.html?id=${similarProduct.id}" class="btn">View Details</a>
                        </div>`;
                    suggestionsGrid.innerHTML += suggestionHTML;
                });
            }
        })
        .catch(error => console.error('Error loading product data:', error));
});
