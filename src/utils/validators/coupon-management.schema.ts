import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const CouponManagementForm = z.object({
  brand: z
    .string()
    .min(1, { message: messages.brandRequired })
    .max(15, { message: messages.brandMaxLength }), // string
  couponCode: z
    .string()
    .min(1, { message: messages.couponCodeRequired })
    .max(20, { message: messages.couponCodeMaxLength }), // dropdown selection
  discountTitle: z
    .string()
    .min(1, { message: messages.discountTitleRequired })
    .max(15, { message: messages.discountTitleMaxLength }), // date picker value
  siteURL: z
    .string()
    .min(1, { message: messages.websiteUrlRequired })
    .trim()
    .nullable()
    .refine(
      (value) => {
        return (
          !value ||
          /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(
            value
          )
        );
      },
      {
        message: messages.invalidUrl,
      }
    ),
  brandLogo: z
    .any()
    .refine((files) => {
      return !!files;
    }, messages.brandImageRequired)
    .refine((files) => {
      if (typeof files === 'string') {
        return true;
      } else {
        return files?.size <= MAX_FILE_SIZE;
      }
    }, messages.maxFileSize)
    .refine((files) => {
      if (typeof files === 'string') {
        return true;
      } else {
        return ACCEPTED_IMAGE_TYPES.includes(files?.type);
      }
    }, messages.acceptedImageFormats),
});

export type CouponManagementForm = z.infer<typeof CouponManagementForm>;
