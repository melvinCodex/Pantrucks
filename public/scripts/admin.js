const addPersonelButtton = document.querySelector('.personel > button');
const personelForm = document.querySelector('.personel > form');
const servicesForm = document.querySelector('.serve form');
const categoryForm = document.querySelector('.serve .formCategory');

addPersonelButtton.addEventListener('click', () => {
    if(personelForm.classList.contains('none')){
        personelForm.classList.remove('none');
    }
    else{
        personelForm.classList.add('none');
    }
});

personelForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    try {
        const response = await fetch('/addPerson', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Product uploaded');
            window.location.reload(true);
        } else {
            alert('Error uploading product',err);
        }
    } catch (err) {
        console.error('Error uploading product', err);
    }
});

servicesForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    try {
        const response = await fetch('/addservice', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Product uploaded');
        } else {
            alert('Error uploading product',err);
        }
    } catch (err) {
        alert('Error uploading product', err);
    }
});


categoryForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    try {
        const response = await fetch('/addCategory', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Product uploaded');
        } else {
            alert('Error uploading product',err);
        }
    } catch (err) {
        alert('Error uploading product', err);
    }
});

const featuresButtton = document.querySelector('.features-edit > button');
const featuresForm = document.querySelector('.features-edit > form');

featuresButtton.addEventListener('click', () => {
    if(featuresForm.classList.contains('none')){
        featuresForm.classList.remove('none');
    }
    else{
        featuresForm.classList.add('none');
    }
});


const discountedButton = document.querySelector('.discounted-edit > button');
const discountedForm = document.querySelector('.discounted-edit > form');

discountedButton.addEventListener('click', () => {
    if(discountedForm.classList.contains('none')){
        discountedForm.classList.remove('none');
    }
    else{
        discountedForm.classList.add('none');
    }
});

const productsButton = document.querySelector('.Products-edit > button');
const productsForm = document.querySelector('.Products-edit > form');

productsButton.addEventListener('click', () => {
    if(productsForm.classList.contains('none')){
        productsForm.classList.remove('none');
    }
    else{
        productsForm.classList.add('none');
    }
});

productsForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    try {
        const response = await fetch('/upload-product', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Product uploaded');
            window.location.reload(true);
        } else {
            alert('Error uploading product',err);
        }
    } catch (err) {
        alert('Error uploading product', err);
    }
});



const featuresNameInput = document.querySelector('.features-edit .name input');
const featuresGallery = document.querySelector('.form2 .product-gallery')
const featuresGalleryCards = document.querySelectorAll('.features-edit .product-gallery .card');

featuresNameInput.addEventListener('keyup', () => {
    if(featuresNameInput.value === ''){
        featuresGallery.style.display = 'none';
    }
    else{
        featuresGallery.style.display = 'grid'
        const val = featuresNameInput.value.toLowerCase();
        const galleryCards = featuresGallery.querySelectorAll('.card');
        galleryCards.forEach(card => {
            const cardName = card.querySelector('h3').textContent.toLowerCase();
            if(cardName.includes(val)){
                card.style.display = 'block';
            }else{
                card.style.display = 'none';
            }
        });
    }
});

featuresGalleryCards.forEach(card => {
    const data = card.querySelector('h3').textContent;

    card.addEventListener('click', async() => {
        featuresNameInput.value = data;
        featuresGallery.style.display = 'none';
    });
});



const discountedNameInput = document.querySelector('.discounted-edit .name input');
const discountedGallery = document.querySelector('.form3 .product-gallery')
const discountedGalleryCards = document.querySelectorAll('.discounted-edit .product-gallery .card');

discountedNameInput.addEventListener('keyup', () => {
    if(discountedNameInput.value === ''){
        discountedGallery.style.display = 'none';
    }
    else{
        discountedGallery.style.display = 'grid'
        const val = discountedNameInput.value.toLowerCase();
        const galleryCards = discountedGallery.querySelectorAll('.card');
        galleryCards.forEach(card => {
            const cardName = card.querySelector('h3').textContent.toLowerCase();
            if(cardName.includes(val)){
                card.style.display = 'block';
            }else{
                card.style.display = 'none';
            }
        });
    }
});

discountedGalleryCards.forEach(card => {
    const data = card.querySelector('h3').textContent;


    card.addEventListener('click', async() => {
        discountedNameInput.value = data;
        discountedGallery.style.display = 'none';
    });
});


const personelDeleteButtons = document.querySelectorAll('.personel button.warning');

personelDeleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const memberId = button.parentElement.parentElement.dataset.unique;
        const endpoint = `/deletemember/${memberId}`;
    
                fetch(endpoint, {
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.delete); 
                    window.location.reload(true);
                })
                .catch(err => console.log(err));
        
    })
});


const featuresDeleteButtons = document.querySelectorAll('.features-edit button.danger')

featuresDeleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const featureId = button.parentElement.parentElement.dataset.unique;
        const endpoint = `/deletefeature/${featureId}`;
    
                fetch(endpoint, {
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.delete); 
                    window.location.reload(true);
                })
                .catch(err => console.log(err));
        
    })
});



const discountedDeleteButtons = document.querySelectorAll('.discounted-edit button.danger');

discountedDeleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const discountedId = button.parentElement.parentElement.dataset.unique;
        const endpoint = `/deletediscounted/${discountedId}`;
    
                fetch(endpoint, {
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.delete); 
                    window.location.reload(true);
                })
                .catch(err => console.log(err));
        
    })
});



const productsDeleteButtons = document.querySelectorAll('.Products-edit button.danger');

productsDeleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const productsId = button.parentElement.parentElement.dataset.unique;
        console.log('Deleting product with ID:', productsId);
        const endpoint = `/deleteproduct/${productsId}`;

        fetch(endpoint, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response:', data);
            alert(data.delete); 
            window.location.reload(true);
        })
        .catch(err => console.log(err));
    });
});




const reviewsDeleteButtons = document.querySelectorAll('.Products-edit button.danger');

reviewsDeleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const reviewsId = button.parentElement.parentElement.dataset.unique;
        const endpoint = `/deletereviews/${reviewsId}`;
    
                fetch(endpoint, {
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.delete); 
                    window.location.reload(true);
                })
                .catch(err => console.log(err));
        
    })
});

