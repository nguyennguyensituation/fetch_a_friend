import Dogs from "../dogs/Dogs";
import Favorites from "../favorites/Favorites";

export default async function Page() {
  return (
    <main>
      <Dogs />
      <Favorites />
    </main>
  );
}