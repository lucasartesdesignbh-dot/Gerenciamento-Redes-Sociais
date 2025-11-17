import { Plan, Addon } from './types';

export const PLANS: Plan[] = [
  {
    id: 1,
    name: 'Essencial',
    price: 500,
    isHighlighted: false,
    features: [
      { name: '5 Posts em Imagem', icon: 'image', description: 'Criação de arte com imagem única para o feed, com legenda e hashtags estratégicas.' },
      { name: '2 Reels', icon: 'reels', description: 'Criação de vídeos curtos e dinâmicos, seguindo as tendências, para aumentar o engajamento.' },
      { name: '1 Carrossel', icon: 'carousel', description: 'Criação de posts com múltiplas imagens para detalhar um produto/serviço.' },
      { name: 'Storie das Postagens', icon: 'story', description: 'Divulgação nos stories de cada novo post publicado no feed para aumentar o alcance inicial.' },
    ],
  },
  {
    id: 2,
    name: 'Normal',
    price: 600,
    isHighlighted: true,
    features: [
      { name: '8 Posts em Imagem', icon: 'image', description: 'Criação de arte com imagem única para o feed, com legenda e hashtags estratégicas.' },
      { name: '3 Reels', icon: 'reels', description: 'Criação de vídeos curtos e dinâmicos, seguindo as tendências, para aumentar o engajamento.' },
      { name: '1 Carrossel', icon: 'carousel', description: 'Criação de posts com múltiplas imagens para detalhar um produto/serviço.' },
      { name: 'Storie 3x na semana', icon: 'story', description: 'Criação de conteúdo exclusivo para os stories 3 vezes por semana, com enquetes e perguntas.' },
      { name: 'Gestão de 1 Campanha', icon: 'campaign', description: 'Gerenciamento de anúncios pagos para alcançar um público maior e mais qualificado.' },
    ],
  },
  {
    id: 3,
    name: 'Avançado',
    price: 700,
    isHighlighted: false,
    features: [
      { name: '9 Posts de Imagem', icon: 'image', description: 'Criação de arte com imagem única para o feed, com legenda e hashtags estratégicas.' },
      { name: '5 Reels', icon: 'reels', description: 'Criação de vídeos curtos e dinâmicos, seguindo as tendências, para aumentar o engajamento.' },
      { name: '2 Carrosseis', icon: 'carousel', description: 'Criação de posts com múltiplas imagens para detalhar um produto/serviço.' },
      { name: 'Storie 1 ao dia', icon: 'story', description: 'Publicação diária de stories para manter um contato próximo e constante com sua audiência.' },
      { name: 'Gestão de até 3 Campanhas', icon: 'campaign', description: 'Gerenciamento de anúncios pagos para alcançar um público maior e mais qualificado.' },
      { name: 'Relatório Mensal', icon: 'check', description: 'Análise detalhada das métricas do perfil para otimizar a estratégia e acompanhar o crescimento.' },
    ],
  },
];

export const ADDONS: Addon[] = [
    {
        id: 'paid-traffic',
        name: 'Tráfego Pago Pro',
        description: 'Potencialize seu alcance com campanhas otimizadas.',
        price: 250,
        originalPrice: 500,
    },
    {
        id: 'video-recording',
        name: 'Gravação de Vídeos em BH',
        description: '4 vídeos com gravação presencial para alta qualidade.',
        price: 300,
        originalPrice: 500,
    },
    {
        id: 'google-business',
        name: 'Google Meu Negócio',
        description: 'Otimize sua presença local e atraia mais clientes.',
        price: 250,
        originalPrice: 500,
    }
];