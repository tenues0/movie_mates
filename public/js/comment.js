const commentFormHandler = async (event) => {
    event.preventDefault();

    const rating_content = document.querySelector('#new-comment').value.trim();

    const movie_review = event.target.getAttribute('data-id');
    
    console.log(movie_review);

    if (rating_content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                rating_content,
                movie_review
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);