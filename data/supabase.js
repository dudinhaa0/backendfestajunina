const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Use os nomes EXATOS que estão no seu arquivo .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Exportando como CommonJS (o padrão do seu projeto)
module.exports = { supabase };