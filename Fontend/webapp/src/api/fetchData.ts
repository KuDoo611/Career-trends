const API_ROOT = (import.meta.env.VITE_API_URL ?? "http://localhost:5263").replace(/\/+$/, '');

export type FetchOptions = {
  method?: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH';
  body?: unknown;
  headers?: Record<string,string>;
  asText?: boolean;
};

export default async function fetchData<T = unknown>(path: string, opts: FetchOptions = {}): Promise<T> {
  const url = path.startsWith('/') ? `${API_ROOT}${path}` : `${API_ROOT}/${path}`;
  const { method = 'GET', body, headers = {}, asText = false } = opts;

  const headersObj: Record<string,string> = { 
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    ...headers 
  };

  const init: RequestInit = {
    method,
    headers: headersObj,
    mode: 'cors', // Explicitly set CORS mode
    credentials: 'omit' // Don't send cookies for now
  };

  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
    headersObj['Content-Type'] = 'application/json';
  }

  console.log('API Request:', { url, method, headers: headersObj, body: init.body });

  try {
    const res = await fetch(url, init);
    console.log('API Response:', { status: res.status, statusText: res.statusText, headers: Object.fromEntries(res.headers.entries()) });
    
    if (!res.ok) {
      const txt = await res.text().catch(()=>null);
      console.error('API Error Response:', txt);
      throw new Error(`API Error ${res.status}: ${txt || res.statusText}`);
    }

    if (asText) return (await res.text()) as unknown as T;
    if (res.status === 204) return null as unknown as T;
    
    const responseData = await res.json();
    console.log('API Success Response:', responseData);
    return responseData as unknown as T;
  } catch (error) {
    console.error('Fetch Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('CORS Error: Máy chủ API cần được cấu hình CORS. Kiểm tra backend setup instructions.');
    }
    throw error;
  }
}
