import { Request, Response } from 'express';
import { loginUser, refreshAccessToken, getUserById, changePassword } from '../services/auth.service';
import { AuthRequest } from '../types';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await loginUser(email, password);

  if (!result) {
    return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
  }

  return res.json({ success: true, data: result });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  const result = await refreshAccessToken(refreshToken);

  if (!result) {
    return res.status(401).json({ success: false, message: 'Refresh token invalide' });
  }

  return res.json({ success: true, data: result });
}

export async function getMe(req: AuthRequest, res: Response) {
  const user = await getUserById(req.user!.userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  }

  return res.json({ success: true, data: user });
}

export async function updatePassword(req: AuthRequest, res: Response) {
  const { currentPassword, newPassword } = req.body;
  const success = await changePassword(req.user!.userId, currentPassword, newPassword);

  if (!success) {
    return res.status(400).json({ success: false, message: 'Mot de passe actuel incorrect' });
  }

  return res.json({ success: true, message: 'Mot de passe modifié avec succès' });
}
