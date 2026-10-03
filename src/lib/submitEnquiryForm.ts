/* Shared submission handler for the Contact, Talk-to-Us and Franchise forms.
   Posts JSON to a single configurable endpoint so all three forms can be
   pointed at whatever backend/service is chosen, without duplicating the
   fetch/error-handling logic three times. */

export type FormType = 'contact' | 'consultation' | 'franchise';

export type SubmitOutcome =
  | { ok: true }
  | { ok: false; reason: 'no-endpoint' | 'http-error' | 'network-error' };

const FORM_ENDPOINT =
  (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || '/api/enquiry';


export async function submitEnquiryForm(
  formType: FormType,
  fields: Record<string, string>
): Promise<SubmitOutcome> {
  if (!FORM_ENDPOINT) {
    return { ok: false, reason: 'no-endpoint' };
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, ...fields }),
    });

    if (!response.ok) {
      return { ok: false, reason: 'http-error' };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: 'network-error' };
  }
}
