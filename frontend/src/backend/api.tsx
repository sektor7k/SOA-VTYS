const apiUrl = 'http://localhost:3030';

export async function Request(apirequestmethod: string, data: any) {
  try {
    const headers = {
      'Content-Type': 'application/json' 
    };

    const response = await fetch(`${apiUrl}/${apirequestmethod}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }); 

    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }
  } catch (error) {
    console.error('Error in Request function:', error);
    throw error; // Hata yönetimi için hatayı dışarı fırlat
  }
}

export async function Request2(apirequestmethod: string, data:string) {
  try {

    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${apiUrl}/${apirequestmethod}/${data}`, {
      method: 'GET',
      headers: headers
    });
    

    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }
  } catch (error) {
    console.error('Error in Request2 function:', error);
    throw error;
  }
}

export async function Request3(apirequestmethod: string) {
  try {

    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${apiUrl}/${apirequestmethod}`, {
      method: 'GET',
      headers: headers
    });
    

    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }
  } catch (error) {
    console.error('Error in Request3 function:', error);
    throw error;
  }
}