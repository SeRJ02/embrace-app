// Minimal Vercel serverless handler — no API routes yet.
// Add routes here when needed; prefix paths with /api/
export default function handler(req: any, res: any) {
  res.status(404).json({ message: "No API routes configured." });
}
