class API {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
    async fetchAPI(endpoint, method, data) {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (data) {
        options.body = JSON.stringify(data);
      }
      const response = await fetch(this.baseURL + endpoint, options);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      return await response.json();
    }
    getAllAffiliates() {
      return this.fetchAPI("/process-affiliates", "GET");
    }
   
  }
  
  export default API;
  