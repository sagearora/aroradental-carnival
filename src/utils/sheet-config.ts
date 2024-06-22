const config = [
    {
      name: 'Your full name',
      id: 'full_name',
    },
    {
      name: 'Email Address',
      id: 'email',
    },
    {
      name: `Are you currently a patient at Arora Dental? (P.s. you don't need to be a patient to attend this event)`,
      id: 'current_patient',
    },
    {
      name: 'Please select the time-slot that works best for you and your guests.',
      id: 'time_slot',
    },
    {
      name: '# guests',
      id: 'total_guests',
      parse: (val: string) => +val
    },
    {
      name: 'guest names',
      id: 'guest_names',
    },
    {
      name: 'checked in',
      id: 'checked_in',
      parse: (val: string) => +val
    }
  ];
  
  export default config;