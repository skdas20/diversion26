import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    // Call Gemini API securely from the server
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAa4hVQAkH-otUyVPEfaQ_1q_hGdTXUPlE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are Professor Gearwright, a distinguished Renaissance steampunk scholar and guide for Diversion 2026, a steampunk technology convention. Respond in character with Victorian eloquence and steampunk terminology. Keep responses concise but engaging. User query: ${prompt}`
          }]
        }]
      })
    })

    if (!geminiRes.ok) {
      return NextResponse.json({ error: 'Gemini API error' }, { status: 500 })
    }

    const data = await geminiRes.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but my cognitive apparatus seems to be experiencing some mechanical difficulties. Might you rephrase your inquiry?"
    return NextResponse.json({ text })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
