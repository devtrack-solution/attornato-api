import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

const config = new ConfigEnvironmentService()

export function MODIFY_DATA(pass?: string) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notificação de Atualização de Dados</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
            <h2>Notificação de Atualização de Dados</h2>
            <p>Olá,</p>
            <p>Sua senha foi alterada com sucesso. Se você não realizou esta alteração, recomendamos que você troque sua senha imediatamente para garantir a segurança da sua conta.</p>
            ${pass ? `<p>Senha: ${pass}</p>` : ''}
            <p>Atenciosamente,</p>
            <p>Equipe ${config.project.name}</p>
        </div>
    </body>
    </html>
  `
}

export function RECOVERY_CODE_EMAIL(email: string, recoveryCode: string) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Recuperação</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="padding: 20px; background-color: #fff; border: 1px solid #dee2e6; margin: 20px; border-radius: 8px;">
                <p style="line-height: 1.6;">Olá,</p>
                <p style="line-height: 1.6;">Você solicitou a recuperação de sua conta. Utilize o código abaixo para redefinir sua senha:</p>
                <p style="text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold;">${recoveryCode}</p>
                <p style="line-height: 1.6;">Este código é válido por 30 minutos.</p>
                <p style="line-height: 1.6;">Se você não solicitou a recuperação de sua conta, por favor, ignore este e-mail.</p>
                <p style="line-height: 1.6;">Atenciosamente,</p>
                <p style="line-height: 1.6;">Equipe ${config.project.name}</p>
            </div>

            <div style="text-align: center; padding: 20px;">
                <a href="https://${config.project.url}/auth/guest/reset-password?username=${encodeURI(email)}&code=${recoveryCode}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Redefinir Senha</a>
            </div>
        </div>
    </body>
    </html>
  `
}
