document.addEventListener('DOMContentLoaded', () => {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-name').value.trim();
    const description = document.querySelector('#post-desc').value.trim();

    if (name && description) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create a post');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete a post');
      }
    }
  };

  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);

  // Make sure to add a check for .post-list's existence before adding the event listener
  const postList = document.querySelector('.post-list');
  if (postList) {
    postList.addEventListener('click', delButtonHandler);
  }
});