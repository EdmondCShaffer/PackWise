
export const sendPackingRequest = async (requestBody: any) => {
    const apiKey = import.meta.env.VITE_APP_RAPID_API_KEY 
  
    const response = await fetch('https://api.paccurate.io/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  };