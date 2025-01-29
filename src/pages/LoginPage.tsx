import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Format d'email invalide",
        description: "Veuillez entrer une adresse email valide"
      });
      return;
    }

    try {
      const response = await fetch('https://plateform.draminesaid.com/app/authentificate.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const data = await response.json();
      
      if (data.success && data.user) {
        // Validate user object structure
        if (!data.user.id || !data.user.email || !data.user.status === undefined) {
          throw new Error('Structure de données utilisateur invalide');
        }

        if (data.user.status === 0) {
          navigate('/not-active');
        } else {
          if (email === 'admin@draminesaid.com') {
            window.location.href = 'https://plateform.draminesaid.com';
          } else {
            // Store only necessary user data
            const safeUserData = {
              id: data.user.id,
              email: data.user.email,
              status: data.user.status,
              role: data.user.role || 'user'
            };
            localStorage.setItem('user', JSON.stringify(safeUserData));
            navigate('/app');
          }
        }
      } else {
        if (data.message === 'Compte pas encore actif, merci pour votre patience.') {
          navigate('/not-active');
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: data.message || "Identifiants invalides",
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e54c8] to-[#699ed0]">
      <div className="bg-white rounded-2xl shadow-xl max-w-[450px] w-full p-10 transform transition-transform duration-300 hover:-translate-y-1">
        <h3 className="text-[#699ed0] font-bold text-2xl mb-3 text-center">
          Bienvenue à nouveau!
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Connectez-vous pour accéder aux formations enregistrées et continuer votre parcours de transformation personnelle.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#699ed0] focus:border-transparent"
              placeholder="Entrez votre adresse e-mail"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#699ed0] focus:border-transparent"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#699ed0] text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-[#5a8dbd] hover:-translate-y-0.5"
          >
            Accéder aux formations
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Vous n'avez pas encore de compte ?{' '}
          <a href="https://platform.draminesaid.com/step1.html" className="text-[#699ed0] hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;