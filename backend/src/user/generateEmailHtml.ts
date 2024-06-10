export async function generateEmailHtml(customerName: string, totalAmount: number): Promise<string> {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Boleto de Pagamento - Lethal Company</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 0 auto;
                box-sizing: border-box;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
            }
            .header img {
                max-width: 100%;
                height: auto;
            }
            .header h1 {
                margin: 10px 0 0 0;
                font-size: 24px;
            }
            .content {
                padding: 20px 0;
            }
            .content p {
                margin: 0 0 10px;
                font-size: 16px;
                line-height: 1.5;
            }
            .content .amount {
                font-size: 1.2em;
                color: #333;
                font-weight: bold;
            }
            .button {
                display: block;
                width: 100%;
                text-align: center;
                margin: 20px 0;
            }
            .button a {
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 4px;
                font-size: 1em;
                display: inline-block;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 0.9em;
                color: #777;
            }
            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .content p {
                    font-size: 14px;
                }
                .header h1 {
                    font-size: 20px;
                }
                .button a {
                    font-size: 0.9em;
                    padding: 8px 16px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/capsule_616x353.jpg?t=1700231592" alt="Lethal Company Logo">
                <h1>Lethal Company</h1>
            </div>
            <div class="content">
                <p>Olá, ${customerName},</p>
                <p>Segue abaixo o link para o pagamento do seu boleto:</p>
                <p class="amount">Valor: R$ ${totalAmount.toFixed(2)}</p>
                <p>Se você tiver qualquer dúvida, entre em contato conosco pelo email suporte@lethalcompany.com.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Lethal Company. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}
