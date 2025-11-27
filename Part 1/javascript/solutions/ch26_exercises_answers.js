// Chapter 26 Exercises: DOM Manipulation (Answers)

// Exercise 1: Selectors and Content
(() => {
  const heading = document.querySelector("h1");
  if (heading) {
    heading.textContent = "DOM Practice";
  }
  const items = document.querySelectorAll(".item");
  items.forEach((el) => console.log(el.textContent));
})();

// Exercise 2: Create and Insert
(() => {
  const list = document.querySelector("#list");
  if (!list) return;

  // Append
  const liAppend = document.createElement("li");
  liAppend.className = "item";
  liAppend.textContent = "New Item";
  list.append(liAppend);

  // Prepend
  const liPrepend = document.createElement("li");
  liPrepend.className = "item";
  liPrepend.textContent = "First Item";
  list.prepend(liPrepend);

  // insertAdjacentHTML after the list
  list.insertAdjacentHTML("afterend", "<p>Inserted after the list</p>");
})();

// Exercise 3: Classes and Styles
(() => {
  const list = document.querySelector("#list");
  const items = document.querySelectorAll(".item");
  // Toggle "highlight" on every other item
  items.forEach((el, idx) => {
    if (idx % 2 === 0) el.classList.toggle("highlight");
  });
  // Add "active" if more than 3 children
  if (list && list.children.length > 3) {
    list.classList.add("active");
  }
  // Inline style
  if (list) list.style.marginTop = "16px";
})();

// Exercise 4: Attributes and Data Attributes
(() => {
  const statusEl = document.querySelector("#status");
  if (statusEl) {
    statusEl.setAttribute("aria-live", "polite");
  }

  const toolbarButtons = document.querySelectorAll(".toolbar button");
  toolbarButtons.forEach((btn) => {
    btn.dataset.role = "cta"; // sets data-role="cta"
    console.log("button data-role:", btn.dataset.role);
  });
})();

// Exercise 5: Event Delegation
(() => {
  const list = document.querySelector("#list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove");
    if (!removeBtn) return; // click didn't originate from a .remove button
    const li = removeBtn.closest("li");
    if (li && list.contains(li)) {
      li.remove();
    }
  });
})();

// Exercise 6: Deep Traversal
(() => {
  const card = document.querySelector(".card");
  if (!card) return;

  const panel = card.closest(".panel");
  if (!panel) return;

  // Try h2 first, then a .panel__header as a fallback
  const header = panel.querySelector("h2, .panel__header");
  if (header) header.textContent = "Updated Header";
})();

// Exercise 7: Performance with DocumentFragment
(() => {
  const bigList = document.querySelector("#big-list");
  if (!bigList) return;

  console.time("append-1000-items");
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    li.textContent = "Item " + i;
    frag.append(li);
  }
  bigList.append(frag);
  console.timeEnd("append-1000-items");
})();
