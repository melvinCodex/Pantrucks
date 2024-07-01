







    const mediaQuery = window.matchMedia('(max-width: 550px)');
    
    function toggleVisibility(event) {
        if (mediaQuery.matches) {
            const ul = event.target.nextElementSibling;
            if (ul.style.display === 'none' || ul.style.display === '') {
                ul.style.display = 'block';
            } else {
                ul.style.display = 'none';
            }
        }
    }

    const headers = document.querySelectorAll('.tool-brands h3, .tool-category h3');
    
    headers.forEach(header => {
        header.addEventListener('click', toggleVisibility);
    });

    function handleMediaQueryChange(event) {
        if (!event.matches) {
            // Show all ul elements when the screen is larger than 550px
            document.querySelectorAll('.tool-brands ul, .tool-category ul').forEach(ul => {
                ul.style.display = '';
            });
        }
    }

    // Initial check
    handleMediaQueryChange(mediaQuery);
    
    // Listen for media query changes
    mediaQuery.addListener(handleMediaQueryChange);

    const loading = document.querySelector('.loading');

    const navigate = async (page) => {
        const cardContainer = document.querySelector('.card-container');
        const originalContent = cardContainer.innerHTML;

        // Show loading animation
        loading.classList.add('none');
        cardContainer.innerHTML = '<h2>Loading...<h2/>'

        try {
            const response = await fetch(`/shop?page=${page}`);
            const html = await response.text();
            const newParts = new DOMParser().parseFromString(html, 'text/html').querySelector('.parts').innerHTML;

            // Update the .parts section with the new content
            document.querySelector('.parts').innerHTML = newParts;
            updateEventListeners();  // Re-attach event listeners
        } catch (error) {
            console.error('Error fetching page:', error);
            // Revert to the original content if an error occurs
            cardContainer.innerHTML = originalContent;
        } finally {
            // Hide loading animation if still showing
            if (!loading.classList.contains('none')) {
                loading.classList.add('none');
            }
            window.scrollTo(0, 0);
        }
    };

    const updateEventListeners = () => {
        const toolBrands = document.querySelector('.tool-brands ul');
const toolCategorys = document.querySelector('.tool-category ul');
const toolSearch = document.querySelector('.tool-search input');

const parts = document.querySelector('.parts .card-container');

const removeBrandToolActive = () => {
    document.querySelectorAll('.tool-brands li').forEach(tool => {
        tool.classList.remove('active');
    })
}
const removeCategoryToolActive = () => {
    document.querySelectorAll('.tool-category li').forEach(tool => {
        tool.classList.remove('active');
    })
}

toolBrands.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        removeBrandToolActive();
        e.target.classList.add('active');
        let toolData = e.target.textContent.toLowerCase();
        parts.querySelectorAll('.card').forEach(part => {
            if (toolData === 'all' || toolData === part.dataset.brand.toLowerCase()) {
                part.style.display = 'grid';
            } else {
                part.style.display = 'none';
            }
        });
    }
});

toolCategorys.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        removeCategoryToolActive();
        e.target.classList.add('active');
        let toolData = e.target.textContent.toLowerCase();
        parts.querySelectorAll('.card').forEach(part => {
            if (toolData === 'all' || toolData === part.dataset.category.toLowerCase()) {
                part.style.display = 'grid';
            } else {
                part.style.display = 'none';
            }
        });
    }
});

toolSearch.addEventListener('keyup', (e) => {
    const val = toolSearch.value.toLowerCase();

    parts.querySelectorAll('.card').forEach(part => {
        let name = part.querySelector('h2').textContent.toLowerCase();

        if (name.includes(val)) {
            part.style.display = 'grid';
        } else {
            part.style.display = 'none';
        }
    });
});




const addToCartButtons = document.querySelectorAll('.card .success');
let cartItemsArray = sessionStorage.getItem('cartItems');


if (!cartItemsArray) {
    cartItemsArray = [];
} else {

    cartItemsArray = JSON.parse(cartItemsArray);
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        let productName = button.dataset.tag;
        cartItemsArray.push(productName);
        
  
        const uniqueItemsSet = new Set(cartItemsArray);
        cartItemsArray = Array.from(uniqueItemsSet);

        console.log('Cart Items Array:', cartItemsArray);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
   
        fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItemsArray) 
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('cartNum', data);
            document.querySelector('.cartCount').innerHTML = data;

        })
        .catch(error => {
            console.error('Error sending cart items:', error);
        });
    });
});



const detailsButtons = document.querySelectorAll('.card .danger');



function removeDetails(exceptElement = null) {
    document.querySelectorAll('.cardDetails').forEach(details => {
        if (details !== exceptElement) {
            details.classList.add('none');
        }
    });
}


detailsButtons.forEach(button => {
  
    button.addEventListener('click', () => {
       
        let cardDetails = button.closest('.card').querySelector('.cardDetails');
       
        if (cardDetails.classList.contains('none')) {
            removeDetails(cardDetails); 
            cardDetails.classList.remove('none'); 
        } else {
            cardDetails.classList.add('none');
        }
    });
});
        const backButton = document.querySelector('.parts .back');
        const forwardButton = document.querySelector('.parts .forward');

        if (backButton) {
            backButton.addEventListener('click', () => {
                const page = backButton.getAttribute('data-page');
                navigate(page);
            });
        }

        if (forwardButton) {
            forwardButton.addEventListener('click', () => {
                const page = forwardButton.getAttribute('data-page');
                navigate(page);
            });
        }
    };



    updateEventListeners();