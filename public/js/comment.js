const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#new-comment').value.trim();

    const post_id = event.target.getAttribute('data-id');
    
    console.log(post_id);

    if (comment_text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
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