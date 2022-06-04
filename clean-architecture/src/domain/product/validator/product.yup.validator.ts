import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import { Product } from "../entity/product";

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
      .object()
      .shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().min(1, "Price must be greater than 0").required("Price is required"),
      })
      .validateSync({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      },{
        abortEarly: false
      })
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: "product",
          message: error,
        })
      })
    }
  }
}