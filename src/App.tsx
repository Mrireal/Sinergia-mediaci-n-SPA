import React from 'react';
import { CompanyInfo } from './views/CompanyInfo';
import { AppointmentForm } from './views/AppointmentForm';
import { SocialLinks } from './views/SocialLinks';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

function App() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Company Information */}
          <CompanyInfo />

          {/* Right Side - Contact Form */}
          <div className="relative">
            <AppointmentForm />
          </div>
        </div>
      </div>

      {/* Social Media Floating Button */}
      <SocialLinks />
    </div>
  );
}

export default App;