import React from 'react';
import { Scale } from 'lucide-react';

export function CompanyInfo() {
  return (
    <div className="space-y-8 pt-20 lg:pt-32">
      <div className="flex items-center space-x-4">
        <Scale size={48} className="text-blue-400" />
        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          Sinergia mediación SPA
        </h1>
      </div>
      <p className="text-xl text-gray-200 leading-relaxed">
        Expertos en mediación y resolución de conflictos. Nuestro equipo de profesionales 
        está comprometido con encontrar soluciones efectivas y justas para todas las partes involucradas.
      </p>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Nuestros Servicios</h2>
        <ul className="text-gray-200 space-y-2">
          <li>• Mediación familiar</li>
          <li>• Resolución de conflictos comerciales</li>
          <li>• Asesoría legal especializada</li>
          <li>• Mediación laboral</li>
        </ul>
      </div>
    </div>
  );
}