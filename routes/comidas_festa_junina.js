import express from 'express';
import { supabase } from '../data/supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('comidas_festa_junina').select('*');
  if (error) return res.status(400).json(error);
  res.json(data);
});

export default router;