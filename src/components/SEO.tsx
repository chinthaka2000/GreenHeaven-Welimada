import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title = 'Green Heaven Welimada | Premium Agri-Tourism in Sri Lanka',
  description = 'Experience the beauty of Welimada at Green Heaven. Luxury accommodations, organic farm tours, and breathtaking views in Sri Lanka.',
  keywords = 'Welimada hotels, Agri-tourism Sri Lanka, Farm stay near Nuwara Eliya, Green Heaven Welimada',
  type = 'website',
  image = 'https://greenheaven.lk/og-image.jpg',
  url = 'https://greenheaven.lk'
}: SEOProps) {
  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
