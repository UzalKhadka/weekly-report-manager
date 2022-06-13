import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const users = [
  {
    name: 'Admin',
    email: 'admin@atc.com',
    password: bcrypt.hashSync('Admin', 10),
    role: process.env.ADMIN_ROLE,
    department: '62a7895c5954a6d154e73679',
  },
  {
    name: 'Alok Baluni',
    email: 'alok@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7896c5954a6d154e7367b',
  },
  {
    name: 'Anshul Verma',
    email: 'anshul@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7897a5954a6d154e7367d',
  },
  {
    name: 'Anurag Singh',
    email: 'anurag@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7896c5954a6d154e7367b',
  },
  {
    name: 'Disharna Das',
    email: 'disharna@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7897a5954a6d154e7367d',
  },
  {
    name: 'Khushboo Mudgal',
    email: 'khushboo@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7897a5954a6d154e7367d',
  },
  {
    name: 'Lovish Sethi',
    email: 'lovish@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7896c5954a6d154e7367b',
  },
  {
    name: 'Raghvendra Singh',
    email: 'raghvendra@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7897a5954a6d154e7367d',
  },
  {
    name: 'Subham Sahu',
    email: 'subham@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7897a5954a6d154e7367d',
  },
  {
    name: 'Ujjal Khadka',
    email: 'ujjal@atc.com',
    role: process.env.EMPLOYEE_ROLE,
    password: bcrypt.hashSync('Employee', 10),
    department: '62a7896c5954a6d154e7367b',
  },
]

export default users
