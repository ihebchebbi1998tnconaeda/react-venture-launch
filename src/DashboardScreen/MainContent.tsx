import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Check, Pause, Box, Trash2, Loader2, Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";
import Modal from './Modal';
import AllowerModal from './AllowerModal';

interface RegistrationRequest {
  id: string;
  id_user: string;
  id_saison: string;
  created_at: string;
}

interface User {
  id_client: string;
  nom_client: string;
  prenom_client: string;
  email_client: string;
  telephone_client: string;
  createdat_client: string;
  status_client: string;
}

interface SaisonPermission {
  id_client: number;
  id_saison: number;
}

interface Saison {
  id_saison: number;
  nom_saison: string;
}

interface UserData {
  user: User;
  user_saison_permissions: SaisonPermission[];
  saison_objects: Saison[];
}

interface ClientsProps {
  user: any;
}

interface APISeasonResponse {
  success: boolean;
  saisons: {
    id_saison: number;
    name_saison: string;
    havechapters_saisons: number;
    photo_saison: string;
  }[];
}

interface APIUserSeasonsResponse {
  success: boolean;
  seasons: {
    id: string;
    id_client: string;
    id_saison: string;
    name_saison: string;
  }[];
}

const fetchRegistrationRequests = async () => {
  try {
    const response = await axios.get('https://plateform.draminesaid.com/app/request_users.php');
    console.log('Registration requests response:', response.data); // Add logging
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching registration requests:', error);
    return [];
  }
};

