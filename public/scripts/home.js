const featureTags = document.querySelectorAll('.featured-products .left ul li');
const featuresCards = document.querySelectorAll('.featured-products .card');

const removeFeatureActive = () => {
    featureTags.forEach(feature => {
        feature.classList.remove('active');
    });
}

featureTags.forEach((feature) => {
    feature.addEventListener('click', () => {
        removeFeatureActive();
        feature.classList.add('active');
        let featureData = feature.dataset.tag.toLowerCase();
        let count = 0;
        featuresCards.forEach((card) => {
            card.style.display = 'none'; 
        });
        if(featureData == 'all'){
            featuresCards.forEach((card, index) => {
                if (index < 8) {
                    card.style.display = 'initial';
                }
            });
        }else{
            featuresCards.forEach((card) => {
                let cardData = card.dataset.tag.toLowerCase();
                if (featureData === cardData && count < 8) {
                    card.style.display = 'initial';
                    count++;
                }
            });
        }
    });
});

const categoryTags = document.querySelectorAll('.categories .container aside ul li');
const categoriesCards = document.querySelectorAll('.categories .main-section .card-container .card');

const removeCategoryActive = () => {
    categoryTags.forEach(category => {
        category.classList.remove('active');
    });
}

categoryTags.forEach((category) => {
    category.addEventListener('click', () => {
        console.log(categoriesCards, categoryTags);
        removeCategoryActive();
        category.classList.add('active');
        let categoryData = category.dataset.tag.toLowerCase();
        let count = 0;
        categoriesCards.forEach((card) => {
            card.style.display = 'none'; 
        });
        if(categoryData == 'all'){
            categoriesCards.forEach((card, index) => {
                if (index < 8) {
                    card.style.display = 'initial';
                }
            });
        }else{
            categoriesCards.forEach((card) => {
                let cardData = card.dataset.category.toLowerCase();
                if (categoryData === cardData && count < 8) {
                    card.style.display = 'initial';
                    count++;
                }
            });
        }
    });
});

const brandTags = document.querySelectorAll('.Shop-by-brand .mini-card');
const brandsCards = document.querySelectorAll('.Shop-by-brand .card');

const removeBrandActive = () => {
    brandTags.forEach(brand => {
        brand.classList.remove('active');
    });
}

brandTags.forEach((brand) => {
    brand.addEventListener('click', () => {
        console.log(brandTags, brandsCards);
        removeBrandActive();
        brand.classList.add('active');
        let brandData = brand.dataset.tag.toLowerCase();
        let count = 0;
        brandsCards.forEach((card) => {
            card.style.display = 'none';  
        });
        brandsCards.forEach((card) => {
            let cardData = card.dataset.brand.toLowerCase();
            if (brandData === cardData && count < 12) {
                card.style.display = 'initial';
                count++;
            }
        });
    });
});


