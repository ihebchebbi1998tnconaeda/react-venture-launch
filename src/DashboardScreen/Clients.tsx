import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Check, Pause, Box, Trash2, Loader2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Modal from './Modal';
import AllowerModal from './AllowerModal';

interface ClientsProps {
  user: any;
}

const Clients: React.FC<ClientsProps> = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllowerModalOpen, setIsAllowerModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const key = "38457";

  const logUploadEvent = async (title: string) => {
    try {
      await axios.post('https://plateform.draminesaid.com/app/data_logs.php', {
        id_log: 'uniqueLogId',
        text_log: title,
        date_log: new Date().toISOString(),
        user_log: user.email,
        type_log: 'compte',
      });
    } catch (err) {
      console.error('Failed to log the event:', err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://plateform.draminesaid.com/app/get_users.php');
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id_client) => {
    setIsModalOpen(false);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/delete_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_client, key }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.filter(user => user.id_client !== id_client));
        setAlertMessage('Utilisateur a été supprimé avec succès!');
        logUploadEvent('Utilisateur a été supprimé avec succès');
        setShowAlert(true);
      } else {
        console.error("Failed to delete user:", data.message);
        setAlertMessage(data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAlertMessage('Failed to delete user. Please try again.');
      setShowAlert(true);
    }
  };

  const handleActivate = async (id_client, email_client) => {
    setIsModalOpen(false);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/useractivation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id_client, key, email_client }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(user => user.id_client === id_client ? { ...user, status_client: '1' } : user));
        setAlertMessage('Utilisateur a été activé avec succès!');
        logUploadEvent('Utilisateur a été activé avec succès');
        setShowAlert(true);
      } else {
        console.error("Failed to activate user:", data.message);
        setAlertMessage(data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAlertMessage('Impossible d\'activer l\'utilisateur. Veuillez réessayer.');
      setShowAlert(true);
    }
  };

  const handleDeActivate = async (id_client) => {
    setIsModalOpen(false);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/deuseractivation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id_client, key }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(user => user.id_client === id_client ? { ...user, status_client: '0' } : user));
        setAlertMessage('Utilisateur a été désactivé avec succès!');
        logUploadEvent('Utilisateur a été désactivé avec succès');
        setShowAlert(true);
      } else {
        console.error("Failed to deactivate user:", data.message);
        setAlertMessage(data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAlertMessage('Impossible de désactiver l\'utilisateur. Veuillez réessayer.');
      setShowAlert(true);
    }
  };

  const confirmAction = (id_client, email_client, action) => {
    setSelectedUserId(id_client);
    setSelectedUserEmail(email_client); 
    setActionType(action);
    setIsModalOpen(true);
  };
  
  const openAllowerModal = (id_client) => {
    setSelectedUserId(id_client);
    setIsAllowerModalOpen(true);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user: any) =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Informations Utilisateurs</h2>
          <p className="text-gray-500">Liste des utilisateurs enregistrés</p>
        </div>
        <div className="w-72">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert className="mb-6">
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-4 text-left font-medium text-gray-500">ID</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Nom</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Prénom</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Email</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Téléphone</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Date de création</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Statut</th>
                <th className="px-6 py-4 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user: any) => (
                <tr key={user.id_client} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.id_client}</td>
                  <td className="px-6 py-4">{user.nom_client}</td>
                  <td className="px-6 py-4">{user.prenom_client}</td>
                  <td className="px-6 py-4">{user.email_client}</td>
                  <td className="px-6 py-4">{user.telephone_client}</td>
                  <td className="px-6 py-4">{new Date(user.createdat_client).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status_client === '1' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status_client === '1' ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {user.status_client === '0' && (
                        <Button
                          size="sm"
                          onClick={() => confirmAction(user.id_client, user.email_client, 'activate')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Activer
                        </Button>
                      )}
                      {user.status_client === '1' && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => confirmAction(user.id_client, user.email_client, 'deactivate')}
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            Désactiver
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => openAllowerModal(user.id_client)}
                          >
                            <Box className="h-4 w-4 mr-1" />
                            Allouer
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => confirmAction(user.id_client, user.email_client, 'delete')}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-primary/10'}`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  className={`${
                    currentPage === page 
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'text-primary hover:bg-primary/10'
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-primary/10'}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isModalOpen && (
        <Modal
          action={actionType}
          message={`Êtes-vous sûr de vouloir ${
            actionType === 'delete' ? 'supprimer' : 
            actionType === 'activate' ? 'activer' : 
            'désactiver'
          } cet utilisateur?`}
          onConfirm={() => {
            if (actionType === 'activate') {
              handleActivate(selectedUserId, selectedUserEmail);
            } else if (actionType === 'deactivate') {
              handleDeActivate(selectedUserId);
            } else if (actionType === 'delete') {
              handleDelete(selectedUserId);
            }
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {isAllowerModalOpen && (
        <AllowerModal
          userId={selectedUserId}
          isOpen={isAllowerModalOpen}
          onClose={() => setIsAllowerModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Clients;
