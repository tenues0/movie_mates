const newPostHandler = async (event) => {
  event.preventDefault();

  const reviewTitle = document.querySelector('#post-title').value.trim();
  const reviewContent = document.querySelector('#post-content').value.trim();


  if (reviewTitle && reviewContent) {

    const response = await fetch(`/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({
        reviewTitle,
        reviewContent
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