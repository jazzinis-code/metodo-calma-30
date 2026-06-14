const https = require("https");
const crypto = require("crypto");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const pixelId = process.env.FACEBOOK_PIXEL_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: "Invalid JSON" };
    }

    const eventId = crypto.randomUUID();
    const eventTime = Math.floor(Date.now() / 1000);

    const payload = JSON.stringify({
        data: [{
            event_name: "Purchase",
            event_time: eventTime,
            event_id: eventId,
            event_source_url: body.sourceUrl || "https://metodocalma30.com.br/obrigado",
            action_source: "website",
            user_data: {
                client_ip_address: body.ip || "",
                client_user_agent: body.userAgent || "",
                fbc: body.fbc || "",
                fbp: body.fbp || "",
            },
            custom_data: {
                value: 27.90,
                currency: "BRL",
                content_name: "Metodo CALMA 30",
                content_type: "product",
            },
        }],
    });

    return new Promise((resolve) => {
        const options = {
            hostname: "graph.facebook.com",
            path: "/v19.0/" + pixelId + "/events?access_token=" + accessToken,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload),
            },
        };

        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                resolve({ statusCode: 200, body: JSON.stringify({ success: true, eventId }) });
            });
        });

        req.on("error", (err) => {
            resolve({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
        });

        req.write(payload);
        req.end();
    });
};