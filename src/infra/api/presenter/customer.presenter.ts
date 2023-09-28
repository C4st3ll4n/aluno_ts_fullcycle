import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../domain/usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static toXML(data: OutputListCustomerDto): string{
        const xmlOptions = {
            header: true,
            ident: " ",
            newLine:"/n",
            allowEmpty: true
        };

        return toXML({
            customers:{
                customer: data.customers.map((c) => ({
                    id: c.id,
                    name: c.name,
                    address: {
                        street: c.address.street,
                        city: c.address.city,
                        zipcode: c.address.zipcode,
                        number: c.address.houseNumber
                    }
                }))
            }
        }, xmlOptions)
    }
}