import { app } from "@/server";
const port = process.env.DEV_PORT || 4000;
app.listen(port, () => {
  console.log(`[server]: Running on port ${port}`);
});