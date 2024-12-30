document.addEventListener("DOMContentLoaded", () => {
  
  const body = document.body;
  const container = document.createElement("div");
  container.id = "container";
  container.style.cssText = `
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
  body.appendChild(container);

  const header = document.createElement("h1");
  header.textContent = "Коментарі до блогу";
  header.style.cssText = `
  text-align: center;
  color: #333;
`;
  container.appendChild(header);

  const commentForm = document.createElement("form");
  commentForm.id = "comment-form";
  const commentInput = document.createElement("textarea");
  commentInput.placeholder = "Напишіть коментар...";
  commentInput.style.cssText = `
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: none;
`;

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Додати коментар";
  submitButton.style.cssText = `
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

  commentForm.appendChild(commentInput);
  commentForm.appendChild(submitButton);
  container.appendChild(commentForm);

  const commentList = document.createElement("ul");
  commentList.id = "comment-list";
  commentList.style.cssText = `
  list-style: none;
  padding-left: 0;
  margin-top: 20px;
`;
  container.appendChild(commentList);

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  function renderComments() {
    commentList.innerHTML = "";
    comments.forEach((comment, index) => {
      const li = document.createElement("li");
      li.style.cssText = `
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #fff;
    `;

      const commentContent = document.createElement("p");
      commentContent.textContent = comment.text;
      li.appendChild(commentContent);

      const timeStamp = document.createElement("span");
      timeStamp.textContent = `Дата: ${new Date(
        comment.time
      ).toLocaleString()}`;
      timeStamp.style.cssText = `
      display: block;
      font-size: 0.9em;
      color: #777;
    `;
      li.appendChild(timeStamp);

      const replyButton = document.createElement("button");
      replyButton.textContent = "Відповісти";
      replyButton.style.cssText = `
      padding: 5px 10px;
      margin-top: 5px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
      replyButton.addEventListener("click", () => replyToComment(index));
      li.appendChild(replyButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Видалити";
      deleteButton.style.cssText = `
      padding: 5px 10px;
      margin-left: 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
      deleteButton.addEventListener("click", () => deleteComment(index));
      li.appendChild(deleteButton);

      if (comment.replies && comment.replies.length > 0) {
        const replyList = document.createElement("ul");
        replyList.style.cssText = `
        list-style: none;
        padding-left: 20px;
        margin-top: 10px;
      `;
        comment.replies.forEach((reply) => {
          const replyItem = document.createElement("li");
          replyItem.style.cssText = `
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 5px;
          background-color: #f9f9f9;
        `;

          const replyContent = document.createElement("p");
          replyContent.textContent = reply.text;
          replyItem.appendChild(replyContent);

          const replyTimeStamp = document.createElement("span");
          replyTimeStamp.textContent = `Дата: ${new Date(
            reply.time
          ).toLocaleString()}`;
          replyTimeStamp.style.cssText = `
          display: block;
          font-size: 0.9em;
          color: #777;
        `;
          replyItem.appendChild(replyTimeStamp);
          replyList.appendChild(replyItem);
        });
        li.appendChild(replyList);
      }

      commentList.appendChild(li);
    });
  }

  function addComment(e) {
    e.preventDefault();

    const commentText = commentInput.value.trim();
    if (!commentText) return;

    const newComment = {
      text: commentText,
      time: Date.now(),
      replies: [],
    };

    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
    commentInput.value = "";
  }

  function replyToComment(commentIndex) {
    const replyText = prompt("Ваша відповідь:");
    if (!replyText) return;

    const reply = {
      text: replyText,
      time: Date.now(),
    };

    comments[commentIndex].replies.push(reply);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }

  function deleteComment(commentIndex) {
    if (confirm("Ви справді хочете видалити цей коментар?")) {
      comments.splice(commentIndex, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments();
    }
  }

  commentForm.addEventListener("submit", addComment);

  renderComments();
});
