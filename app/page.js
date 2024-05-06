import Hero from '../components/Hero';
import Header from '../components/Header';
import CreateWorkout from '../components/CreateWorkout';

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-between bg-slate-100 h-full overflow-auto my-8">
      <Header />
      <div className="flex gap-4 items-center w-full h-full">
        <div className="grow w-3/4">
          <Hero />
        </div>
        <div className="w-1/4 h-screen">
          <CreateWorkout />
        </div>
      </div>
    </main>
  );
}
