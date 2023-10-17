import axios from 'axios';


  function convertToAffiliateURL(url, affiliateID) {
    const baseURL = url.split('?')[0];
  return `${baseURL}?linkCode=ll1&tag=${affiliateID}&language=es_ES&ref_=as_li_ss_tl`;
  }
  
  async function expandirUrl(urlCorta) {
    try {
        const respuesta = await axios.get(urlCorta, {
            maxRedirects: 0, // Evitar que axios siga redirecciones automáticamente
        });

        // Si llegamos a este punto, no hubo redirección
        return urlCorta;
    } catch (error) {
        if (error.response && error.response.headers.location) {
            return error.response.headers.location; // Devolver la URL de redirección
        }
        console.error('Error al expandir la URL:', error);
        return null;
    }
}


  export { convertToAffiliateURL, expandirUrl };
  