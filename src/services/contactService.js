import api from './api'

const CONTACTS_ENDPOINTS = '/contacts';

export const contactService = {
    getAll: async()=>{
        try{
            const response = await api.get(CONTACTS_ENDPOINTS);
            return response.data
        }
     catch (error){
        throw error;
    }
},

getById: async (id) =>{
    try{
        const response = await api.get(`${CONTACTS_ENDPOINTS}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
},

create: async (contactData) =>{
    try{
        const response = await api.post(CONTACTS_ENDPOINTS, contactData);
        return response.data;
    }catch(error){
        throw error;
    }
},

update: async(id, contactData) =>{
    try{
        const response = await api.put(`${CONTACTS_ENDPOINTS}/${id}`,contactData);
        return response.data;
    }catch(error){
        throw error;
    }
},

delete: async(id)=>{
    try{
        const response = await api.delete(`${CONTACTS_ENDPOINTS}/${id}`);
        return response.data;
    }catch (error){
        throw error;
    }
}
}; 