import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { Router } from 'express';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
