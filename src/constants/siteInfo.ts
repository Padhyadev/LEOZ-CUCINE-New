/* Single source of truth for brand name, address, phone numbers, email and
   opening hours, so these can no longer drift between the footer, Contact
   page and anywhere else they appear. */

export const BRAND_NAME = 'LEOZ Cucine';

export const EMAIL = 'director@leozartofambience.com';
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const PHONE_SALES_DISPLAY = '+91 98250 22616';
export const PHONE_SALES_HREF = 'tel:+919825022616';
export const PHONE_SALES_WHATSAPP_NUMBER = '919825022616';

export const PHONE_CARE_DISPLAY = '+91 98250 22616';
export const PHONE_CARE_HREF = 'tel:+919825022616';

export const WEBSITE_URL = 'https://www.leozartofambience.com';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/leoz.furniture',
  youtube: 'https://www.youtube.com/@leozfurniture',
  facebook: 'https://www.facebook.com/leozfurniture',
  linkedin: 'https://www.linkedin.com/company/leozfurniture',
  officeMap: 'https://maps.app.goo.gl/xT39MPBvZR4v923E9',
  factoryMap: 'https://maps.app.goo.gl/mVzVJEBEg3G3re7CA',
};

export const ADDRESS_LINE =
  '509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059, Gujarat';

export const FACTORY_ADDRESS_LINE =
  'LEOZ Furniture Pvt. Ltd., Kothari Cross Road, Rakanpur–Satej Road, Rakanpur, Gandhinagar – 382721, Gujarat';

export const HOURS_SHORT = 'Mon–Sat 10 AM–7 PM, Sun by appointment';
export const HOURS_LONG_WEEKDAY = 'Monday – Saturday: 10:00 AM – 7:00 PM';
export const HOURS_LONG_SUNDAY = 'Sunday: By appointment only';

export function buildWhatsAppHref(message: string): string {
  return `https://wa.me/${PHONE_SALES_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

