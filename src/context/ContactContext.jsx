import React, {createContext, useState, useEffect, useContext} from 'react';
import {contactService} from '../services/contactService';

const ContactContext = createContext();

export const useContacts = () =>{
    const context = useContext(ContactContext);
    if(!context){
        throw new Error('useContacts must be used within a ContactProvider');
    }
    return context;
};

export const ContactProvider = ({ children }) =>{
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [currentContact, setCurrentContact] = useState(null);

    const fetchContacts = async ()=>{
        setLoading(true);
        setError(null);

        try{
            const data = await contactService.getAll();
            setContacts(data);
        }catch (err){
            setError(err.response?.data || 'Failed to fetch contacts')
        }finally{
            setLoading(false);
        }
    };

    const fetchContactById = async (id) =>{
        setLoading(true);
        setError(null);
        try{
            const data = await contactService.getById(id);
            setCurrentContact(data);
        }catch(err){
            setError(err.response?.data || 'Failed to fetch contacts')
        }
        finally{
            setLoading(false);
           
        }
    };

    const addContact = async (contactData) =>{
        setLoading(true);
        setError(null);
        try{
            const newContact = await contactService.create(contactData);
            setContacts([...contacts, newContact]);
            return { success: true};
        } catch(err){
            setError(err.response?.data || 'Failed to add contact')
            return {success: false, error: err.response?.data};
        }finally{
            setLoading(false);
        }
    }
    const deleteContact = async (id)=>{
        setLoading(true);
        setError(null);
        try{
            await contactService.delete(id);
            setContacts(contacts.filter(c => c.id !== id));
            return { success : true};
        }catch{
            setError(err.response?.data || 'Failed to delete contact')
            return { success: false , error: err.response?.data};
        }finally{
            setLoading(false)

        }
    };


    useEffect(()=>{
        fetchContacts();
    }, []);
    
    const value = {
    contacts,
    loading,
    error,
    selectedContact,
    currentContact,
    setSelectedContact,
    fetchContacts,
    fetchContactById,
    addContact,
    updateContact,
    deleteContact
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
    
};