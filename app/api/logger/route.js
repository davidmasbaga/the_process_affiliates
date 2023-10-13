export async function POST(req) {
  console.log(req.body.message);
  return Response.json({ status: 'Logged successfully' });
}
