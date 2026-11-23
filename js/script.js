document.addEventListener("DOMContentLoaded", () => {
  // Interactive comment submission handler
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("visitorName").value.trim();
      const rating = document.getElementById("rating").value;
      const message = document.getElementById("message").value.trim();

      if (!name || !message) return;

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const entry = document.createElement("div");
      entry.className = "card animate-in";
      entry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #00f3ff; font-family: 'JetBrains Mono', monospace;">@${name}</strong>
          <span style="color: #93c5fd; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">RATING: ${rating}/5 ★ | ${timestamp}</span>
        </div>
        <p style="margin-top: 0.6rem; color: #e2e8f0;">${message}</p>
      `;

      commentList.prepend(entry);
      commentForm.reset();
      alert("Transmission received! Your feedback has been logged.");
    });
  }
});
