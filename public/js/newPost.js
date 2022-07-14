const newPostHandler = async (event) => {
  event.preventDefault();

  const movie_review = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();


  if (movie_review && post_content) {
    console.log(movie_review, post_content)

    const response = await fetch(`/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({
        movie_review,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //check if all good
    if (response.ok) {
      document.location.replace('/api/dashboard');

    } else {
      alert('Error creating new post!');
    }
  }
};

document.querySelector('.newPost-form').addEventListener('submit', newPostHandler);