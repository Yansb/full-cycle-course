export type NotificationErrorProps = {
  message: string;
  context: string;
}

export default class Notification{
  private errors: NotificationErrorProps[] = [];

  getErrors() {
    return this.errors
  }

  addError(error: NotificationErrorProps){
    this.errors.push(error)
  }

  messages(context?: string): string{
    let message = "";
    for(const error of this.errors) {
      if(context === undefined ||  context === error.context){
        message += `${error.context}: ${error.message},`
      }
    }

    return message
  }

  hasErrors(): boolean{
    return this.errors.length > 0
  }
}