const Clients: React.FC<ClientsProps> = ({ user }) => {
  const itemsPerPage = 10;
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllowerModalOpen, setIsAllowerModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeason, setFilterSeason] = useState<string>('all');
  const [filterAllocation, setFilterAllocation] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [allSeasons, setAllSeasons] = useState<APISeasonResponse['saisons']>([]);
  const [userSeasons, setUserSeasons] = useState<APIUserSeasonsResponse['seasons']>([]);
  const [showRegistrationRequests, setShowRegistrationRequests] = useState(true);
  const [registrationRequests, setRegistrationRequests] = useState<RegistrationRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [key, setKey] = useState("38457");
  const [searchRequestTerm, setSearchRequestTerm] = useState('');
  const [currentRequestPage, setCurrentRequestPage] = useState(1);
  const requestsPerPage = 15;

  useEffect(() => {
    Promise.all([
      fetchUsers(),
      fetchSeasons(),
      fetchUserSeasons(),
    ]).catch(error => {
      console.error("Error fetching initial data:", error);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (showRegistrationRequests) {
      fetchRegistrationRequestsData();
    }
  }, [showRegistrationRequests]);

  const fetchSeasons = async () => {
    try {
      const response = await axios.get<APISeasonResponse>('https://plateform.draminesaid.com/app/get_saisons.php');
      if (response.data.success) {
        setAllSeasons(response.data.saisons);
      }
    } catch (error) {
      console.error("Error fetching seasons:", error);
    }
  };

  const fetchUserSeasons = async () => {
    try {
      const response = await axios.get<APIUserSeasonsResponse>('https://plateform.draminesaid.com/app/get_allusers_seasons.php');
      if (response.data.success) {
        setUserSeasons(response.data.seasons);
      }
    } catch (error) {
      console.error("Error fetching user seasons:", error);
    }
  };

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://plateform.draminesaid.com/app/get_usersnew.php', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setAlertMessage("Échec du chargement des utilisateurs. Veuillez réessayer.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlertMessage("Une erreur s'est produite lors du chargement des utilisateurs.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrationRequestsData = async () => {
    setLoadingRequests(true);
    try {
      const requests = await fetchRegistrationRequests();
      setRegistrationRequests(requests);
    } catch (error) {
      console.error('Error fetching registration requests:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes d'inscription",
        variant: "destructive",
      });
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAcceptRequest = async (userId: string, saisonId: string, requestId: string) => {
    try {
      const allocResponse = await fetch('https://plateform.draminesaid.com/app/allocation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          seasons: [saisonId]
        })
      });

      const allocData = await allocResponse.json();

      if (!allocData.success) {
        throw new Error('Failed to allocate season');
      }

      const userData = users.find(u => u.user.id_client === userId);
      const userName = userData ? `${userData.user.prenom_client} ${userData.user.nom_client}` : 'l\'utilisateur';
      const userNumber = userData?.user.id_client || '';

      toast({
        title: "Succès!",
        description: `Formation activée pour ${userName} (Utilisateur #${userNumber})`,
        variant: "default",
        className: "bg-[#2a98cb] text-white font-medium border-none",
      });
      
      await logUploadEvent('Formation activée avec succès');
      fetchRegistrationRequestsData();
      fetchUsers();
    } catch (error) {
      console.error('Error handling request:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du traitement de la demande",
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await fetch('https://plateform.draminesaid.com/app/request_users.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: requestId })
      });

      toast({
        title: "Succès",
        description: "Demande rejetée avec succès",
      });

      fetchRegistrationRequestsData();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du rejet de la demande",
        variant: "destructive",
      });
    }
  };

  const getUserSeasons = (userId: string) => {
    return userSeasons.filter(season => season.id_client === userId);
  };

  const filteredUsers = users.filter((userData: UserData) => {
    const matchesSearch = Object.values(userData.user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = filterStatus === 'all' 
      ? true 
      : userData.user.status_client === (filterStatus === 'active' ? '1' : '0');

    const userSeasonsList = getUserSeasons(userData.user.id_client);
    
    const matchesSeason = filterSeason === 'all'
      ? true
      : userSeasonsList.some(season => season.id_saison === filterSeason);

    const matchesAllocation = filterAllocation === 'all'
      ? true
      : filterAllocation === 'with-seasons'
      ? userSeasonsList.length > 0
      : userSeasonsList.length === 0;

    return matchesSearch && matchesStatus && matchesSeason && matchesAllocation;
  });

  const filteredRequests = registrationRequests.filter(request => {
    const userData = users.find(u => u.user.id_client === request.id_user);
    const season = allSeasons.find(s => s.id_saison.toString() === request.id_saison);
    
    const matchesSearch = 
      userData?.user.nom_client?.toLowerCase().includes(searchRequestTerm.toLowerCase()) ||
      userData?.user.prenom_client?.toLowerCase().includes(searchRequestTerm.toLowerCase()) ||
      userData?.user.email_client?.toLowerCase().includes(searchRequestTerm.toLowerCase()) ||
      season?.name_saison?.toLowerCase().includes(searchRequestTerm.toLowerCase());

    const matchesSeason = filterSeason === 'all' || request.id_saison === filterSeason;

    return matchesSearch && matchesSeason;
  });

  const indexOfLastRequest = currentRequestPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalRequestPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handleDelete = async (id_client: string) => {
    setIsModalOpen(false);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/delete_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_client, key }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.filter(userData => userData.user.id_client !== id_client));
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

  const handleActivate = async (id_client: string, email_client: string) => {
    setIsModalOpen(false);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/useractivation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id_client, key, email_client }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(userData => 
          userData.user.id_client === id_client 
            ? { ...userData, user: { ...userData.user, status_client: '1' } }
            : userData
        ));
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

  const handleDeActivate = async (id_client: string) => {
    setIsModalOpen(false);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/deuseractivation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id_client, key }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(userData => 
          userData.user.id_client === id_client 
            ? { ...userData, user: { ...userData.user, status_client: '0' } }
            : userData
        ));
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

  const confirmAction = (id_client: string, email_client: string, action: string) => {
    setSelectedUserId(id_client);
    setSelectedUserEmail(email_client); 
    setActionType(action);
    setIsModalOpen(true);
  };
  
  const openAllowerModal = (id_client: string) => {
    setSelectedUserId(id_client);
    setIsAllowerModalOpen(true);
  };
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const formatCreatedAt = (timestamp: string) => {
    console.log('Formatting timestamp:', timestamp); // Add logging
    return timestamp; // Simply return the timestamp as is
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 mt-16">
      <div className="mb-8">
        <Button 
          onClick={() => {
            setShowRegistrationRequests(!showRegistrationRequests);
            if (!showRegistrationRequests) {
              fetchRegistrationRequestsData();
            }
          }}
          className="mb-6 bg-[#2a98cb] hover:bg-[#2a98cb]/90"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Demande d'inscription aux formations
        </Button>

        {showRegistrationRequests && (
          <Card className="mb-8 border-[#d175a1]/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#040404]">Demandes d'inscription en attente</h3>
              {loadingRequests ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-[#2a98cb]" />
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Rechercher une demande..."
                            value={searchRequestTerm}
                            onChange={(e) => setSearchRequestTerm(e.target.value)}
                            className="pl-8 text-black"
                          />
                        </div>
                      </div>
                      <Select
                        value={filterSeason}
                        onValueChange={setFilterSeason}
                      >
                        <SelectTrigger className="w-[250px] text-black">
                          <SelectValue placeholder="Filtrer par formation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les formations</SelectItem>
                          {allSeasons.map((season) => (
                            <SelectItem key={season.id_saison} value={season.id_saison.toString()}>
                              {season.name_saison}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    {filteredRequests.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <Box className="h-12 w-12 mx-auto text-[#d175a1] mb-3" />
                        <p className="text-gray-500 font-medium">
                          {filterSeason !== 'all' 
                            ? "Aucune demande pour cette formation"
                            : "Aucune demande en attente"}
                        </p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#2a98cb]/5">
                            <th className="text-left py-3 px-4 font-medium text-[#040404]">Utilisateur (#ID)</th>
                            <th className="text-left py-3 px-4 font-medium text-[#040404]">Télephone</th>
                            <th className="text-left py-3 px-4 font-medium text-[#040404]">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-[#040404]">Formation</th>
                            <th className="text-left py-3 px-4 font-medium text-[#040404]">Date de demande</th>
                            <th className="text-left py-3 px-4 font-medium text-[#040404]">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRequests.map((request) => {
                            const season = allSeasons.find(s => s.id_saison.toString() === request.id_saison);
                            const userData = users.find(u => u.user.id_client === request.id_user);
                            
                            return (
                              <tr key={request.id} className="border-b hover:bg-[#2a98cb]/5 transition-colors">
                                <td className="py-4 px-4">
                                  {userData ? `${userData.user.prenom_client} ${userData.user.nom_client} (#${userData.user.id_client})` : 'Utilisateur inconnu'}
                                </td>
                                <td className="py-4 px-4">
                                  {userData?.user.telephone_client || 'Téléphone inconnu'}
                                </td>
                                <td className="py-4 px-4">
                                  {userData?.user.email_client || 'Email inconnu'}
                                </td>
                                <td className="py-4 px-4">
                                  {season ? season.name_saison : 'Formation inconnue'}
                                </td>
                                <td className="py-4 px-4">
                                  {formatCreatedAt(request.created_at)}
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleAcceptRequest(request.id_user, request.id_saison, request.id)}
                                      className="bg-green-500 hover:bg-green-600 transition-colors"
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Accepter
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleRejectRequest(request.id)}
                                      className="bg-red-500 hover:bg-red-600 transition-colors"
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Refuser
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                  
                  {totalRequestPages > 1 && (
                    <div className="mt-4 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentRequestPage(prev => Math.max(1, prev - 1))}
                              className={currentRequestPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                          </PaginationItem>
                          {Array.from({ length: totalRequestPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentRequestPage(page)}
                                className={`${
                                  currentRequestPage === page 
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'hover:bg-primary/10'
                                }`}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentRequestPage(prev => Math.min(totalRequestPages, prev + 1))}
                              className={currentRequestPage === totalRequestPages ? 'pointer-events-none opacity-50' : ''}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Informations Utilisateurs</h2>
          <p className="text-gray-500">Liste des utilisateurs enregistrés</p>
        </div>
        <div className="flex gap-4 items-center">
          <Select
            value={filterAllocation}
            onValueChange={setFilterAllocation}
          >
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Statut des formations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les utilisateurs</SelectItem>
              <SelectItem value="with-seasons">Avec formations</SelectItem>
              <SelectItem value="without-seasons">Sans formations</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filterSeason}
            onValueChange={setFilterSeason}
          >
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Filtrer par formation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les formations</SelectItem>
              {allSeasons.map((season) => (
                <SelectItem key={season.id_saison} value={season.id_saison.toString()}>
                  {season.name_saison}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-72">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 text-black"
              />
            </div>
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
              {paginatedUsers.map((userData: UserData) => (
                <tr key={userData.user.id_client} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{userData.user.id_client}</td>
                  <td className="px-6 py-4">{userData.user.nom_client}</td>
                  <td className="px-6 py-4">{userData.user.prenom_client}</td>
                  <td className="px-6 py-4">{userData.user.email_client}</td>
                  <td className="px-6 py-4">{userData.user.telephone_client}</td>
                  <td className="px-6 py-4">{new Date(userData.user.createdat_client).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData.user.status_client === '1' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userData.user.status_client === '1' ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {userData.user.status_client === '0' && (
                        <Button
                          size="sm"
                          onClick={() => confirmAction(userData.user.id_client, userData.user.email_client, 'activate')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Activer
                        </Button>
                      )}
                      {userData.user.status_client === '1' && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => confirmAction(userData.user.id_client, userData.user.email_client, 'deactivate')}
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            Désactiver
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => openAllowerModal(userData.user.id_client)}
                          >
                            <Box className="h-4 w-4 mr-1" />
                            Allouer
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => confirmAction(userData.user.id_client, userData.user.email_client, 'delete')}
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
          userId={selectedUserId || ''}
          isOpen={isAllowerModalOpen}
          onClose={() => {
            setIsAllowerModalOpen(false);
            fetchUsers();
          }}
        />
      )}

    </div>
  );
};

export default Clients;
