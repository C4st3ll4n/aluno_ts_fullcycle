import ValidatorInterface from "../../shared/validator/validator.interface";
import * as yup from "yup";
import Product from "../entity/product";

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().positive("Price is required and bigger then zero").required("Price is required and bigger then zero")
        })
        .validateSync(
          {
            id: entity.identificador,
            name: entity.name,
            price: entity.price
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.sort().forEach((e) => {
        entity.notification.addError({
          context: "product",
          message: e,
        });
      });
    }
  }
}
