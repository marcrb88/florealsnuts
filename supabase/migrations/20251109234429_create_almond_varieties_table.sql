/*
  # Create almond varieties catalog

  1. New Tables
    - `almond_varieties`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Variety name
      - `description` (text) - Detailed description
      - `characteristics` (text) - Key characteristics
      - `image_url` (text) - Product image URL
      - `origin` (text) - Origin/provenance
      - `harvest_period` (text) - Harvest season
      - `price` (numeric) - Price per unit
      - `available` (boolean) - Availability status
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `almond_varieties` table
    - Add policy for public read access (catalog is public)
*/

CREATE TABLE IF NOT EXISTS almond_varieties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  characteristics text DEFAULT '',
  image_url text DEFAULT '',
  origin text DEFAULT '',
  harvest_period text DEFAULT '',
  price numeric(10,2) DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE almond_varieties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view almond varieties"
  ON almond_varieties FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO almond_varieties (name, description, characteristics, origin, harvest_period, price, image_url) VALUES
('Marcona', 'Variedad de almendra de gran calidad, conocida por su sabor dulce y textura suave. Ideal para consumo directo y repostería fina.', 'Forma redondeada, tamaño grande, cáscara dura, alto contenido en aceite', 'España', 'Septiembre - Octubre', 45.00, 'https://images.pexels.com/photos/4033630/pexels-photo-4033630.jpeg'),
('Guara', 'Almendra de alta productividad y excelente adaptación. Muy valorada en la industria por su regularidad y calidad constante.', 'Cáscara semi-dura, grano alargado, floración tardía, resistente a heladas', 'Aragón, España', 'Septiembre', 38.00, 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg'),
('Largueta', 'Variedad tradicional española muy apreciada por su forma alargada y sabor intenso. Perfecta para turrones y peladillas.', 'Forma muy alargada, cáscara blanda, sabor característico, floración temprana', 'Levante, España', 'Agosto - Septiembre', 42.00, 'https://images.pexels.com/photos/4033636/pexels-photo-4033636.jpeg'),
('Avijor', 'Variedad moderna autofértil de alta producción. Excelente comportamiento agronómico y gran adaptabilidad.', 'Autofértil, alta productividad, grano grande, floración media-tardía', 'España', 'Septiembre', 40.00, 'https://images.pexels.com/photos/6157055/pexels-photo-6157055.jpeg'),
('Vairo', 'Almendra de cáscara blanda con excelente calibre. Muy productiva y de floración tardía, ideal para zonas con riesgo de heladas.', 'Cáscara muy blanda, grano grande y plano, floración muy tardía', 'España', 'Septiembre - Octubre', 41.00, 'https://images.pexels.com/photos/4033637/pexels-photo-4033637.jpeg'),
('Soleta', 'Variedad autofértil de floración tardía. Excelente productividad y adaptación a diferentes condiciones climáticas.', 'Autofértil, floración tardía, cáscara dura, alto rendimiento', 'CITA Aragón', 'Septiembre', 39.00, 'https://images.pexels.com/photos/7426877/pexels-photo-7426877.jpeg');