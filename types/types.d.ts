declare module '@/messages/*' {
    import { type AbstractIntlMessages } from 'next-intl';
    const messages: AbstractIntlMessages;
    export default messages;
  }