import { NotificationErrorProps } from "./notification";

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(errors.map(error => `${error.context}: ${error.message}`).join(","));
  }
}