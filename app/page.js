'use client'
import { useState, useEffect } from 'react';
import { convertToAffiliateURL } from './utils/lib/affiliate';
import Image from 'next/image';
import API from './utils/lib/apiClass';

export default function Home() {
  const [url, setURL] = useState('');
  const [convertedURL, setConvertedURL] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [affiliate, setAffiliate] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const api = new API('api')

  useEffect(() => {
    // Función para obtener el índice actual de la base de datos al cargar el componente
    async function getCurrentIndex() {
      try {
        const response = await api.getAllAffiliates();  // Ruta del endpoint que devuelve el índice actual
        setCurrentIndex(response.currentIndex);
      } catch (err) {
        ''
      }
    }

    getCurrentIndex();
  }, []);
  async function fetchAffiliatesID() {
    
    try {
      const affiliatesData = await api.getAllAffiliates();
      setAffiliate(affiliatesData.affiliates);
      return affiliatesData.affiliates; 
    } catch (err) {
      ''
      return [];  //
    }
  }
  

  const handleConversion = async () => {
    setError('');
    setIsConverting(true);
  
    if (!isAmazonURL(url)) {
      setError('Error: Debe ser un enlace de Amazon válido.');
      setIsConverting(false);
      return;
    }
    console.time('Consulta a la base de datos');
    const affiliatesData = await fetchAffiliatesID();  // <-- Espera a que se completen los afiliados
    console.timeEnd('Consulta a la base de datos');
    
    // Comprueba si hay datos en el array y si el índice es válido
    if (!affiliatesData.length || currentIndex >= affiliatesData.length) {
      setError('Error: Datos de afiliado no disponibles.');
      setIsConverting(false);
      return;
    }
  
    await new Promise(resolve => setTimeout(resolve, 500));
    const currentAffiliateID = affiliatesData[currentIndex].affiliate_id;
    const newURL = convertToAffiliateURL(url, currentAffiliateID);
    setConvertedURL(newURL);
    setIsConverting(false);
  
    // Actualización del índice en la base de datos
    try {
      const updatedIndex = (currentIndex + 1) % affiliatesData.length;
      await fetch('/api/index', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentIndex: updatedIndex }),
      });
      setCurrentIndex(updatedIndex);
    } catch (err) {
     ''
    }
  }
  
  

 
  const isAmazonURL = (url) => {
    
    return url.includes('amazon.'); // Ejemplo simple
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh'
    }}>
      
      <Image
      src='https://theprocess.es/wp-content/uploads/2023/03/logo-5-2.png'
      width={300}
      height={100}
      className='mb-14'   />
      <div style={{
        width: '420px', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '10px'
      }}>
        
        <input 
          type='text' 
          value={url} 
          onChange={(e) => setURL(e.target.value)} 
          placeholder='Introduce la URL de Amazon' 
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%'
          }}
        />

        <div className='flex gap-2 justify-end'>
        <button 
  onClick={handleConversion}
  disabled={isConverting || !url.trim() || convertedURL}
  
  style={{
    padding: '10px 15px',
    fontSize: '13px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: (isConverting || !url.trim() || convertedURL) ? '#f4f3ef' : '#A27E42',
    color: 'black',
    lineHeight:'1.1rem',
    cursor: (isConverting || !url.trim() || convertedURL) ? 'not-allowed' : 'pointer'
  }}
>
  {isConverting ? 'Convirtiendo...' : 'Convertir enlace a afiliado'}
  
</button>
          <button 
            onClick={() => window.open(convertedURL, '_blank')}
            disabled={!convertedURL}
            style={{
              padding: '10px 15px',
              fontSize: '13px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: convertedURL ? '#D1C6A6' : '#f4f3ef',
              color: 'black',
              lineHeight:'1.1rem',
              cursor: convertedURL ? 'pointer' : 'not-allowed'
            }}
          >
            Comprar con enlace de afiliado
          </button>
          </div>
        {error && <div className='text-xs font-light text-center mt-8 text-[#614618]'>{error}</div>}
        {convertedURL && !error && <div className='text-xs font-bold text-center mt-8 text-[#614618]'>¡Convertido! Ya puedes Comprar con el enlace de afiliado</div>}
      </div>
      <section className='w-1/4 text-center my-12'> 
      <h2>¿Cómo usar el conversor?</h2>
      <p className='font-light text-sm'>Pega el enlace del producto que quieres comprar. Dale a <strong>convertir enlace a afiliado</strong> y, cuando esté listo, haz clic en  <strong>comprar on enlace de afiliado</strong> para navegar a Amazon.
      </p><br></br>
      <p className='font-light text-sm'>Esta herramienta funciona con un sistema de colas para que todos los afiliados puedan obtener comisiones.  </p></section>
    </div>
  );
}


