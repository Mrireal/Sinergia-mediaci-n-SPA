import React, { useState } from 'react';
import { MessageCircle, Linkedin, Mail } from 'lucide-react';

export function SocialLinks() {
  const [showSocial, setShowSocial] = useState(false);

  return (
    <div className="fixed bottom-6 left-6">
      <button 
        onClick={() => setShowSocial(!showSocial)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 
          transition duration-300"
      >
        <MessageCircle size={24} />
      </button>

      {showSocial && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-lg p-4 space-y-4">
          <a href="https://wa.me/1234567890" 
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 
              transition duration-300">
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>
          <a href="https://linkedin.com/company/sinergia-mediacion" 
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 
              transition duration-300">
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:contacto@sinergiamediacion.cl" 
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 
              transition duration-300">
            <Mail size={20} />
            <span>Email</span>
          </a>
        </div>
      )}
    </div>
  );
}