document.addEventListener('DOMContentLoaded', () => {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-desc').value.trim();

    if (title && content) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
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


const startUpdateHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'GET',
    });

    if (response.ok) {  
      const updateTitleField = document.querySelector('#update-title');
      const updateContentField = document.querySelector('#update-content');
      
      const updatePost = await response.json();
      
      updateTitleField.value = updatePost.title;
      updateContentField.value = updatePost.content;
      
    } else {
      alert('Failed to start updating post');
    }
  }
};

const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#update-title').value;
  const content = document.querySelector('#update-content').value;
  const date_created = new Date().toLocaleDateString();
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};