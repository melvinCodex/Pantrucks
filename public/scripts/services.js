document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.faqs li');
    
    questions.forEach(question => {
        const dropButton = question.querySelector('.drop');
        const answer = question.querySelector('.answer');
        
        // Initially hide the answer
        answer.style.display = 'none';
        
        dropButton.addEventListener('click', () => {
            // Toggle the display of the answer
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
});
