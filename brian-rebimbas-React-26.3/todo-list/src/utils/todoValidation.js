export const MAX_TODO_TITLE_LENGTH = 100;

export function sanitizeTodoTitle(title) {
  return title.trim();
}

export function isValidTodoTitle(title) {
  const sanitizedTitle = sanitizeTodoTitle(title);

  if (!sanitizedTitle) {
    return false;
  }

  if (sanitizedTitle.length > MAX_TODO_TITLE_LENGTH) {
    return false;
  }

  return true;
}

export function getTodoTitleError(title) {
  const sanitizedTitle = sanitizeTodoTitle(title);

  if (!sanitizedTitle) {
    return "Todo title is required.";
  }

  if (sanitizedTitle.length > MAX_TODO_TITLE_LENGTH) {
    return `Todo title must be ${MAX_TODO_TITLE_LENGTH} characters or less.`;
  }

  return "";
}
