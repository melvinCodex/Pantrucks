const CategoryTags = document.querySelectorAll('.categories .mini-card');
const CategoryCards = document.querySelectorAll('.categories .card');
const categorName = document.querySelector('.cat-name');


const RemoveFeatureActive = () => {
    CategoryTags.forEach(category => {
       category.classList.remove('active');
    })
}


CategoryTags.forEach((category) => {
    let categoryData = category.dataset.tag.toLowerCase();
    if(category.dataset.tag.toLowerCase()==categorName.textContent.toLowerCase()){
        RemoveFeatureActive();
        category.classList.add('active');
    }
    CategoryCards.forEach((card) => {
        let cardData = card.dataset.category.toLowerCase();
        if (categorName.textContent.toLowerCase() === cardData) {
            card.style.display = 'initial';
        }else {
            card.style.display = 'none';
        }
    });
   category.addEventListener('click', () => {
     
        RemoveFeatureActive();
        category.classList.add('active');
        if(categoryData == 'all'){
            CategoryCards.forEach((card) => {
                card.style.display = 'initial';
            });
        }else{
            CategoryCards.forEach((card) => {
                let cardData = card.dataset.category.toLowerCase();
                if (categoryData === cardData) {
                    card.style.display = 'initial';
                }else {
                    card.style.display = 'none';
                }
            });
        }
        console.log(categoryData,cardData);
    });
});





    