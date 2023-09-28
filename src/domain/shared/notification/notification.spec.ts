import Notification from "./notification";

describe("Notification Unit Test", () => {
  it("Should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message");

    const error2 = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2"
    );

    const error3 = {
        message: "error order2",
        context: "order",
      };
      notification.addError(error3);
  
      expect(notification.messages("customer")).toBe(
        "customer: error message,customer: error message2"
      );

      expect(notification.messages("order")).toBe(
        "order: error order2"
      );

      expect(notification.messages()).toBe(
        "customer: error message,customer: error message2,order: error order2"
      );
  });

  it("Shpuld have at least one error", ()=>{
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true)
  })

  it("Should get all errors props", ()=>{
    const notification = new Notification()
    const error = {
        message: "error message",
        context: "customer",
      };
      notification.addError(error);

      expect(notification.getErrors()).toStrictEqual([error])
  });
});
