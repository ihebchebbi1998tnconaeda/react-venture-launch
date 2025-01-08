import axios from 'axios';
import { Product } from '../types/product';

const BASE_URL = 'https://respizenmedical.com/fiori';

interface ApiResponse {
  status: string;
  count: number;
  products: {
    id_product: string;
    reference_product: string;
    nom_product: string;
    img_product: string;
    img2_product: string;
    img3_product: string;
    img4_product: string;
    description_product: string;
    type_product: string;
    category_product: string;
    itemgroup_product: string;
    price_product: string;
    qnty_product: string;
    xxl2_size: string;
    s_size: string;
    m_size: string;
    l_size: string;
    xl_size: string;
    xxl_size: string;
    status_product: string;
    related_products: string;
    color_product: string;
    createdate_product: string;
  }[];
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/get_all_articles.php`);
    
    if (response.data.status === 'success') {
      return response.data.products.map(product => ({
        id: parseInt(product.id_product),
        name: product.nom_product,
        material: product.type_product,
        color: product.color_product,
        price: parseFloat(product.price_product),
        image: `${BASE_URL}/${product.img_product}`,
        image2: product.img2_product ? `${BASE_URL}/${product.img2_product}` : '',
        image3: product.img3_product ? `${BASE_URL}/${product.img3_product}` : '',
        image4: product.img4_product ? `${BASE_URL}/${product.img4_product}` : '',
        description: product.description_product,
        status: product.status_product,
        reference: product.reference_product,
        itemGroup: product.itemgroup_product,
        relatedProducts: product.related_products,
        colorProduct: product.color_product,
        sizes: {
          s: parseInt(product.s_size),
          m: parseInt(product.m_size),
          l: parseInt(product.l_size),
          xl: parseInt(product.xl_size),
          xxl: parseInt(product.xxl_size),
          xxl2: parseInt(product.xxl2_size),
        },
        quantity: parseInt(product.qnty_product),
        type_product: product.type_product,
        category_product: product.category_product,
        itemgroup_product: product.itemgroup_product,
      }));
    }
    throw new Error('Failed to fetch products');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};