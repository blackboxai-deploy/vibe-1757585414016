import NutritionalPlan from "@/components/NutritionalPlan";

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Plano de Intervenção Nutricional</h1>
      <NutritionalPlan />
    </main>
  );
}
