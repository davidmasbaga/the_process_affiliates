const affiliateIDs = [
    { id: "gatosinpelo07-21" },
    { id: "jzamora01-22" },
    { id: "pcamorra05-22" },
    { id: "phose-22" },

    // ... puedes agregar más ID de afiliados aquí
  ];
  let currentIndex = 0;
  
  function convertToAffiliateURL(url, affiliateID) {
    const baseURL = url.split('?')[0];
  return `${baseURL}?linkCode=ll1&tag=${affiliateID}&language=es_ES&ref_=as_li_ss_tl`;
  }
  
  export { convertToAffiliateURL };
  