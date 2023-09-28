import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
  _name: string;
  _address!: Address;
  _active: boolean = false;
  _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super(id);
    this.id = id;
    this._name = name;
    this.validate();

    if(this.notification.hasErrors()){
        throw new NotificationError(this.notification.getErrors())
    }
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  set name(name: string) {
    this._name = name;
  }

  get identificador():string {
    return this.id;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  set address(address: Address) {
    this._address = address;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      this.notification.addError({
        context: "customer",
        message: "Address is mandatory to activate",
      });
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
