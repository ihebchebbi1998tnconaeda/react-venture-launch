<?php
// Autoriser les requêtes cross-origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gérer la requête OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Couleurs pour l'email
$mainColor = "#700100"; // Updated to match the brand color
$secondaryColor = "#FFFFFF";
$textColor = "#000000";

// Obtenir les données POST brutes
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Valider le JSON
if (!$data || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON received"]);
    exit;
}

// Extraire les détails de l'utilisateur
$userDetails = $data['user_details'] ?? [];
$emailTo = $userDetails['email'] ?? '';
$fullName = ($userDetails['first_name'] ?? '') . ' ' . ($userDetails['last_name'] ?? '');
$orderNote = $userDetails['order_note'] ?? '-';

// Valider l'email
if (!filter_var($emailTo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email address"]);
    exit;
}

// Extraire les détails de la commande
$orderId = $data['order_id'] ?? 'N/A';
$items = $data['items'] ?? [];
$priceDetails = $data['price_details'] ?? [];
$payment = $data['payment'] ?? [];

// Construire le contenu de l'email
$messageHtml = '<html><body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">';
$messageHtml .= '<div style="background-color:' . $mainColor . '; color:' . $secondaryColor . '; padding: 40px; text-align: center; font-size: 30px;">';
$messageHtml .= '<h1>Merci pour votre commande!</h1>';
$messageHtml .= '<p>Numéro de commande: <strong>' . htmlspecialchars($orderId) . '</strong></p>';
$messageHtml .= '</div>';
$messageHtml .= '<div style="max-width: 600px; margin: 20px auto; background-color: ' . $secondaryColor . '; padding: 20px; border-radius: 8px;">';

// Détails de livraison
$messageHtml .= '<h2 style="color: ' . $mainColor . ';">Détails de livraison</h2>';
$messageHtml .= '<table style="width: 100%; margin-bottom: 20px;">';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Nom:</td><td>' . htmlspecialchars($fullName) . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Adresse:</td><td>' . htmlspecialchars($userDetails['address'] ?? '') . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Pays / Code postal:</td><td>' . htmlspecialchars($userDetails['country'] ?? '') . ' - ' . htmlspecialchars($userDetails['zip_code'] ?? '') . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Téléphone:</td><td>' . htmlspecialchars($userDetails['phone'] ?? '') . '</td></tr>';

// Only show order note if it's not '-'
if ($orderNote !== '-') {
    $messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Note de commande:</td><td>' . htmlspecialchars($orderNote) . '</td></tr>';
}

$messageHtml .= '</table>';

// Articles commandés
$messageHtml .= '<h2 style="color: ' . $mainColor . ';">Articles commandés</h2>';
$messageHtml .= '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">';
$messageHtml .= '<thead><tr style="background-color: ' . $mainColor . '; color: ' . $secondaryColor . ';">';
$messageHtml .= '<th style="padding: 10px;">Article</th>';
$messageHtml .= '<th style="padding: 10px;">Qté</th>';
$messageHtml .= '<th style="padding: 10px;">Prix</th>';
$messageHtml .= '<th style="padding: 10px;">Personnalisation</th>';
$messageHtml .= '<th style="padding: 10px;">Pack</th>';
$messageHtml .= '<th style="padding: 10px;">Boîte</th>';
$messageHtml .= '</tr></thead>';
$messageHtml .= '<tbody>';

foreach ($items as $item) {
    $messageHtml .= '<tr style="border-bottom: 1px solid #eee;">';
    $messageHtml .= '<td style="padding: 10px;">' . htmlspecialchars($item['name'] ?? '') . 
                    '<br><small>Taille: ' . htmlspecialchars($item['size'] ?? '-') . 
                    '<br>Couleur: ' . htmlspecialchars($item['color'] ?? '-') . '</small></td>';
    $messageHtml .= '<td style="padding: 10px; text-align: center;">' . htmlspecialchars($item['quantity'] ?? 0) . '</td>';
    $messageHtml .= '<td style="padding: 10px; text-align: right;">' . htmlspecialchars($item['total_price'] ?? 0) . ' TND</td>';
    
    // Only show personalization if not '-'
    $personalization = $item['personalization'] ?? '-';
    $messageHtml .= '<td style="padding: 10px;">' . ($personalization !== '-' ? htmlspecialchars($personalization) : '-') . '</td>';
    
    // Only show pack if not 'aucun'
    $pack = $item['pack'] ?? 'aucun';
    $messageHtml .= '<td style="padding: 10px;">' . ($pack !== 'aucun' ? htmlspecialchars($pack) : '-') . '</td>';
    
    $messageHtml .= '<td style="padding: 10px;">' . htmlspecialchars($item['box'] ?? '-') . '</td>';
    $messageHtml .= '</tr>';
}

$messageHtml .= '</tbody></table>';

// Détails des prix
$messageHtml .= '<h2 style="color: ' . $mainColor . ';">Détails des prix</h2>';
$messageHtml .= '<table style="width: 100%; margin-bottom: 20px;">';
$messageHtml .= '<tr><td style="padding: 8px;">Sous-total:</td><td style="text-align: right;">' . htmlspecialchars($priceDetails['subtotal'] ?? '0') . ' TND</td></tr>';

// Only show shipping cost if not 0
if (($priceDetails['shipping_cost'] ?? 0) > 0) {
    $messageHtml .= '<tr><td style="padding: 8px;">Frais de livraison:</td><td style="text-align: right;">' . htmlspecialchars($priceDetails['shipping_cost'] ?? '0') . ' TND</td></tr>';
}

// Only show newsletter discount if amount is greater than 0
if (($priceDetails['newsletter_discount_amount'] ?? 0) > 0) {
    $messageHtml .= '<tr><td style="padding: 8px;">Remise newsletter:</td><td style="text-align: right; color: #4CAF50;">-' . htmlspecialchars($priceDetails['newsletter_discount_amount'] ?? '0') . ' TND</td></tr>';
}

$messageHtml .= '<tr style="font-weight: bold; font-size: 1.1em;">';
$messageHtml .= '<td style="padding: 8px; border-top: 2px solid #eee;">Total:</td>';
$messageHtml .= '<td style="text-align: right; border-top: 2px solid #eee;">' . htmlspecialchars($priceDetails['final_total'] ?? '0') . ' TND</td></tr>';
$messageHtml .= '</table>';

// Footer
$messageHtml .= '<div style="background-color:' . $mainColor . '; padding: 20px; text-align: center; color: ' . $secondaryColor . '; font-size: 14px; border-radius: 8px;">';
$messageHtml .= 'Pour toute question, contactez-nous à <a href="mailto:support@fioriforyou.com" style="color: ' . $secondaryColor . '; text-decoration: none;">support@fioriforyou.com</a>';
$messageHtml .= '</div>';

$messageHtml .= '</div></body></html>';

// Envoyer l'email
$headers = "From: Fiori For You <no-reply@fioriforyou.com>\r\n";
$headers .= "Reply-To: support@fioriforyou.com\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

if (mail($emailTo, "Confirmation de commande - " . htmlspecialchars($orderId), $messageHtml, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email"]);
}
?>