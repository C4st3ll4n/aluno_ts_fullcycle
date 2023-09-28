export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private readonly errors: NotificationErrorProps[] = [];

  getErrors(): NotificationErrorProps[]{
    return this.errors;
  }

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    let messages = this.errors;
    if (context !== undefined) {
      messages = messages.filter((error) => error.context === context);
    }
    return messages.map((err) => `${err.context}: ${err.message}`).join(",");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
