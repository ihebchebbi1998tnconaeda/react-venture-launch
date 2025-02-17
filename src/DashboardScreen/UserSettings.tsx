import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Modal from './Modal';

interface UserData {
  id_client: number;
  email_client: string;
  nom_client: string;
  prenom_client: string;
  telephone_client: string;
  passe: string;
  passe2: string;
}

interface UserSettingsProps {
  user: {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    phone: string;
  };
}

const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {
  const { toast } = useToast();
  const [userData, setUser] = useState<UserData>({
    id_client: user.id,
    email_client: user.email,
    nom_client: user.nom,
    prenom_client: user.prenom,
    telephone_client: user.phone,
    passe: '',
    passe2: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const logUploadEvent = async (nom: string) => {
    try {
      await axios.post('https://plateform.draminesaid.com/app/data_logs.php', {
        id_log: 'uniqueLogId',
        text_log: nom + 'a changé ses informations',
        date_log: new Date().toISOString(),
        user_log: user.email,
        type_log: 'compte',
      });
    } catch (err) {
      console.error('Failed to log the event:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.passe !== userData.passe2) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setModalMessage('Voulez-vous vraiment modifier vos informations ?');
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    try {
      const response = await fetch('https://plateform.draminesaid.com/app/modify_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_client: userData.id_client,
          nom_client: userData.nom_client,
          prenom_client: userData.prenom_client,
          email_client: userData.email_client,
          password_client: userData.passe,
          telephone_client: userData.telephone_client,
        }),
      });

      const result = await response.json();
      if (result.success) {
        logUploadEvent(userData.nom_client);
        toast({
          title: "Succès",
          description: "Profil mis à jour avec succès!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 mt-16">
      <Card className="max-w-4xl mx-auto p-6 bg-dashboard-card">
        <h2 className="text-2xl font-bold mb-6">Modifier le Profil</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Adresse e-mail</label>
              <Input
                type="email"
                name="email_client"
                placeholder="Email"
                value={userData.email_client}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prénom</label>
                <Input
                  type="text"
                  name="prenom_client"
                  placeholder="Prénom"
                  value={userData.prenom_client}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nom de famille</label>
                <Input
                  type="text"
                  name="nom_client"
                  placeholder="Nom de famille"
                  value={userData.nom_client}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <Input
                type="text"
                name="telephone_client"
                placeholder="Téléphone"
                value={userData.telephone_client}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nouveau Mot de passe</label>
                <Input
                  type="password"
                  name="passe"
                  placeholder="Mot de passe"
                  value={userData.passe}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirmer nouveau mot de passe</label>
                <Input
                  type="password"
                  name="passe2"
                  placeholder="Confirmer le mot de passe"
                  value={userData.passe2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Mettre à jour le Profil
            </Button>
          </div>
        </form>
      </Card>

      {isModalOpen && (
        <Modal
          action="modifier"
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UserSettings;