export default {
  async fetch(req) {
    if (req.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    const { message } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an agriculture assistant. Give simple, safe, practical advice about crops, soil, irrigation, pests, and farming. Use easy language for high school level."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({ reply: data.choices[0].message.content }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};
