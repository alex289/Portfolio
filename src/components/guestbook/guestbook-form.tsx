'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { createMessage } from '@/app/[locale]/guestbook/actions';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { toast } from 'sonner';

export function GuestbookForm() {
  const t = useTranslations('pages.guestbook.form');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    try {
      await createMessage(formData);
      formRef.current?.reset();
    } catch (error) {
      const message = (error as Error).message;
      toast.error(t('error.title'), {
        position: 'bottom-right',
        description:
          message === 'RATE_LIMIT_EXCEEDED' ? t('error.rate-limit') : message,
      });
    }
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <InputGroup className="h-10">
        <InputGroupInput
          name="message"
          placeholder={t('placeholder')}
          required
          maxLength={500}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" size="sm" type="submit">
            {t('submit')}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
