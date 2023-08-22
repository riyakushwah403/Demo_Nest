import { User } from '../../user/schema/user.schema';
import { UserRole } from '../../user/Enum/userRole';
export const mockUsers: User[] = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: 'hashedPassword1',
    contactNo: 1234567890,
    DOB: new Date('1990-01-01'),
    address: '123 Main St, City',
    role: UserRole.USER,
    gender: 'male',
    IsActive: true,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: 'hashedPassword2',
    contactNo: 9876543210,
    DOB: new Date('1985-05-15'),
    address: '456 Park Ave, Town',
    role: UserRole.ADMIN,
    gender: 'female',
    IsActive: true,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
 
];
