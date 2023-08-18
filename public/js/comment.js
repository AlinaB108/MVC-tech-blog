const commentButtonHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('textarea[name="commentText"]').value;
  const post_id = document.querySelector('input[name="post-id"]').value;

  if (content && post_id) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .getElementById('addComment')
  .addEventListener('click', commentButtonHandler);
  