import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Customer } from '../types/customer';
import { customerService } from '../services/api';

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.formData.driverInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.formData.personalData.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kundenverwaltung</h1>
        <button className="bg-black text-white px-4 py-2 rounded-md">
          + Neuer Kunde
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Kunden suchen..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option>Sortieren nach</option>
          </select>
          <button className="px-4 py-2 border rounded-md">
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Vorname</th>
              <th className="text-left py-4">Nachname</th>
              <th className="text-left py-4">Geburtsdatum</th>
              <th className="text-left py-4">Email</th>
              <th className="text-right py-4">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => {
              const [firstName, lastName] = customer.formData.driverInfo.name.split(' ');
              return (
                <tr key={customer.customerId} className="border-b">
                  <td className="py-4">{firstName}</td>
                  <td>{lastName}</td>
                  <td>{format(new Date(customer.formData.driverInfo.dob), 'dd.MM.yyyy')}</td>
                  <td>{customer.formData.personalData.email}</td>
                  <td className="text-right">
                    <button className="text-gray-600 hover:text-gray-900">
                      <LinkIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Zeige 1-10 von {customers.length} Einträgen
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md">Zurück</button>
          <button className="px-4 py-2 border rounded-md bg-black text-white">1</button>
          <button className="px-4 py-2 border rounded-md">2</button>
          <button className="px-4 py-2 border rounded-md">3</button>
          <button className="px-4 py-2 border rounded-md">Weiter</button>
        </div>
      </div>
    </div>
  );
}
