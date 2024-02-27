import * as Yup from 'yup';
import { messages } from '@/config/messages';




export const invoiceFormSchema = Yup.object().shape({
  client_id: Yup.string().required(messages.RecipientIsRequired).trim(),
  invoice_number: Yup.string().required(messages.InvoiceNumberIsRequired).min(2, messages.InvoiceNumberIsRequired).max(10, messages.InvoiceNumberMaxLength),
  invoice_date: Yup.date().required(messages.createDateIsRequired),
  due_date: Yup.date().required(messages.dueDateIsRequired).min(Yup.ref('invoice_date'), 'Due date cannot be earlier than invoice date'),
  invoice_content: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required(messages.itemNameIsRequired).max(20, messages.itemNameLength),
      description: Yup.string().required(messages.itemDescIsRequired).max(150, messages.invoiceDescriptionLength),
      qty: Yup.number().integer(messages.quantytyAllowInteger).required(messages.itemQtyIsRequired).max(9999999, messages.quantitymaxDigitLength).test('is-integer', messages.quantytyAllowInteger, value => Number.isInteger(value)),
      tax: Yup.number().max(100, messages.maxTaxIsRequired).required(messages.taxIsRequired),
      rate: Yup.number().required(messages.rateIsRequired).max(9999999, messages.ratemaxDigitLength),
    })
  ),
});



// export const invoiceFormSchema = z.object({
//   fromName: z.string().min(1, { message: messages.nameIsRequired }),
//   invoice_number: z
//     .string()
//     .min(2, { message: messages.InvoiceNumberIsRequired })
//     .max(10, { message: messages.InvoiceNumberMaxLength })
//     .optional(),
//   client_id: z.string().min(1, { message: messages.nameIsRequired }),
//   fromAddress: z.string().min(1, { message: messages.addressIsRequired }),
//   fromPhone: z.string().optional(),
//   name: z.string().min(1, { message: messages.nameIsRequired }).optional(),
//   toAddress: z.string().min(1, { message: messages.addressIsRequired }),
//   toPhone: z.string().optional(),
//   invoice_date: z.date({
//     required_error: messages.createDateIsRequired,
//   }),
//   due_date: z.date({
//     required_error: messages.dueDateIsRequired,
//   }),
//   status: z
//     .string({
//       required_error: messages.statusIsRequired,
//     })
//     .optional(),
//   // taxes: z.coerce.number().min(1, { message: messages.taxIsRequired }),
//   invoice_content: z.array(
//     z.object({
//       item: z
//         .string()
//         .min(1, { message: messages.itemNameIsRequired })
//         .max(20, { message: messages.itemNameLength })
//         .optional(),
//       description: z
//         .string()
//         .min(1, { message: messages.itemDescIsRequired })
//         .max(150, { message: messages.invoiceDescriptionLength })
//         .optional(),
//       qty: z.coerce
//         .number()
//         .min(1, { message: messages.itemQtyIsRequired })
//         .optional(),
//       // amount: z.coerce
//       //   .number()
//       //   .min(1, { message: messages.itemPriceIsRequired })
//       //   .max(7, { message: messages.itemPriceMaximumLength })
//         // ,
//       tax: z.coerce.number().min(1, { message: messages.taxIsRequired }).max(100, { message: messages.maxTaxIsRequired }).optional(),
//       rate: z.coerce.number().min(1, { message: messages.rateIsRequired }).optional(),
//     })
//   ),
// });

// // generate form types from zod validation schema
// export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;
// Generate TypeScript types from the Yup validation schema
export type InvoiceFormInput = Yup.InferType<typeof invoiceFormSchema>;
