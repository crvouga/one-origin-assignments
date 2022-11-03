/**
 *
 * @typedef TodoItem
 * @type {object}
 * @property {number} id - an ID.
 * @property {number} userId - an ID.
 * @property {title} title - a title.
 * @property {boolean} completed - is todo completed.
 *
 */

/**
 * @type {TodoItem[]}
 */
let allItems = [];

const list$ = document.getElementById("todo-list");
const button$ = document.getElementById("load-todo-items-button");
const visibilityInput$ = document.getElementById("visibility-input");

//
//
//
//
//

const renderItems = (items) => {
  const visibility = visibilityInput$.value;
  const listHtml = items
    .filter((item) => {
      switch (visibility) {
        case "all": {
          return true;
        }
        case "active": {
          return !item.completed;
        }
        case "completed": {
          return item.completed;
        }
      }
    })
    .map((item) => `<li>${item.completed ? "✅" : ""} ${item.title}</li>`)
    .join("\n");

  list$.innerHTML = listHtml;
};

//
//
//
//
//
//

visibilityInput$.addEventListener("change", () => {
  renderItems(allItems);
});

button$.addEventListener("click", async () => {
  button$.disabled = true;
  list$.innerHTML = `
        <p>
          Loading items...
        </p>
      `;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

    /**
     * @type {TodoItem[]}
     */
    const newItems = await response.json();

    allItems = newItems;

    renderItems(allItems);
    return;
  } catch (error) {
    list$.innerHTML = `
          <p>
            Something went wrong.
          </p>
        `;
    console.error(error);
    return;
  } finally {
    button$.innerHTML = "Fetch";
    button$.disabled = false;
  }
});
