async function get(endpoint) {  
  try {
    const baseUrl = 'https://fantasy.premierleague.com/api/';
    const response = await fetch(baseUrl + endpoint);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  
    throw new Error ('Request failed!');
    
  } catch (error) {
    console.log(error);
  }
}

export default get;