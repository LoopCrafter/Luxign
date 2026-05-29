import { Container } from "@/src/components/layout/Container";
import Plans from "./_components/Plans";

export async function generateMetadata() {
  return {
    title: "Buy Credit | Luxign",
  };
}

const BuyCreditPage = () => {
  return (
    <Container>
      <div className="p-6">
        <div className="mb-5">
          <h2 className="font-bold text-2xl">Buy More Credits</h2>
          <p>
            Unlock endless possibilities – Buy more credits and transform your
            room with AI magic! ✨🛋️
          </p>
        </div>
        <Plans />
      </div>
    </Container>
  );
};

export default BuyCreditPage;
