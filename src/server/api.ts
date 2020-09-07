import { Router } from 'express';
import { pubState } from '../app/store';

const router = Router();

router.post('/state', (req, res) => {
  res.json(pubState);
})

export default router;
