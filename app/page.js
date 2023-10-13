'use client';
import { useState } from 'react';
import { convertToAffiliateURL } from './utils/lib/affiliate';
import Image from 'next/image';
import data from './data/affiliates.json';


const getRandomInt = (max) => Math.floor(Math.random() * max);
const isAmazonURL = (url) => url.includes('amazon.'); 
const encryptID = (text) => {
  const unmaskedLength = Math.ceil(text.length / 2);
  return text.substring(0, unmaskedLength) + '*'.repeat(text.length - unmaskedLength);
};

export default function Home() {
  const [url, setURL] = useState('');
  const [convertedURL, setConvertedURL] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [firstIdChoosen, setFirstIdChoosen] = useState('');
  const [firstIdChoosenEncrypted, setFirstIdChoosenEncrypted] = useState('');
  const [retryConversion, setRetryConversion] = useState(false);
  const [previouslySelectedIDs, setPreviouslySelectedIDs] = useState([]);

  const getNewUser = () => {
    const affiliatesList = data.filter(affiliate => !previouslySelectedIDs.includes(affiliate.affiliateCode));
    return affiliatesList[getRandomInt(affiliatesList.length)].affiliateCode;
  };

  const handleConversion = () => {
    setError('');
    setIsConverting(true);

    if (!isAmazonURL(url)) {
      setError('Error: Debe ser un enlace de Amazon válido.');
      setIsConverting(false);
      return;
    }

    setPreviouslySelectedIDs(prevIDs => [...prevIDs, firstIdChoosen]);
    const currentAffiliateID = getNewUser();
    setFirstIdChoosen(currentAffiliateID);
    setFirstIdChoosenEncrypted(encryptID(currentAffiliateID));
    setConvertedURL(convertToAffiliateURL(url, currentAffiliateID));
    setIsConverting(false);
  };

 

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      padding: '0 16px'  
    }}>
      
      <Image
        src='https://theprocess.es/wp-content/uploads/2023/03/logo-5-2.png'
        width={300}
        height={100}
        className='mb-14'
        alt="Process Logo"   
      />
      <div style={{
        width: '100%',  
        maxWidth: '420px',  
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
             onClick={() => {
        console.log(`Clic hacia ${convertedURL}`);
        window.open(convertedURL, '_blank');
    }}
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
       
        {firstIdChoosen  && !retryConversion &&
  <div className='text-xs font-light text-center mt-2 text-[#614618]'>
    Si {firstIdChoosenEncrypted} es tu ID de afiliado, puedes generar uno nuevo.
    <button className="text-green-900 bg-slate-300" onClick={() => {
      setRetryConversion(true);
      handleConversion();
    }}>haz clic aquí</button>.
  </div>
}
      </div>
      <section className='w-full md:w-1/4 text-center my-12'> 
      <h2>¿Cómo usar el conversor?</h2>
      <p className='font-light text-sm'>Pega el enlace del producto que quieres comprar. Dale a <strong>convertir enlace a afiliado</strong> y, cuando esté listo, haz clic en  <strong>comprar on enlace de afiliado</strong> para navegar a Amazon.
      </p><br></br>
      <p className='font-light text-sm'>Esta herramienta funciona con un sistema de colas para que todos los afiliados puedan obtener comisiones.  </p></section>
    </div>
  );
}


