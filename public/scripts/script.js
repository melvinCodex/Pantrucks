const openButton = document.querySelector('.nav-icons #open');
const closeButton = document.querySelector('.nav-icons #close');
const navLinks = document.querySelector('nav .nav-links');
const searchContainer = document.querySelector('nav .search-parts-container');
const searchInput = document.querySelector('nav .search-bar input');

searchInput.addEventListener('keyup', () => {
    searchContainer.style.display = 'block';
    const inputValue = searchInput.value.toLowerCase();
    if(inputValue === ''){
        searchContainer.style.display = 'none';
    }
    searchContainer.querySelectorAll('.card h3').forEach(cardName => {
        let nameCard = cardName.textContent.toLowerCase();
        if(nameCard.includes(inputValue)){
            cardName.parentElement.style.display = "initial";
        }
        else{
            cardName.parentElement.style.display = "none";
        }
    })
});



openButton.addEventListener('click', ()=>{
    navLinks.style.display = 'block';
    openButton.style.display = 'none';
    closeButton.style.display = 'block';
});

closeButton.addEventListener('click', ()=>{
    navLinks.style.display = 'none';
    closeButton.style.display = 'none';
    openButton.style.display = 'block';
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 30) { // Change 100 to the desired scroll position
        navbar.style.top = '0';
    } else {
        navbar.style.top = (34 - window.scrollY) + 'px';
    }
});


const dropServiceDown = document.querySelector('.nav-links .drop-down .service-container');
const dropServiceDownLinks = document.querySelectorAll('.nav-links .drop-down a');

dropServiceDownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});


dropServiceDown.querySelectorAll('li').forEach(link => {
    link.addEventListener('click', async () => {
        const linkData = link.dataset.tag;
        sessionStorage.setItem('selectedTag', linkData);
        const serviceName = document.querySelector('.service > h2');
        if (serviceName) {
            serviceName.textContent = linkData;
        }
        window.location.href = `/services?selectedTag=${encodeURIComponent(linkData)}`;
    });
});


const dropCategoryDown = document.querySelector('.nav-links .drop-down .categories-container');


dropCategoryDown.querySelectorAll('li').forEach(link => {
    link.addEventListener('click', async () => {
        const linkCategoryData = link.dataset.tag;
        sessionStorage.setItem('selectedCategoryTag', linkCategoryData);
        const categoryName = document.querySelector('.category-banner .right > h2');
        if (categoryName) {
            categoryName.textContent = linkCategoryData;
        }
        window.location.href = `/categories?selectedCategoryTag=${encodeURIComponent(linkCategoryData)}`;
      
    });
});



const removeButtons = document.querySelectorAll('.remove');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            row.remove();
        
            let data = sessionStorage.getItem('cartNum');
            let productName = button.parentElement.querySelector('tbody tr td h2').textContent;
            let cartItems = sessionStorage.getItem('cartItems').remove(productName);
            sessionStorage.setItem('cartItems',cartItems);
           
            data = parseInt(data, 10);
        
          
            data--;
        
            sessionStorage.setItem('cartNum', data);
            document.querySelector('.cartCount').textContent = data;
            console.log('Updated cartNum:', data);
        });
        
    });

    
    const quote = document.querySelector('.cart .check-out');
    const infoForm = document.querySelector('.cart form');
    
    quote.addEventListener('click', ()=> {
        if(infoForm.classList.contains('none')){
            infoForm.classList.remove('none');
            setTimeout(() => {
                alert('Please fill the form below');
            }, 100);
        }
        else{
            infoForm.classList.add('none')
        }
    })
    

    
    