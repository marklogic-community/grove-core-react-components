import { Link } from 'react-router-dom'

const headers = {
  name: 'Name',
  age: 'Age',
  link: 'Link',
  hireDate: 'Hire Date',
  isHuman: 'Human'
};
//<Link to={'/weaponsSystem/' + mdsValue}>{mdsValue}</Link>
const data = [
  {
    name: 'Fry, Philip J.',
    age: '23',
    link: <Link to="/">11</Link>,
    hireDate: '3000-01-01',
    isHuman: true
  },
  {
    name: 'Leela, Turanga',
    age: '25',
    link: <Link to="/">1</Link>,
    hireDate: '3000-01-01',
    isHuman: true
  },
  {
    name: 'Rodriguez, Bender Bending',
    age: '40',
    link: <Link to="/">Robot Inc.</Link>,
    hireDate: '3000-01-01',
    isHuman: false
  },
  {
    name: 'Farnsworth, Hubert J.',
    age: '183',
    hireDate: '2867-08-31',
    isHuman: true
  },
  {
    name: 'Wong, Amy',
    age: '22',
    hireDate: '2998-12-15',
    isHuman: true
  },
  {
    name: 'Zoidberg, John A.',
    age: '53',
    link: <Link to="/">Under the Sea</Link>,
    hireDate: '2986-03-14',
    isHuman: false
  },
  {
    name: 'Conrad, Hermes',
    age: '28',
    link: <Link to="/">Limbo</Link>,
    hireDate: '2992-06-22',
    isHuman: true
  }
];

export { headers, data }