import dayjs from "dayjs"

const config: {
  [id: string]: {
    id: string
    parse?: Function
  }
} = {
  name: {
    id: 'name',
  },
  email: {
    id: 'email',
  },
  timestamp: {
    id: 'timestamp',
    parse: (val: string) => dayjs(val)
  },
  current_patient: {
    id: 'current_patient',
  },
  time_slot: {
    id: 'time_slot',
  },
  total_guests: {
    id: 'total_guests',
    parse: (val: string) => +val
  },
  guest_names: {
    id: 'guest_names',
  },
  checked_in: {
    id: 'checked_in',
    parse: (val: string) => +val
  },
  category: {
    id: 'category',
  }
};

export default config;