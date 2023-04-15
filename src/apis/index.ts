const customFetch = async (path: string, method: string, body: BodyInit) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const data = await fetch(path, {
      method,
      body,
      headers,
    });
    if (!data.ok) {
      throw Error(data.statusText);
    }
    const result = await data.json();
    if (!result) {
      throw Error('No data');
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default customFetch;
