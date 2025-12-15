<?php
// Habilitar headers JSON
header('Content-Type: application/json');

// Validar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Verificar campos obrigatórios
$required_fields = ['name', 'email', 'phone', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['success' => false, 'message' => "Campo obrigatório ausente: $field"]);
        exit;
    }
}

// Sanitizar e validar inputs
$name = trim(htmlspecialchars($_POST['name']));
$email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
$phone = trim(htmlspecialchars($_POST['phone']));
$subject = trim(htmlspecialchars($_POST['subject']));
$message = trim(htmlspecialchars($_POST['message']));

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'E-mail inválido']);
    exit;
}

// Validar comprimento mínimo
if (strlen($name) < 3) {
    echo json_encode(['success' => false, 'message' => 'Nome deve ter no mínimo 3 caracteres']);
    exit;
}

if (strlen($message) < 10) {
    echo json_encode(['success' => false, 'message' => 'Mensagem deve ter no mínimo 10 caracteres']);
    exit;
}

// Email de destino
$to = 'pizzariapaulista@pizzariapaulista.com.br';

// Endereço de origem (deve ser do mesmo domínio para evitar bloqueios)
$fromAddress = 'pizzariapaulista@pizzariapaulista.com.br';

// Assunto do email
$email_subject = "Novo contato de $name - Assunto: $subject";

// Corpo do email (com melhor formatação)
$email_body = <<<EOT
Olá,

Você recebeu uma nova mensagem através do formulário de contato do site pizzariapaulista.com.br

DETALHES DO CONTATO:
================================
Nome: $name
E-mail: $email
Telefone: $phone
Assunto: $subject

MENSAGEM:
================================
$message

================================
EOT;

// Headers do email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "From: $fromAddress" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Tentar enviar o email
if (mail($to, $email_subject, $email_body, $headers)) {
    // Enviar também confirmação para o usuário
    $user_subject = "Recebemos sua mensagem - Pizzaria Paulista";
    $now = date('d/m/Y H:i:s');

    $user_body = <<<EOT
Olá $name,

Obrigado por entrar em contato conosco!

Recebemos sua mensagem e entraremos em contato em breve.

Detalhes:
- Assunto: $subject
- Data: $now

Att,
Pizzaria Paulista
EOT;

    $user_headers = "MIME-Version: 1.0" . "\r\n";
    $user_headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
    $user_headers .= "From: noreply@pizzariapaulista.com.br" . "\r\n";

    mail($email, $user_subject, $user_body, $user_headers);

    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso! Em breve entraremos em contato.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem. Tente novamente mais tarde.']);
}
?>
