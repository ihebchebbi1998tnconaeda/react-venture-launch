import axios from 'axios';

const API_URL = 'https://www.fioriforyou.com/backfiori/track_visitor.php';
const MAX_RETRIES = 2;
const RETRY_DELAY = 40000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface VisitorData {
  page_visitors: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data?: {
    ip: string;
    city: string;
    country: string;
    page: string;
    date: string;
  };
}

export const trackVisitor = async (pageName: string, retryCount = 0): Promise<void> => {
  try {

    const visitorData: VisitorData = {
      page_visitors: pageName
    };


    const response = await axios.post<ApiResponse>(API_URL, visitorData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000
    });


    if (response.data.status === 'success') {
    } else {
      throw new Error(response.data.message || 'Unknown error occurred');
    }
  } catch (error) {

    if (retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY * (retryCount + 1));
      return trackVisitor(pageName, retryCount + 1);
    }

  }
};