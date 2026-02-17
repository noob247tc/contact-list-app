import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <div className="App">
          <header className="app-header">
            <h1>Contact List Application</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={
                <div className="home-page">
                  <section className="form-section">
                    <ContactForm />
                  </section>
                  <section className="list-section">
                    <ContactList />
                  </section>
                </div>
              } />
              <Route path="/contact-detail/:id" element={<ContactDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ContactProvider>
  );
}

export default App;