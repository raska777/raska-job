// components/Help/EmergencyContacts.tsx
'use client';

import styles from './EmergencyContacts.module.css';

const contacts = [
  {
    name: 'Emergency',
    number: '112',
    description: 'Police'
  },
  {
    name: 'Emergency',
    number: '119',
    description: 'Fire & Ambulance'
  },
  {
    name: 'Immigration',
    number: '1345',
    description: 'Immigration Contact Center'
  },
  {
    name: 'Labor Rights',
    number: '02-2675-7114',
    description: 'Foreign Workers Support Center'
  },
  {
    name: 'Medical Help',
    number: '1339',
    description: 'Medical Emergency'
  }
];

export default function EmergencyContacts() {
  return (
    <div className={styles.emergencyContacts}>
      <h3 className={styles.title}>Emergency Contacts in Korea</h3>
      <div className={styles.contactList}>
        {contacts.map((contact, index) => (
          <div key={index} className={styles.contactCard}>
            <div className={styles.contactName}>{contact.name}</div>
            <div className={styles.contactNumber}>
              <a href={`tel:${contact.number.replace(/-/g, '')}`}>{contact.number}</a>
            </div>
            <div className={styles.contactDesc}>{contact.description}</div>
          </div>
        ))}
      </div>
      <div className={styles.note}>
        <p>All services are available in multiple languages including English.</p>
      </div>
    </div>
  );
}