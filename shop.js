document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // WhatsApp number (replace with your own phone number in international format, e.g., 919876543210 for India)
    const whatsappNumber = '919316137613'; // e.g., 919876543210

    // Fetch products from the JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Display all products initially
            displayProducts(products);

            // Add click event listeners to filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');

                    // Remove 'active' class from all buttons and add it to the clicked button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    // Filter products based on the selected category
                    if (category === 'all') {
                        displayProducts(products);
                    } else {
                        const filteredProducts = products.filter(product => product.category === category);
                        displayProducts(filteredProducts);
                    }
                });
            });
        })
        .catch(error => console.error('Error loading products:', error));

    // Function to display products dynamically
    function displayProducts(products) {
        let productHTML = '';

        if (products.length === 0) {
            productHTML = '<p>No products found for this category.</p>';
        } else {
            products.forEach(product => {
                productHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
                    <a href="https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.price)})%20-%20${encodeURIComponent(product.id)}" class="btn" target="_blank">Buy Now</a>
                </div>`;
            });
        }

        productGrid.innerHTML = productHTML;
    }
});
