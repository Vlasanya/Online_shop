import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for user data
interface User {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  address: { city: string; street: string; number: number; zipcode: string };
  phone: string;
}

interface UserContextProps {
  users: User[];
  fetchUsers: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch('https://fakestoreapi.com/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within a UserProvider');
  return context;
};
