export default defineEventHandler(async (event) => {
    console.log("WORK IN PROGRESS");
    const response = await fetch("https://e7b7-81-177-186-60.ngrok-free.app/article/", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,en-RU;q=0.7,ru-RU;q=0.6,en-GB;q=0.5",
            "content-type": "application/json",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://e7b7-81-177-186-60.ngrok-free.app/docs",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\n  \"number_of_paragraphs\": 5,\n  \"url\": \"https://youtu.be/MPfZjw_4mug\",\n  \"lang\": \"en\"\n}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    const res = await response.json();
    return res;
})