import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";
export default class Customer extends Entity {

    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string,) {
        super();
        this._name = name;
        this._id = id;

        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }


    }

    validate() {
        if (this._name.length === 0) {
            this.notification.addError({
                context: "Customer",
                message: "Name is required",
            });

        }

        if (this.id.length === 0) {
            this.notification.addError({
                context: "Customer",
                message: "Id is required",
            });

        }
    }


    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get isActive() {
        return this._active;
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
            throw new Error('Address is mandatory to activate a customer');
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;

    }

    get Address(): Address {
        return this._address;
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
    }

}