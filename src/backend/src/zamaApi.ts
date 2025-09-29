import axios from 'axios';

export async function sendToZama(message: string, walletAddress: string) {
  const apiKey = process.env.ZAMA_API_KEY;
  const endpoint = process.env.ZAMA_API_ENDPOINT;
  try {
    const response = await axios.post(
      endpoint!,
      { message, walletAddress },
      { headers: { 'Authorization': `Bearer ${apiKey}` } }
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Zama API error');
  }
}
