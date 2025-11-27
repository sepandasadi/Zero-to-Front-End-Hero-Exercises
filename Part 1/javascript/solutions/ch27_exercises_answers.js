// Chapter 27 Exercises: Events and Interactivity (Answers)

// Exercise 1: Button Click
(() => {
  const btn = document.querySelector("#logBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      console.log("Clicked!");
    });
  }
})();

// Exercise 2: Toggle Visibility
(() => {
  const btn = document.querySelector("#toggleBtn");
  const para = document.querySelector("#para");
  if (btn && para) {
    btn.addEventListener("click", () => {
      para.classList.toggle("hidden");
    });
  }
})();

// Exercise 3: Form Handling
(() => {
  const form = document.querySelector("#userForm");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  if (form && nameInput && emailInput) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameVal = nameInput.value;
      const emailVal = emailInput.value;
      if (nameVal.trim() === "") {
        console.log("Name is required");
        return;
      }
      console.log("Name:", nameVal);
      console.log("Email:", emailVal);
    });
  }
})();

// Exercise 4: Event Delegation
(() => {
  const list = document.querySelector("#colorList");
  if (list) {
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li || !list.contains(li)) return;
      li.style.color = "tomato";
    });
  }
})();

// Exercise 5: Dynamic List
(() => {
  const addBtn = document.querySelector("#addItem");
  const items = document.querySelector("#items");
  if (addBtn && items) {
    addBtn.addEventListener("click", () => {
      const li = document.createElement("li");
      li.textContent = "New item";
      items.append(li);
    });
  }
})();

// Exercise 6: Key Detection
(() => {
  const search = document.querySelector("#search");
  if (search) {
    search.addEventListener("keyup", (e) => {
      console.log("Key pressed:", e.key);
    });
  }
})();

// Exercise 7: Remove Listener
(() => {
  const onceBtn = document.querySelector("#onceBtn");
  if (onceBtn) {
    function handleOnce() {
      console.log("Once");
      onceBtn.removeEventListener("click", handleOnce);
    }
    onceBtn.addEventListener("click", handleOnce);
  }
})();
