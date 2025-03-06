import React from 'react';

declare namespace _JSX {
  interface _IntrinsicElements {
    'coingecko-coin-price-chart-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'coin-id': string;
      currency: string;
      height: string;
      locale: string;
      'background-color': string;
    }
  }
} 